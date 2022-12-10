const express = require('express')
const router = express.Router();

const controller = require('../controllers/apiControllers')

router.get('/product/:id', controller.product);

module.exports = router;