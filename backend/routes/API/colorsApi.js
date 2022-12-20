const express = require('express');
const router = express.Router();
const apiColorsController = require('../../controllers/API/apiColorsController');

//Rutas
//Listado de colores
router.get('/', apiColorsController.list);



module.exports = router;