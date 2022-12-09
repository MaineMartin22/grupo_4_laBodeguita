const express = require("express")
const Maincontroller = require("../controllers/mainController")
const router = express.Router()
const path = require("path")
const authMiddleware = require('../middlewares/authMiddleware');
const userLoggedMiddleware = require('../middlewares/userLoggedMiddleware')



router.get('/', Maincontroller.index);

router.get('/home', Maincontroller.index);

router.get('/detalleProducto', Maincontroller.productDetail);

router.get('/carrito', authMiddleware, userLoggedMiddleware, Maincontroller.prodCar);

router.get('/finalizarCompra', Maincontroller.toBuy);

module.exports = router