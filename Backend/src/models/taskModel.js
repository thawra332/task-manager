const { getConnection } = require('../db/connection');

class Task {
  static async createTable() {
    const db = await getConnection();
    await db.exec(`
      CREATE TABLE IF NOT EXISTS tasks (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        title TEXT NOT NULL,
        status TEXT DEFAULT 'pending',
        created_at DATETIME DEFAULT CURRENT_TIMESTAMP
      )
    `);
  }

  static async create(title) {
    const db = await getConnection();
    const result = await db.run(
      'INSERT INTO tasks (title) VALUES (?)',
      title
    );
    return result.lastID;
  }

  static async findAll() {
    const db = await getConnection();
    return await db.all('SELECT * FROM tasks ORDER BY created_at DESC');
  }

  static async updateStatus(id, status) {
    const db = await getConnection();
    const result = await db.run(
      'UPDATE tasks SET status = ? WHERE id = ?',
      status, id
    );
    return result.changes > 0;
  }

  static async delete(id) {
    const db = await getConnection();
    const result = await db.run('DELETE FROM tasks WHERE id = ?', id);
    return result.changes > 0;
  }
}

module.exports = Task;