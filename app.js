const express = require("express")
const dotenv = require("dotenv").config()
const mainRoutes = require("./routes/mainRoutes")
const ejs = require("ejs")
const app = express()
const methodOverride = require('method-override')

app.set("view engine", "ejs");
app.use(express.urlencoded({ extended : true}));
app.use(express.json());
app.use("/", mainRoutes);
app.use(express.static('public'));
app.use(methodOverride('_method'));
app.listen(process.env.PORT || 2000, () =>{
console.log("Servidor corriendo en https://localhost:" + process.env.PORT)
})
// app.use((req,res,next) => {
//     res.status(404).render('not-found');})

