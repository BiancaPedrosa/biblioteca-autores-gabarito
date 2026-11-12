// models/livro.js
const pool = require('../config/database');

async function getAll() {
    const [rows] = await pool.query('SELECT * FROM livros ORDER BY titulo');
    return rows;
}

async function create(titulo, autor, ano) {
    await pool.query(
        'INSERT INTO livros (titulo, autor, ano) VALUES (?, ?, ?)',
        [titulo, autor, ano]
    );
}

async function remove(id) {
    await pool.query('DELETE FROM livros WHERE id = ?', [id]);
}

module.exports = { getAll, create, remove };
