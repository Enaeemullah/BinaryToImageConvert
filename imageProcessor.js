const sharp = require('sharp');
const fs = require('fs').promises;
const kleur = require('kleur');
const path = require('path'); // Import the path module

const missingSignatureImage = 'F:\\BinaryToImageConvert\\SignatureNotFound.jpg';

async function processImage(Customer_ID, Signature, outputFolder, imageWidth, imageHeight) {
  const paddedCustomerID = `${Customer_ID.toString().padStart(2, '0')}-00`;
  const imagePath = path.join(outputFolder, `${paddedCustomerID}.jpg`);
  let imageBuffer;

  if (Signature === null) {
    imageBuffer = await fs.readFile(missingSignatureImage);
    console.log(kleur.yellow(`Missing signature for Customer_ID: ${Customer_ID} and using the default image: ${missingSignatureImage}`));
  } else {
    const sharpImage = sharp(Signature)
      .resize(imageWidth, imageHeight);
    
    imageBuffer = await sharpImage.toBuffer();
  }

  await fs.writeFile(imagePath, imageBuffer);
  console.log(kleur.green('Image saved in the SignaturePhotos Folder:'));
  console.log(kleur.blue(imagePath));
}

module.exports = { processImage };
