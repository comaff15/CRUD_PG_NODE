const Router = require('express');
const readerController = require('../controllers/reader.controller.js');

const router = new Router();

router.post('/', readerController.createReader);
router.get('/', readerController.fetchReaders);
router.put('/:id', readerController.updateReader);
router.delete('/:id', readerController.deleteReader)


module.exports = router;