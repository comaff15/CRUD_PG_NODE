const Router = require('express');

const issuancesController = require('../controllers/issuance.controller.js');

const router = new Router();

router.post('/', issuancesController.createIssuance);
router.put('/:id', issuancesController.updateStatusIssuances);
router.delete('/', issuancesController.deleteIssuances);

module.exports = router;