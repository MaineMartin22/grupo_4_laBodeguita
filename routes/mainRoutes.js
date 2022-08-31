const express = require("express")
const Maincontroller = require("../controllers/mainController")
const router = express.Router()

router.get('/', Maincontroller.index);

router.get('/home', Maincontroller.index);

router.get('/register', Maincontroller.register);

router.get('/detalleProducto', Maincontroller.productDetail);

router.get('/search', Maincontroller.search)

router.get('/login', Maincontroller.login);

router.get('/carrito', Maincontroller.prodCar);

router.get('/finalizarCompra', Maincontroller.toBuy);

router.get('/list', Maincontroller.list);

router.get('/create' ,Maincontroller.product)

router.post('/create', Maincontroller.create)

router.get('/edit/:idProd', Maincontroller.edit)

router.put('/edit/:idProd', function(res, req) {
    res.send("soy put")
})

router.delete('delete/:idUser', function(res, req){
    res.send("soy delete")
})


module.exports = router