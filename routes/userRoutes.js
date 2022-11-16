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
    body('name').notEmpty().withMessage('El campo nombre no puede estar vacío'),
    body('surname').notEmpty().withMessage('El campo nombre no puede estar vacío'),
    body('direction').notEmpty().withMessage('El campo nombre no puede estar vacío'),
    body('email').isEmail().withMessage('Agregar un email válido'),
  //Aquí valido el Password   
    body('password').notEmpty({min: 6 }).withMessage('La contraseña debe tener un mínimo de 6 caractéres al menos una letra y un número'),
  //Aquí valido si eusuario existe o no en la tabla de usuarios Por el campo email)
  //Aquí valido la confimación del password dispuesto por el usuario
    body('repassword').isLength({min: 6 }).withMessage('La confirmación de la contraseña debe tener un mínimo de 6 caractéres'),


//Aquí valido si las contraseñas son iguales o no
//El ( value ) viene a ser el valor que viaje en el name del del input del campo 
//El valor { req } corresponde a lo que viene desde el formulario

    body('repassword').custom((value, {req}) =>{
        if(req.body.password == value ){
            return true    // Si yo retorno un true  no se muestra el error     
        }else{
            return false   // Si retorno un false si se muestra el error
        }}).withMessage('Las contraseñas deben ser iguales')];



//Aquí obligo a que el usuario seleccione su avatar
// body('avatar').custom(function (value, { req }) {
//   let ext
//   if(req.file != undefined ){
//       return true
//   }else{
//       ext = ""+path.extname(req.files[0].filename).toLowerCase();
//   }
//   //console.log(ext);
//   if (
//       ext == ".jpg" ||
//       ext == ".jpeg" ||
//       ext == ".png" ||
//       ext == ".gif"){
//           return true;
//       }
//       return false;
// }).withMessage('Solo debe seleccionar archivos  con extensión JPG, JPEG, PNG o GIF')
// ]

// REGISTER GET

router.get('/register', guestMiddleware, userController.registerUser);

router.post('/register', guestMiddleware, uploadFile.single('avatar'), validaciones, userController.updateUser);



// User2.findAll()
//     .then((users) => {
//     router.post('/register', guestMiddleware, uploadFile.single('avatar'),[
//       //Aquí incoporé otras validaciones, para que las tengan de guía para sus proyectos  
//       body('name').isLength({
//             min: 1
//           }).withMessage('El campo nombre no puede estar vacío'),
//           body('surname').isLength({min: 1   
//           }).withMessage('El campo apellido no puede estar vacío'),
//           check('direction').isLength({
//             min: 1
//           }).withMessage('El campo nombre no puede estar vacío'),
//           body('email').isEmail().withMessage('Agregar un email válido'),

//       //Aquí valido el Password   
//       body('password').isLength({min: 6 }).withMessage('La contraseña debe tener un mínimo de 6 caractéres al menos una letra y un número'),
//       //Aquí valido si eusuario existe o no en la tabla de usuarios Por el campo email)
//       body('email').custom(function (value) {
//         let contador = 0;
//         for (let i = 0; i < users.length; i++) {
//             if (users[i].email == value) {
//                 contador++;
//             }
//         }
//         if (contador > 0) {
//             return false;   // Si retorno falso no aparece el mensaje de error
//         } else {
//             return true;    //Si retorno true, aparece el mensaje de error
//         }
//       }).withMessage('Usuario ya se encuentra registrado'),

//       //Aquí valido la confimación del password dispuesto por el usuario
//       body('repassword').isLength({min: 6 }).withMessage('La confirmación de la contraseña debe tener un mínimo de 6 caractéres'),

//     //Aquí valido si las contraseñas son iguales o no
//     //El ( value ) viene a ser el valor que viaje en el name del del input del campo 
//     //El valor { req } corresponde a lo que viene desde el formulario

//     body('repassword').custom((value, {req}) =>{
//             if(req.body.password == value ){
//                 return true    // Si yo retorno un true  no se muestra el error     
//             }else{
//                 return false   // Si retorno un false si se muestra el error
//             }    
//     }).withMessage('Las contraseñas deben ser iguales'),

//     //Aquí obligo a que el usuario seleccione su avatar
//     body('avatar').custom(function (value, { req }) {
//       let ext
//       if(req.file != undefined ){
//           return true
//       }else{
//           ext = ""+path.extname(req.files[0].filename).toLowerCase();
//       }
//       //console.log(ext);
//       if (
//           ext == ".jpg" ||
//           ext == ".jpeg" ||
//           ext == ".png" ||
//           ext == ".gif"){
//               return true;
//           }
//           return false;
//     }).withMessage('Solo debe seleccionar archivos  con extensión JPG, JPEG, PNG o GIF')
//     ], userController.updateUser)
//   })
//   .catch((errors) => {
//       console.log(errors);
// })


// const validationResult = [
//     check('name').isLength({min: 1}).withMessage('El campo nombre no puede estar vacío'),
//     check('surname').isLength({min: 1}).withMessage('El campo apellido no puede estar vacío'),
//     check('direction').isLength({min: 1}).withMessage('El campo apellido no puede estar vacío'),
//     check('email').isEmail().withMessage('Agregar un email válido'),


//   //Aquí valido el Password   
//   check('password').isLength({min: 6 }).withMessage('La contraseña debe tener un mínimo de 6 caractéres al menos una letra y un número'),
//   //Aquí valido si eusuario existe o no en la tabla de usuarios Por el campo email)
//   check('email').custom(function(value){
//    User2.findAll().then(function(result) {
//         let users = result;
//         console.log(users.forEach(e => {
//             console.log(e.dataValues.email);
//             if (e.dataValues.email == req.body.email) {
//                 return false;   // Si retorno falso no aparece el mensaje de error
//             } else {
//                 return true;    //Si retorno true, aparece el mensaje de error
//             }
//         }));
//     })
//   }).withMessage('Usuario ya se encuentra registrado'),

// //Aquí valido la confimación del password dispuesto por el usuario
// check('repassword').isLength({min: 6 }).withMessage('La confirmación de la contraseña debe tener un mínimo de 6 caractéres'),

// //Aquí valido si las contraseñas son iguales o no
// //El ( value ) viene a ser el valor que viaje en el name del del input del campo 
// //El valor { req } corresponde a lo que viene desde el formulario

// check('repassword').custom((value, {req}) =>{
//         if(req.body.password == value ){
//             return true    // Si yo retorno un true  no se muestra el error     
//         }else{
//             return false   // Si retorno un false si se muestra el error
//         }    
// }).withMessage('Las contraseñas deben ser iguales'),

// ];        


// REGISTER POST

// router.post('/register', uploadFile.single('avatar'), userController.updateUser);

//Formulario Login

router.get('/login' , guestMiddleware, userController.login); 

//Proceso de Login
router.post('/login', userController.loginProcess); 

//Perfil de usuario
router.get('/profile', authMiddleware, userController.profile)

//Proceso LogOut
router.get('/logout', userController.logout)

// LISTA DE USUARIOS

router.get('/list', notadmMiddleware, userController.userList);

//BORRAR USUARIOS

router.get('/delete/:idUser', notadmMiddleware, userController.userList)

router.delete('/delete/:idUser', userController.deleteUser)

// EDITAR USUARIO DESDE ADMIN

router.get('/edit/:idUser', notadmMiddleware, userController.userEdit )

router.post('/edit/:idUser', uploadFile.single('avatar'), userController.userEditUpdate)

module.exports = router