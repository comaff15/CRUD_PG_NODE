const Router = require('express');

const librerianController = require('../controllers/librerian.controller.js');

const router = new Router();

router.post('/', librerianController.createLibrerian);
router.get('/', librerianController.fetchLibrerians);
router.delete('/:id', librerianController.deleteLibrerian);

module.exports = router;