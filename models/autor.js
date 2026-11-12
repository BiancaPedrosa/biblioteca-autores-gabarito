// models/autor.js
const pool = require('../config/database');

async function getAll(busca) {
    if (busca) {
        // ILIKE: igual ao LIKE, mas sem diferenciar maiúsculas de minúsculas
        const { rows } = await pool.query(
            'SELECT * FROM autores WHERE nome ILIKE $1 ORDER BY nome',
            ['%' + busca + '%']
        );
        return rows;
    }
    const { rows } = await pool.query('SELECT * FROM autores ORDER BY nome');
    return rows;
}

async function create(nome, nacionalidade) {
    await pool.query(
        'INSERT INTO autores (nome, nacionalidade) VALUES ($1, $2)',
        [nome, nacionalidade]
    );
}

async function remove(id) {
    await pool.query('DELETE FROM autores WHERE id = $1', [id]);
}

module.exports = { getAll, create, remove };
