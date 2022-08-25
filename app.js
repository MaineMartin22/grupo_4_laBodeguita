<<<<<<< HEAD

const  express = require('express');

const path = require('path');
const app = express();

app.listen(2000, () =>{
    console.log('servidor corriendo');
})
=======
const express = require("express")
const dotenv = require("dotenv").config()
const mainRoutes = require("./routes/mainRoutes")
const ejs = require("ejs")

const app = express()

app.set("view engine", "ejs");
>>>>>>> 4be201b4312d9fab65208d039b451c84e7f2ec55

app.use("/", mainRoutes)
app.use(express.static('public'));

app.listen(process.env.PORT || 2000, () =>{
    console.log("Servidor corriendo en https://localhost:" + process.env.PORT)
})



