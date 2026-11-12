// routes/livroRoutes.js
const express = require('express');
const router = express.Router();
const livroController = require('../controllers/livroController');
const exigirLogin = require('../middleware/exigirLogin');

router.use(exigirLogin);   // vale para TODAS as rotas deste arquivo

router.get('/', livroController.list);              // GET  /livros
router.get('/novo', livroController.showForm);      // GET  /livros/novo
router.post('/', livroController.create);           // POST /livros
router.post('/:id/delete', livroController.remove); // POST /livros/:id/delete

module.exports = router;
