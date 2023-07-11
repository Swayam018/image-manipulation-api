
# Image Manipulation API

This Node.js API allows you to manipulate third-party images by performing tasks such as resizing, cropping, applying filters, and converting formats using the Sharp.js library.

## Setup

1. Clone the repository:

   ```shell
   git clone image-manipulation-api
   ```

2. Navigate to the project directory:

   ```shell
   cd image-manipulation-api
   ```

3. Install dependencies:

   ```shell
   npm install
   ```

4. Start the server:

   ```shell
   node index.js
   ```

   The API will start running on `http://localhost:4100`.

## Usage

The API provides a single endpoint at `/manipulate` that accepts various URL parameters to customize the image manipulation. Here are the available parameters:

- `url` (required): The URL of the third-party image to be manipulated.
- `width` (optional): The desired width of the manipulated image.
- `height` (optional): The desired height of the manipulated image.
- `crop` (optional): Set to `true` if the image should be cropped to fit the specified dimensions.
- `bw` (optional): Set to `true` if the output should be black and white.
- `format` (optional): The desired format of the manipulated image (e.g., `jpg`, `png`, `webp`).
- filter (optional): The filter to be applied to the image (e.g., sepia, grayscale, blur, sharpen, emboss, negate, oilpaint).
- rotate (optional): The rotation angle in degrees.
- watermark (optional): A boolean parameter indicating whether to add a watermark to the image.


### Examples

1. Resize an image:

   ```shell
   GET /manipulate?url=<IMAGE_URL>&width=<WIDTH>&height=<HEIGHT>
   ```

   Replace `<IMAGE_URL>` with the URL of the image you want to resize, `<WIDTH>` with the desired width in pixels, and `<HEIGHT>` with the desired height in pixels.

2. Crop an image:

   ```shell
   GET /manipulate?url=<IMAGE_URL>&crop=true
   ```

   Replace `<IMAGE_URL>` with the URL of the image you want to crop, `<WIDTH>` and `<HEIGHT>` with the dimensions of the crop rectangle in pixels.

3. Convert an image to black and white:

   ```shell
   GET /manipulate?url=<IMAGE_URL>&bw=true
   ```

   Replace `<IMAGE_URL>` with the URL of the image you want to convert.

4. Convert an image to a specific format:

   ```shell
   GET /manipulate?url=<IMAGE_URL>&format=<FORMAT>
   ```

   Replace `<IMAGE_URL>` with the URL of the image you want to convert, and `<FORMAT>` with the desired format (e.g., `jpg`, `png`, `webp`).

5. Filter the image:

   ```shell
  GET /manipulate?url=<IMAGE_URL>&filter=sepia
   ```

   Replace `<IMAGE_URL>` with the URL of the image you want to add filter.

   
"sepia": Applies a sepia filter to the image by increasing the brightness, reducing the saturation, and shifting the hue.
"grayscale": Converts the image to grayscale by reducing the saturation to 0.
"blur": Applies a blur filter to the image.
"sharpen": Sharpens the image.
"emboss": Applies an emboss filter to the image.
"negate": Inverts the colors of the image.
"oilpaint": Applies an oil painting effect to the image.

6.Rotate the image:
 make a GET request to the /manipulate endpoint with the rotate parameter set to the desired rotation angle. For example, to rotate the image by 90 degrees, use the following URL:

   ```shell
http://localhost:4100/manipulate?url=<IMAGE_URL>&rotate=90
   ```
7.Watermark the image:
make a GET request to the /manipulate endpoint with the watermark parameter set to true. 
 ```shell
http://localhost:4100/manipulate?url=<IMAGE_URL>&watermark=true
 ```

Remember to replace <IMAGE_URL> with the URL of the image you want to manipulate.





### Additional Information

- If an error occurs during image manipulation or if any required parameters are missing, the API will respond with an appropriate error message and status code.
- The API supports various image formats, including JPEG, PNG, and WebP.
- You can add your own code to the API to apply additional image manipulations, such as filters, rotations, or watermarks.

## Testing and Validation

To ensure the correctness and reliability of the codebase, thorough testing and validation are recommended. Test the API against different scenarios, such as:

- Varying input parameters, including different image URLs, dimensions, and formats.
- Edge cases, such as extremely large or small dimensions, unsupported image formats, or invalid URLs.
- Concurrent requests and performance testing to assess the API's scalability.

Validate that the image manipulation tasks are executed correctly and the API responds with the expected results.

---

Feel free to customize the README file based on your specific project structure, requirements, and any additional information you want to provide.

Remember to thoroughly test and validate the codebase to ensure its reliability and functionality. Test against various scenarios and edge cases to cover a wide range of possible use cases.

I hope this helps! Let me know if you have any further question.
