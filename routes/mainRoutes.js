const express = require("express")
const Maincontroller = require("../controllers/mainController")
const router = express.Router()

router.get('/', Maincontroller.index);

router.get('/home', Maincontroller.index);

router.get('/register', Maincontroller.register);

router.get('/detalleProducto', Maincontroller.productDetail);

router.get('/login', Maincontroller.login);

router.get('/carrito', Maincontroller.prodCar);

router.get('/vino1', Maincontroller.wine1);

router.get('/finalizarCompra', Maincontroller.toBuy);


module.exports = router