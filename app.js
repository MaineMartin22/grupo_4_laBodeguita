//  Require's 
const express = require("express")
const dotenv = require("dotenv").config()
const mainRoutes = require("./routes/mainRoutes")
const prodRoutes = require("./routes/prodRoutes")
const userRoutes = require("./routes/userRoutes")
const ejs = require("ejs")
const multer = require("multer")
const methodOverride = require('method-override')
const session = require('express-session');
const logger = require('morgan');

//  express()
const app = express();
app.use(logger('tiny'));

//  Middlewares
app.use(session({ secret: "Nuestro mensaje secreto",
secret: "Nuestro mensaje secreto",
resave: false,
saveUninitialized: false,
 
}));

app.use(express.static('public'));
app.use(express.urlencoded({ extended : true}));
app.use(express.json());
app.use(methodOverride('_method'));
app.use("/", mainRoutes);
app.use("/product", prodRoutes)
app.use("/users", userRoutes)

// Template Engine
app.set("view engine", "ejs");

//  Listen 
app.listen(process.env.PORT || 2000, () =>{
console.log("Servidor corriendo en https://localhost:" + process.env.PORT)
})
// app.use((req,res,next) => {
//     res.status(404).render('not-found');})

