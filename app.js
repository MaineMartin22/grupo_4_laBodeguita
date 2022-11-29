//  Require's 
const express = require("express")
const dotenv = require("dotenv").config()
const mainRoutes = require("./routes/mainRoutes")
const prodRoutes = require("./routes/prodRoutes")
const userRoutes = require("./routes/userRoutes")
const apiRoutes = require ("./routes/apiRoutes")
const ejs = require("ejs")
const multer = require("multer")
const methodOverride = require('method-override')
const session = require('express-session');
const cookies = require('cookie-parser');
const logger = require('morgan');
const sequelize = require('sequelize');

const userLoggedMiddleware = require('./middlewares/userLoggedMiddleware');


//  express()
const app = express();
app.use(logger('tiny'));

//  Middlewares
app.use(session({ 
secret: "Nuestro mensaje secreto",
resave: false,
saveUninitialized: false,
}));

// cookies

app.use(cookies());

// usuario logeado

app.use(userLoggedMiddleware);

app.use(express.urlencoded({ extended: false }));



app.use(express.static('public'));
app.use(express.urlencoded({ extended : true}));
app.use(express.json());
app.use(methodOverride('_method'));
app.use("/", mainRoutes);
app.use("/product", prodRoutes)
app.use("/users", userRoutes)
app.use("/api", apiRoutes)


// Template Engine
app.set("view engine", "ejs");

//  Listen 
app.listen(process.env.PORT || 2000, () =>{
console.log("Servidor corriendo en https://localhost:" + process.env.PORT)
})
// app.use((req,res,next) => {
//     res.status(404).render('not-found');})

