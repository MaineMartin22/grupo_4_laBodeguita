const express = require("express")
const multer = require('multer')
const path = require("path")
const Maincontroller = require('../controllers/mainController')
const userController = require('../controllers/userController')
const router = express.Router()
const { body } = require('express-validator')

// IMAGENES A TRAVES DE MULTER PARA EL AVATAR

const storage = multer.diskStorage({
    destination: (req, file, cb) =>{
        cb(null, './public/images/avatar' )
    },
    filename: (req, file, cb) =>{
        let fileName = `${Date.now()}_img${path.extname(file.originalname)}`
        cb(null, fileName)
    }
});

const uploadFile = multer({ storage });

//VALIDACIONES

const validateUser = [
    body('nombre')
    .notEmpty().withMessage('Debes completar tu nombre'),
    body('apellido')
    .notEmpty().withMessage('Debes colocar tu apellido'),
    body('direccion')
    .notEmpty().withMessage('Debes colocar tu direccion'),
    body('email')
    .isEmail().withMessage('Debes completar tu email'),
    body('contrasena')
    .notEmpty().withMessage('Debes completar tu contraseña'),
];        

// REGISTER GET

router.get('/register', Maincontroller.registerUser);

// REGISTER POST

router.post('/register', uploadFile.single('avatar'), validateUser, Maincontroller.updateUser);

//Formulario Login

router.get('/login' , userController.login); 

//Proceso de Login
router.post('/login', userController.loginProcess); 

//Perfil de usuario
router.get('/profile/', userController.profile)


router.get('/list' , Maincontroller.userList);

router.get('/delete/:idUser', Maincontroller.userList)

router.delete('/delete/:idUser', Maincontroller.deleteUser)

module.exports = router