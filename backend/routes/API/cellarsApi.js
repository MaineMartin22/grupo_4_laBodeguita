const express = require('express');
const router = express.Router();
const apiCellarsController = require('../../controllers/API/apiCellarsController');

//Rutas
//Listado de bodegas
router.get('/', apiCellarsController.list);



module.exports = router;