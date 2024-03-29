//  Require's 
const express = require("express")
const dotenv = require("dotenv").config()
const mainRoutes = require("./routes/mainRoutes")
const prodRoutes = require("./routes/prodRoutes")
const userRoutes = require("./routes/userRoutes")
const apiRoutes = require ("./routes/apiRoutes")
const usersApi = require('./routes/API/usersApi')
const productsApi = require('./routes/API/productsApi')
const cellarApi = require('./routes/API/cellarsApi')
const colorApi = require('./routes/API/colorsApi')
const ejs = require("ejs")
const multer = require("multer")
const methodOverride = require('method-override')
const session = require('express-session');
const cookies = require('cookie-parser');
const logger = require('morgan');
const sequelize = require('sequelize');
const cors = require("cors")

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


app.use(cors())
app.use(express.static('public'));
app.use(express.urlencoded({ extended : true}));
app.use(express.json());
app.use(methodOverride('_method'));
app.use("/", mainRoutes);
app.use("/product", prodRoutes)
app.use("/users", userRoutes)
app.use("/api", apiRoutes)
app.use("/api/users", usersApi);
app.use("/api/products", productsApi);
app.use("/api/cellar", cellarApi);
app.use("/api/colors", colorApi);


// Template Engine
app.set("view engine", "ejs");

//  Listen 
app.listen(process.env.PORT || 2000, () =>{
console.log("Servidor corriendo en https://localhost:" + process.env.PORT)
})
// app.use((req,res,next) => {
//     res.status(404).render('not-found');})

