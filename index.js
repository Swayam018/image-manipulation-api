const express = require('express');
const sharp = require('sharp');
const axios = require('axios');
const { Readable } = require('stream');

const app = express();
const port = 4100;

app.get('/manipulate', async (req, res, next) => {
    try {
        const imageUrl = req.query.url;
        const width = parseInt(req.query.width, 10);
        const height = parseInt(req.query.height, 10);
        const crop = req.query.crop === 'true';
        const bw = req.query.bw === 'true';
        const format = req.query.format || 'jpeg';
        const filter = req.query.filter || '';
        const rotate = parseInt(req.query.rotate, 10) || 0;
        const watermark = req.query.watermark === 'true';

        // Fetch the image from the provided URL
        const response = await axios.get(imageUrl, { responseType: 'stream' });

        // Read the image stream and perform manipulations
        let image = sharp();
        response.data.pipe(image);
        const cropWidth = width ? Number(width) : 200;
        const cropHeight = height ? Number(height) : 140;

        // Resize the image if width and height are provided
        if (width && height) {
            image = image.resize(Number(width), Number(height));
        }

        // Crop the image if crop parameter is true
        if (crop == true) {
            try {
                image = image.resize(cropWidth, cropHeight).extract({
                    left: 0,
                    top: 0,
                    width: cropWidth,
                    height: cropHeight,
                });
            } catch (err) {
                return res.status(500).send('Image cropping failed.');
            }
        }



        // Convert to black and white if bw parameter is true
        if (bw) {
            image = image.grayscale();
        }


        // Apply filters
        if (filter) {
            switch (filter) {
                case 'sepia':
                    image = image.modulate({ brightness: 1.2, saturation: 0.8, hue: 90 });
                    break;
                case 'grayscale':
                    image = image.modulate({ saturation: 0 });
                    break;
                case 'blur':
                    image = image.blur(5);
                    break;
                case 'sharpen':
                    image = image.sharpen();
                    break;
                case 'emboss':
                    image = image.emboss();
                    break;
                case 'negate':
                    image = image.negate();
                    break;
                case 'oilpaint':
                    image = image.oilpaint();
                    break;
                default:
                    return res.status(400).send('Invalid filter parameter.');

            }
        }
        // Rotate the image if rotate parameter is provided
        if (rotate) {
            const rotateAngle = Number(rotate);
            if (!isNaN(rotateAngle)) {
                image = image.rotate(rotateAngle);
            }
            else {
                return res.status(400).send('Invalid rotate parameter.');
            }
        }

        // Add watermark if watermark parameter is true
        if (watermark) {
            const watermarkPath = 'image/watermark.png'; // Replace with the path to your watermark image
            try {
                const watermarkBuffer = await sharp(watermarkPath).toBuffer();
                image = image.composite([{ input: watermarkBuffer }]);
            } catch (err) {
                return res.status(500).send('Watermarking failed.');
            }
        }

        // Set the output format
        if (format) {
            image = image.toFormat(format);
        }

        // Send the manipulated image as the response
        res.setHeader('Content-Type', `image/${format}`);
        image.pipe(res);
    } catch (error) {
        // Handle errors gracefully
        console.error(error);
        res.status(500).send('An error occurred during image manipulation.');
    }
});

app.listen(port, () => {
    console.log(`Server is running on http://localhost:${port}`);
});
