// routes/autorRoutes.js
const express = require('express');
const router = express.Router();
const autorController = require('../controllers/autorController');
const exigirLogin = require('../middleware/exigirLogin');

router.use(exigirLogin);

router.get('/', autorController.list);               // GET  /autores
router.post('/', autorController.create);            // POST /autores
router.post('/:id/delete', autorController.remove);  // POST /autores/:id/delete

module.exports = router;
