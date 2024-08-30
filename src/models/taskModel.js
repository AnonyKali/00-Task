const db = require('../config/db');

class Task {
    static create(title, description, completed, callback) {
        const sql = `INSERT INTO tasks (title, description, completed) VALUES (?, ?, ?)`;
        db.run(sql, [title, description, completed], function (err) {
            callback(err, this ? this.lastID : null);
        });
    }

    static getAll(callback) {
        const sql = `SELECT * FROM tasks`;
        db.all(sql, [], callback);
    }

    static update(id, title, description, completed, callback) {
        const sql = `UPDATE tasks SET title = ?, description = ?, completed = ?, updated_at = CURRENT_TIMESTAMP WHERE id = ?`;
        db.run(sql, [title, description, completed, id], function (err) {
            callback(err, this ? this.changes : null);
        });
    }

    static delete(id, callback) {
        const sql = `DELETE FROM tasks WHERE id = ?`;
        db.run(sql, [id], function (err) {
            callback(err, this ? this.changes : null);
        });
    }
}

module.exports = Task;
