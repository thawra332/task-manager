const sqlite3 = require('sqlite3');
const path = require('path');
const { open } = require('sqlite');

const dbPath = path.resolve(__dirname, '../../database.sqlite');

let db;

async function getConnection() {
  if (!db) {
    db = await open({
      filename: dbPath,
      driver: sqlite3.Database
    });
    
    await db.exec(`
      CREATE TABLE IF NOT EXISTS tasks (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        title TEXT NOT NULL,
        status TEXT DEFAULT 'pending',
        created_at DATETIME DEFAULT CURRENT_TIMESTAMP
      )
    `);
    console.log('✅ SQLite database ready');
  }
  return db;
}

module.exports = { getConnection };