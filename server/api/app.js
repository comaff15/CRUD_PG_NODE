const express = require('express');
const cors = require('cors');

const router = require('./routes/index.js');



const app = express();

app.use(express.urlencoded({extended: true}));
app.use(express.json());
app.use (express.json({type: 'application/json'}));
app.use(cors());

app.use('/api', router);

module.exports = app;