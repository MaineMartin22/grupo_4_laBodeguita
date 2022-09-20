const express = require("express")
const Maincontroller = require("../controllers/mainController")
const router = express.Router()

router.get('/', Maincontroller.index);

router.get('/home', Maincontroller.index);

router.get('/detalleProducto', Maincontroller.productDetail);

router.get('/login', Maincontroller.login);

router.get('/carrito', Maincontroller.prodCar);

router.get('/finalizarCompra', Maincontroller.toBuy);

router.get('/list', Maincontroller.list);

router.get('/create' ,Maincontroller.product);

router.post('/create', Maincontroller.create);

router.get('/delete/:idProd', Maincontroller.list)



module.exports = router