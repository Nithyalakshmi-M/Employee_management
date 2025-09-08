const fs = require('fs');
const mysql = require('mysql2/promise'); // promise version use panrom for async/await

async function importBackup() {
  const connection = await mysql.createConnection({
    host: 'interchange.proxy.rlwy.net',
    user: 'root',
    password: 'gMuWftsIUWPgPqtpOPxDkuSiLClwhNTF',
    database: 'railway',
    port: 40521,
    multipleStatements: false,
  });

  console.log('Connected to Railway MySQL!');

  const sql = fs.readFileSync('../db/backup.sql', 'utf8');
  
  // split by semicolon
  const statements = sql
    .split(';')
    .map(s => s.trim())
    .filter(s => s.length > 0);

  for (const stmt of statements) {
    try {
      await connection.query(stmt);
    } catch (err) {
      console.error('Error in statement:', stmt);
      console.error(err);
    }
  }

  console.log('Backup imported successfully!');
  await connection.end();
}

importBackup();
