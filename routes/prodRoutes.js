const express = require("express")
const Maincontroller = require("../controllers/mainController")
const searchController = require("../controllers/searchController")

const authMiddleware = require('../middlewares/authMiddleware')

const router = express.Router()
const multer = require('multer')
const path = require("path")

const notadmMiddleware = require('../middlewares/notadmMiddleware');


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

router.get('/search', searchController.searchBar)

router.get('/list', authMiddleware, notadmMiddleware, Maincontroller.list);

router.get('/create' , authMiddleware, notadmMiddleware, Maincontroller.product);

router.post('/create', productFile.single('imagen'), Maincontroller.create);

router.get('/:idProd', Maincontroller.detalle)

router.get('/delete/:idProd', authMiddleware, notadmMiddleware, Maincontroller.list)

router.post('/delete/:idProd', Maincontroller.delete)

router.get('/edit/:idProd', authMiddleware, notadmMiddleware, Maincontroller.edit)

router.post('/edit/:idProd', productFile.single('imagen'), Maincontroller.update)

module.exports = router