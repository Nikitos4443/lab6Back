const express = require('express');
const router = express();
const Controller = require('./controller.js');
const controller = new Controller();

router.get('/get', controller.get)

router.post('/create', controller.create);

router.delete('/delete/:id', controller.delete)

module.exports = router;