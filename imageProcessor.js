const sharp = require('sharp');
const fs = require('fs').promises;
const kleur = require('kleur');
const path = require('path');

const missingSignatureImage = 'D:\\DMPro\\BinaryToImageConvert\\SignatureNotFound.jpg';

async function processImage(Customer_ID, Signature, outputFolder, imageWidth, imageHeight, compressionQuality) {
  const paddedCustomerID = `${Customer_ID.toString().padStart(2, '0')}-00`;
  const outputPath = path.join(outputFolder, `${paddedCustomerID}.jpg`);
  let imageBuffer;

  try {
    if (Signature === null) {
      imageBuffer = await fs.readFile(missingSignatureImage);
      console.log(kleur.yellow(`Missing signature for Customer_ID: ${Customer_ID} and using the default image: ${missingSignatureImage}`));
    } else {
      const sharpImage = sharp(Signature)
        .resize({
          width: imageWidth,
          height: imageHeight,
          fit: 'inside',
        })
        .jpeg({ quality: compressionQuality });
      imageBuffer = await sharpImage.toBuffer();
    }

    // Ensure the output folder exists
    await fs.mkdir(outputFolder, { recursive: true });

    // Save the image with compression quality
    await fs.writeFile(outputPath, imageBuffer, { encoding: 'binary' });

    console.log(kleur.green('Image saved in the SignaturePhotos Folder:'));
    console.log(kleur.blue(outputPath));
  } catch (error) {
    console.error('An error occurred:', error);
  }
}

module.exports = { processImage };
