require('dotenv').config();
const mysql = require('mysql2/promise');

const connectDB = async () => {
  try {
    const connection = await mysql.createConnection({
      host: process.env.DB_HOST,
      user: process.env.DB_USER,
      password: process.env.DB_PASS,
      database: process.env.DB_NAME,
      port: process.env.DB_PORT,
    });
    console.log('✅ MySQL connected!');
    return connection;
  } catch (err) {
    console.error('DB connection failed:', err);
    throw err; // propagate to controller
  }
};

module.exports = connectDB;
