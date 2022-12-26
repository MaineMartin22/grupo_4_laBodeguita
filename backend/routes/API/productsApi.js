const express = require('express');
const router = express.Router();
const apiProductController = require('../../controllers/API/apiProductsController');

//Rutas
//Listado de productos
router.get('/', apiProductController.list);

//Busqueda de productos
//router.get("/search/:keyword", apiProductController.search)

//Detalle de un producto
router.get('/:id', apiProductController.detail);


module.exports = router;