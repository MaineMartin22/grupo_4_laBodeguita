const express = require("express")
const dotenv = require("dotenv").config()
const mainRoutes = require("./routes/mainRoutes")

const app = express()

app.use(mainRoutes)
app.use(express.static('public'));

app.listen(process.env.PORT || 2000, () =>{
    console.log('servidor corriendo');
})



