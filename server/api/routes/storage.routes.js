const Router = require('express');

const storageController = require('../controllers/storage.controller.js');

const router = new Router();

router.post('/', storageController.createStorage);
router.get('/', storageController.fetchStorage);
router.delete('/:id', storageController.deleteStroage);

module.exports = router;