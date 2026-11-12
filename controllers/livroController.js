// controllers/livroController.js
const Livro = require('../models/livro');

exports.list = async (req, res) => {
    try {
        const livros = await Livro.getAll();
        res.render('livros', { livros, username: req.session.user.username });
    } catch (err) {
        console.error(err);
        res.status(500).send('Erro ao buscar livros.');
    }
};

exports.showForm = (req, res) => {
    res.render('novo-livro');
};

exports.create = async (req, res) => {
    const { titulo, autor, ano } = req.body;
    try {
        await Livro.create(titulo, autor, ano || null);
        res.redirect('/livros');
    } catch (err) {
        console.error(err);
        res.status(500).send('Erro ao salvar livro.');
    }
};

exports.remove = async (req, res) => {
    try {
        await Livro.remove(req.params.id);
        res.redirect('/livros');
    } catch (err) {
        console.error(err);
        res.status(500).send('Erro ao excluir livro.');
    }
};
