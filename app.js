const  express = require('express');
const path = require('path');
const dotenv = require('dotenv').config();


const app = express();



app.listen(process.env.PORT, () =>{
    console.log('servidor corriendo en el puerto ' + process.env.PORT);
})


app.use(express.static('public'));


// Respondemos a 
app.get('/', (req, res) =>{
    res.sendFile(path.join(__dirname, './view/index.html'))
});

app.get('/home', (req, res) =>{
    res.sendFile(path.join(__dirname, './view/index.html'))
});


app.get('/register', (req, res) =>{
    res.sendFile(path.join(__dirname, './view/register.html'))
});

app.get('/detalleProducto', (req, res) =>{
    res.sendFile(path.join(__dirname, './view/prodDetail.html'))
});

app.get('/login', (req, res) =>{
    res.sendFile(path.join(__dirname, './view/login.html'))
});

app.get('/carrito', (req, res) =>{
    res.sendFile(path.join(__dirname, './view/prodCar.html'))
});

app.get('/vino1', (req, res) =>{
    res.sendFile(path.join(__dirname, './view/productos/vino1.html'))
});

app.get('/finalizarCompra', (req, res) =>{
    res.sendFile(path.join(__dirname, './view/finalizarCompra.html'))
});

