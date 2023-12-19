// Database.js
const mysql = require('mysql2/promise');
require('dotenv').config();

const dbConfig = {
  host: process.env.DB_HOST,
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_DATABASE,
};

async function connectToDatabase() {
  return mysql.createConnection(dbConfig);
}

async function fetchImageData() {
  const connection = await connectToDatabase();
  // const query = 'SELECT Customer_ID, Signature FROM signaturephoto ORDER BY Customer_ID';
  const query = 'SELECT DISTINCT Customer_ID, Signature FROM SignaturePhoto ORDER BY Customer_ID';
  const [rows] = await connection.execute(query);
  await connection.end();

  return rows;
}

module.exports = { fetchImageData };
