const Router = require('express');

const typeController = require('../controllers/type.controller.js');

const router = new Router();

router.post('/', typeController.createType);
router.get('/', typeController.fetchTypes);
router.delete('/:id', typeController.deleteType)

module.exports = router;