const express = require("express")

const multer = require('multer')

const path = require("path")

const userController = require('../controllers/userController')

const router = express.Router()

const { body, check, validationResult } = require('express-validator')

const db = require('../database/models');

const User2 = db.User2

const guestMiddleware = require('../middlewares/userMiddleware')

const authMiddleware = require('../middlewares/authMiddleware');

const notadmMiddleware = require('../middlewares/notadmMiddleware');
const e = require("express")


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

let validaciones = [
    check('name').isFloat({min: 2}).withMessage('El campo nombre no puede estar vacío, debe tener al menos dos caracteres'),
    check('surname').isFloat({min: 2}).withMessage('El campo apellido no puede estar vacío, debe tener al menos dos caracteres'),
    check('direction').notEmpty().withMessage('El campo dirección no puede estar vacío'),
    check('email').isEmail().withMessage('Agregar un email válido'),
  //Aquí valido el Password   
    check('password').isStrongPassword({ minLength: 8,
        minLowercase: 1,
        minUppercase: 1,
        minNumbers: 1,
        minSymbols: 1,}).withMessage('La contraseña deberá ser minimamente de 8 caracteres y poseer letras mayúsculas, minúsculas, un número y un carácter especial.'),
  //Aquí valido si eusuario existe o no en la tabla de usuarios Por el campo email)
  //Aquí valido la confimación del password dispuesto por el usuario
  check('repassword').isStrongPassword({ minLength: 8,
    minLowercase: 1,
    minUppercase: 1,
    minNumbers: 1,
    minSymbols: 1,}).withMessage('La contraseña deberá ser minimamente de 8 caracteres y poseer letras mayúsculas, minúsculas, un número y un carácter especial.'),

  check('repassword').custom((value, {req}) =>{
        if(req.body.password == value ){
            return true    // Si yo retorno un true  no se muestra el error     
        }else{
            return false   // Si retorno un false si se muestra el error
        }}).withMessage('Las contraseñas deben ser iguales'),

    check('avatar').custom((value, { req }) => {
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
        })];

router.get('/register', guestMiddleware, userController.registerUser);

router.post('/register', guestMiddleware, uploadFile.single('avatar'), validaciones, userController.updateUser);


router.get('/login' , guestMiddleware, userController.login); 

//Proceso de Login
router.post('/login', userController.loginProcess); 

//Perfil de usuario
router.get('/profile', authMiddleware, userController.profile)

//Proceso LogOut
router.get('/logout', userController.logout)

// LISTA DE USUARIOS

router.get('/list', authMiddleware, notadmMiddleware, userController.userList);

//BORRAR USUARIOS

router.get('/delete/:idUser', authMiddleware, notadmMiddleware, userController.userList)

router.delete('/delete/:idUser', userController.deleteUser)

// EDITAR USUARIO DESDE ADMIN

router.get('/edit/:idUser', authMiddleware, notadmMiddleware, userController.userEdit )

router.post('/edit/:idUser', uploadFile.single('avatar'), userController.userEditUpdate)

module.exports = router