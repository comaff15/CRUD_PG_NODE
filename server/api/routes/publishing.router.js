const Router = require('express');

const publishingController = require('../controllers/publishing.controller.js');

const router = new Router();

router.post('/', publishingController.createPublishing);
router.get('/', publishingController.fetchPublishings);
router.delete('/:id', publishingController.deletePublishing);

module.exports = router;