const express = require("express")
const multer = require("multer")    
const Maincontroller = require("../controllers/mainController")
const router = express.Router()
const { body } = require('express-validator')
const path = require('path')

// IMAGENES A TRAVES DE MULTER

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

router.get('/register' ,Maincontroller.registerUser);

router.post('/register', uploadFile.single('avatar'), validateUser , Maincontroller.updateUser);

router.get('/list' , Maincontroller.userList);

router.get('/delete/:idUser', Maincontroller.userList)

router.delete('/delete/:idUser', Maincontroller.deleteUser)

module.exports = router