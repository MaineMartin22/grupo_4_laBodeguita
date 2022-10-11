const express = require("express")
const Maincontroller = require("../controllers/mainController")
const router = express.Router()
const multer = require('multer')
const path = require("path")


// IMAGENES PARA LOS PRODUCTOS

const productStorage = multer.diskStorage({
    destination: (req, file, cb) =>{
        cb(null, './public/images/products' )
    },
    filename: (req, file, cb) =>{
        let fileName = `${Date.now()}_img${path.extname(file.originalname)}`
        cb(null, fileName)
    }
});

const productFile = multer({ productStorage });

router.get('/', Maincontroller.index);

router.get('/home', Maincontroller.index);

router.get('/detalleProducto', Maincontroller.productDetail);

router.get('/login', Maincontroller.login);

router.get('/carrito', Maincontroller.prodCar);

router.get('/finalizarCompra', Maincontroller.toBuy);

router.get('/list', Maincontroller.list);

router.get('/create' ,Maincontroller.product);

router.post('/create', productFile.single('imagen'), Maincontroller.create);

router.get('/delete/:idProd', Maincontroller.list)



module.exports = router