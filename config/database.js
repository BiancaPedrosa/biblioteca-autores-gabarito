// config/database.js — versão PostgreSQL (Render)
require('dotenv').config();
const { Pool } = require('pg');

// DATABASE_URL: no Render use a Internal Database URL;
// na sua máquina use a External Database URL.
const pool = new Pool({
    connectionString: process.env.DATABASE_URL,
    ssl: { rejectUnauthorized: false }   // o Render exige conexão criptografada
});

module.exports = pool;
