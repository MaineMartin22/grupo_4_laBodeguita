const express = require("express")
const multer = require("multer")    
const Maincontroller = require("../controllers/mainController")
const router = express.Router()

router.get('/register' ,Maincontroller.registerUser);

router.post('/register' ,Maincontroller.registerUser);

router.post('/register', Maincontroller.updateUser);

router.get('/list' ,Maincontroller.userList);

router.get('/delete/:idUser', Maincontroller.userList)

router.delete('/delete/:idUser', Maincontroller.deleteUser)

module.exports = router