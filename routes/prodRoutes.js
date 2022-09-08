const express = require("express")
const Maincontroller = require("../controllers/mainController")
const router = express.Router()

router.delete('/delete/:idProd', Maincontroller.delete)

router.put("/edit")

module.exports = router