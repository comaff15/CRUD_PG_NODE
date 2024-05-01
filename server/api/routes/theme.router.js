const Router = require('express');

const themeController = require('../controllers/theme.controller.js');

const router = new Router();

router.post('/', themeController.createTheme);
router.get('/', themeController.fetchTheme);
router.delete('/:id', themeController.deleteTheme);

module.exports = router;