const express = require("express")

const Maincontroller = require("../controllers/mainController")

const searchController = require("../controllers/searchController")

const authMiddleware = require('../middlewares/authMiddleware')

const router = express.Router()

const multer = require('multer')

const path = require("path")

const notadmMiddleware = require('../middlewares/notadmMiddleware');

const { body, check, validationResult } = require('express-validator')

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


let validaciones = [
    check('name').isLength({min: 5}).withMessage('El campo no puede estar vacío, debe tener al menos cinco caracteres'),
    check('precio').isNumeric({min: 3}).withMessage('El campo no puede estar vacío'),
    check('descuento').isNumeric({min: 1}).withMessage('El campo no puede estar vacío'),
    check('alcohol').isNumeric({min: 2, max: 2}).withMessage('El campo no puede estar vacío'),
    check('description').isLength({min: 20}).withMessage('El campo no puede estar vacío, debe tener al menos veinte caracteres'),
    check('imagen').custom((value, { req }) => {
        let file = req.file;
        let extAceptadas = ['.png', '.jpg', '.jpeg', '.gif'];
        if (!file) {
            throw new Error('Tienes que subir una foto');
        } else {
            let extension = path.extname(file.originalname);
            if (!extAceptadas.includes(extension)) {
                throw new Error(`Las extensiones permitidas son: ${extAceptadas.join(', ')}`);
            }
        }
        return true;
    })

]




router.get('/search', searchController.searchBar)

router.get('/list', authMiddleware, notadmMiddleware, Maincontroller.list);

router.get('/create' , authMiddleware, notadmMiddleware, Maincontroller.product);

router.post('/create', productFile.single('imagen'), validaciones, Maincontroller.create);

router.get('/:idProd', Maincontroller.detalle)

router.get('/delete/:idProd', authMiddleware, notadmMiddleware, Maincontroller.list)

router.post('/delete/:idProd', Maincontroller.delete)

router.get('/edit/:idProd', authMiddleware, notadmMiddleware, Maincontroller.edit)

router.post('/edit/:idProd', productFile.single('imagen'), validaciones, Maincontroller.update)

module.exports = router