const Router = require('express');

const bookController = require('../controllers/book.controller.js');

const router = new Router();

router.post('/', bookController.createBook);
router.get('/', bookController.getAllBooks);
router.get('/:id', bookController.getOneBook);

module.exports = router;