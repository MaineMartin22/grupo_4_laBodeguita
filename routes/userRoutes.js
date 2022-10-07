const express = require("express")
const multer = require('multer')
const path = require("path")
const Maincontroller = require("../controllers/mainController")
const router = express.Router()


var storage = multer.diskStorage ({
    destination : ( req , file , cb ) => {
         cb ( null , path.join( __dirname, '../public/images/avatars'));
        },
        filename : ( req , file , cb ) => {
            const newFilename = 'avatar-' + Date.now ( ) + path.extname ( file.originalname ) ;
            cb ( null , newFilename ) ;
        }
    });

var upload = multer({storage});
        

router.get('/register', Maincontroller.registerUser);

router.post('/register', upload.single('avatar'), Maincontroller.registerUser);

router.get('/list' ,Maincontroller.userList);

router.get('/delete/:idUser', Maincontroller.userList)

router.delete('/delete/:idUser', Maincontroller.deleteUser)

module.exports = router