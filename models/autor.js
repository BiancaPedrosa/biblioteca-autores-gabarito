// models/autor.js
const pool = require('../config/database');

async function getAll(busca) {
    if (busca) {
        const [rows] = await pool.query(
            'SELECT * FROM autores WHERE nome LIKE ? ORDER BY nome',
            ['%' + busca + '%']
        );
        return rows;
    }
    const [rows] = await pool.query('SELECT * FROM autores ORDER BY nome');
    return rows;
}

async function create(nome, nacionalidade) {
    await pool.query(
        'INSERT INTO autores (nome, nacionalidade) VALUES (?, ?)',
        [nome, nacionalidade]
    );
}

async function remove(id) {
    await pool.query('DELETE FROM autores WHERE id = ?', [id]);
}

module.exports = { getAll, create, remove };
