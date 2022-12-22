const express = require('express');
const router = express.Router();
const apiSizesController = require('../../controllers/API/apiSizesController');

//Rutas
//Listado de bodegas
router.get('/', apiSizesController.list);



module.exports = router;