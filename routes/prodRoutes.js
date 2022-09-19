const express = require("express")
const Maincontroller = require("../controllers/mainController")
const router = express.Router()

// router.get('/search', Maincontroller.search)

router.get('/:idProd', Maincontroller.detalle)

router.delete('/delete/:idProd', Maincontroller.delete)

router.get('/edit/:idProd', Maincontroller.update)

router.post('/edit/:idProd', Maincontroller.edit)

module.exports = router