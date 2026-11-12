// app.js
require('dotenv').config();
const express = require('express');
const session = require('express-session');
const authRoutes = require('./routes/authRoutes');
const livroRoutes = require('./routes/livroRoutes');
const autorRoutes = require('./routes/autorRoutes');
const livrosJson = require('./livros.json');

const app = express();

app.set('view engine', 'ejs');
app.use(express.urlencoded({ extended: true }));
app.use(session({
    secret: process.env.SESSION_SECRET,
    resave: false,
    saveUninitialized: false
}));

// Etapa 1: rota simples
app.get('/sobre', (req, res) => {
    res.send('Biblioteca da Turma — Web 2');
});

// Etapa 2: dados vindos do arquivo JSON
app.get('/api/livros', (req, res) => {
    res.json(livrosJson);
});

app.get('/api/livros/antigos', (req, res) => {
    const antigos = livrosJson.filter(l => l.ano < 1900);
    res.json(antigos);
});

app.get('/', (req, res) => res.redirect('/livros'));
app.use('/', authRoutes);
app.use('/livros', livroRoutes);
app.use('/autores', autorRoutes);

// Etapa 1: 404 — sempre depois de todas as rotas
app.use((req, res) => {
    res.status(404).send('Página não encontrada');
});

app.listen(3000, () => {
    console.log('Servidor rodando na porta 3000');
});
