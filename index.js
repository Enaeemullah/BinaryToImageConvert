const fs = require('fs').promises; // Import the fs module for file operations
const path = require('path');
const { fetchImageData } = require('./config');
const { processImage } = require('./imageProcessor');

// const outputFolder = process.env.OUTPUT_FOLDER;
const outputFolder = 'F:/KCBL-SIGNATURE/SignatureImages';
const imageWidth = 400; // Change to the desired width
const imageHeight = 200; // Change to the desired height

async function main() {
  try {
    // Create the output directory if it doesn't exist
    await fs.mkdir(outputFolder, { recursive: true });
    console.log(`Output directory created: ${outputFolder}`);

    const imageData = await fetchImageData();
    let startingCustomerID = 1;

    for (const { Customer_ID, Signature } of imageData) {
      await processImage(Customer_ID, Signature, outputFolder, imageWidth, imageHeight);

      if (Customer_ID !== startingCustomerID) {
        startingCustomerID = Customer_ID;
      }
    }
  } catch (error) {
    console.error('An error occurred:', error);
  }
}

main();
