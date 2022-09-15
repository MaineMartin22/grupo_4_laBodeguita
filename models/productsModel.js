const Maincontroller = require("../controllers/mainController")
const ejs = require("ejs")
const productsModel = require('../models/productsModel')
const fs = require('fs');
const path = require('path');
const update = require("../controllers/mainController");
const miPathDataBase = path.join(__dirname, '../data/productos.json')
const prods = fs.readFileSync('./data/productos.json', 'utf-8');
const tinto = JSON.parse(prods);

function subir(){
    const editProductIndex = tinto.findIndex(vino => vino.id == this.id)
    tinto[editProductIndex] = this;
}

module.exports = subir