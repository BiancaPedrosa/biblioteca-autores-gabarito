// controllers/autorController.js
const Autor = require('../models/autor');

exports.list = async (req, res) => {
    const busca = req.query.busca || '';
    try {
        const autores = await Autor.getAll(busca);
        res.render('autores', { autores, busca, username: req.session.user.username });
    } catch (err) {
        console.error(err);
        res.status(500).send('Erro ao buscar autores.');
    }
};

exports.create = async (req, res) => {
    const { nome, nacionalidade } = req.body;
    try {
        await Autor.create(nome, nacionalidade);
        res.redirect('/autores');
    } catch (err) {
        console.error(err);
        res.status(500).send('Erro ao salvar autor.');
    }
};

exports.remove = async (req, res) => {
    try {
        await Autor.remove(req.params.id);
        res.redirect('/autores');
    } catch (err) {
        console.error(err);
        res.status(500).send('Erro ao excluir autor.');
    }
};
