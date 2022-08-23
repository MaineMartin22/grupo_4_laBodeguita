const path = require("path");

const controller = {
    index: (req, res) => {res.sendFile(path.join(__dirname, '../view/index.html'))},
    register: (req, res) => {res.sendFile(path.join(__dirname, '../view/register.html'))},
    productDetail: (req, res) =>{res.sendFile(path.join(__dirname, '../view/prodDetail.html'))},
    login: (req, res) => {res.sendFile(path.join(__dirname, '../view/login.html'))},
    prodCar:(req, res) => {res.sendFile(path.join(__dirname, '../view/prodCar.html'))},
    wine1: (req, res) => {res.sendFile(path.join(__dirname, '../view/productos/vino1.html'))},
    toBuy: (req, res) => {res.sendFile(path.join(__dirname, '../view/finalizarCompra.html'))}
}

module.exports = controller