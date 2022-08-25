const express = require("express")
const dotenv = require("dotenv").config()
const mainRoutes = require("./routes/mainRoutes")
const ejs = require("ejs")

const app = express()

app.set("view engine", "ejs");

app.use("/", mainRoutes)
app.use(express.static('public'));

app.listen(process.env.PORT || 2000, () =>{
    console.log("Servidor corriendo en https://localhost:" + process.env.PORT)
})