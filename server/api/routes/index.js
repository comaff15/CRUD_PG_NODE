const express = require('express')
const router = express.Router();

const librerianRouter = require('./librerian.router.js');
const readerRouter = require('./reader.router.js');
const typeRouter = require('./type.router.js');
const publishingRouter = require('./publishing.router.js');
const themeRouter = require('./theme.router.js');
const storageRouter = require('./storage.routes.js');
const issuanceRouter = require('./issuance.router.js');
const bookRouter = require('./book.router.js');


router.use('/librerian', librerianRouter);
router.use('/reader', readerRouter);
router.use('/type', typeRouter);
router.use('/publishing', publishingRouter);
router.use('/theme', themeRouter);
router.use('/storage', storageRouter);
router.use('/issuance', issuanceRouter);
router.use('/book', bookRouter);

module.exports = router;