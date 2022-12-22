const express = require('express');
const router = express.Router();
const apiProductController = require('../../controllers/API/apiProductsController');

//Rutas
//Listado de clientes
router.get('/', apiProductController.list);
//Detalle de un cliente
//router.get("/search/:keyword", apiProductController.search)
router.get('/:id', apiProductController.detail);


module.exports = router;