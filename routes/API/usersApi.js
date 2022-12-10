const express = require('express');
const router = express.Router();
const apiUserController = require('../../controllers/API/apiUserController');

//Rutas
//Listado de clientes
router.get('/', apiUserController.list);
//Detalle de un cliente
router.get('/:id', apiUserController.detail);


module.exports = router;