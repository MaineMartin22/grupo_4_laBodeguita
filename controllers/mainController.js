const ejs = require("ejs")

const controller = {
    index: (req, res) => {
        res.render("index")},

    register: (req, res) => {res.render("register")},
    productDetail: (req, res) =>{res.render("prodDetail")},
    login: (req, res) => {res.render("login")},
    prodCar:(req, res) => {res.render("prodCar")},
    wine1: (req, res) => {res.render("./productos/vino1")},
    toBuy: (req, res) => {res.render("finalizarCompra")}
}

module.exports = controller