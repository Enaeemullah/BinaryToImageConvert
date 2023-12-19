const fs = require('fs').promises;
const path = require('path');
const { fetchImageData } = require('./config');
const { processImage } = require('./imageProcessor');

const outputFolder = 'D:\\DMPro\\KCBL-Migration\\KCBL-Signatures';
const imageWidth = 400;
const imageHeight = 200;
const compressionQuality = 100;

async function main() {
  try {
    // Create the output directory if it doesn't exist
    await fs.mkdir(outputFolder, { recursive: true });
    console.log(`Output directory created: ${outputFolder}`);

    const imageData = await fetchImageData();
    let startingCustomerID = 1;

    for (const { Customer_ID, Signature } of imageData) {
      await processImage(Customer_ID, Signature, outputFolder, imageWidth, imageHeight, compressionQuality);

      if (Customer_ID !== startingCustomerID) {
        startingCustomerID = Customer_ID;
      }
    }
  } catch (error) {
    console.error('An error occurred:', error);
  }
}

main();
