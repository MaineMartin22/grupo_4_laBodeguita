const  express = require('express');

const path = require('path');

const app = express();

app.listen(3000, () =>{
    console.log('servidor corriendo');
})

app.use(express.static('public'));


// Respondemos a 
app.get('/', (req, res) =>{
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