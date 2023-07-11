const express = require('express');
const sharp = require('sharp');

const app = express();
const port = 4100;

app.get('/manipulate', async (req, res) => {
    const { url, width, height, crop, bw, format, filter, rotate,watermark } = req.query;

    if (!url) {
        return res.status(400).send( 'URL parameter is required.' );
    }

    let image = sharp(url);

    // Check if the image URL is accessible
    try {
        await image.metadata();
    } catch (err) {
        return res.status(400).send('Failed to access the provided image URL.' );
    }

    const cropWidth = width ? Number(width) : 200;
    const cropHeight = height ? Number(height) : 140;


    // Resize
    if (width && height) {
        image = image.resize(Number(width), Number(height));
    }

    // Crop
    if (crop === 'true') {
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

    // Black and white
    if (bw === 'true') {
        image = image.grayscale();
    }

    // Filter
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
    // Rotate

    if (rotate) {
        const rotateAngle = Number(rotate);
        if (!isNaN(rotateAngle)) {
            image = image.rotate(rotateAngle);
        }
        else {
            return res.status(400).send( 'Invalid rotate parameter.' );
          }
    }

      // Watermark
  if (watermark) {
    const watermarkPath = 'D:\Teenage-boy-checking-programming-code-1.jpg'; // Replace with the path to your watermark image
    try {
      const watermarkBuffer = await sharp(watermarkPath).toBuffer();
      image = image.composite([{ input: watermarkBuffer }]);
    } catch (err) {
      return res.status(500).send('Watermarking failed.');
    }
  }


    // Format conversion
    if (format) {
        image = image.toFormat(format);
    }



    try {
        const data = await image.toBuffer();
        res.set('Content-Type', 'image/jpeg');
        res.send(data);
    } catch (err) {
        res.status(500).send('Image manipulation failed.' );
    }
});

app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});
