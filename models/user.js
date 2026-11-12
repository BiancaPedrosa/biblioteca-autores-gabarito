// models/user.js
const pool = require('../config/database');

async function findByUsername(username) {
    const { rows } = await pool.query(
        'SELECT * FROM users WHERE username = $1',
        [username]
    );
    return rows[0];
}

async function create(username, hashedPassword) {
    await pool.query(
        'INSERT INTO users (username, password) VALUES ($1, $2)',
        [username, hashedPassword]
    );
}

module.exports = { findByUsername, create };
