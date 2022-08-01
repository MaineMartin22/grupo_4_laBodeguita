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

// app.get('/', (req, res) =>{
//     res.sendFile(path.join(__dirname, './view/home.html'))
// });

// app.get('/', (req, res) =>{
//     res.sendFile(path.join(__dirname, './view/home.html'))
// });

// app.get('/', (req, res) =>{
//     res.sendFile(path.join(__dirname, './view/home.html'))
// });

// app.get('/', (req, res) =>{
//     res.sendFile(path.join(__dirname, './view/home.html'))
// });