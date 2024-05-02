const Router = require('express');

const bookController = require('../controllers/book.controller.js');

const router = new Router();

router.post('/', bookController.createBook);
router.get('/', bookController.getBooks);
router.get('/search', bookController.serchBooks);
router.delete('/delete', bookController.deleteBooks);

module.exports = router;