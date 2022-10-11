const express = require("express")
const Maincontroller = require("../controllers/mainController")
const router = express.Router()
const multer = require('multer')
const path = require("path")



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

// router.get('/search', Maincontroller.search)

router.get('/:idProd', Maincontroller.detalle)

router.delete('/delete/:idProd', Maincontroller.delete)

router.get('/edit/:idProd', Maincontroller.edit)

router.post('/edit/:idProd', productFile.single('imagen'), Maincontroller.update)

module.exports = router