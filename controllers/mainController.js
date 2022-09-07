const ejs = require("ejs")
const productsModel = require('../models/productsModel')
const fs = require('fs');
const path = require('path')
const miPathDataBase = path.join(__dirname, '../data/productos.json')
const prods = fs.readFileSync('./data/productos.json', 'utf-8');
const tinto = JSON.parse(prods);

const agregarProducto = nuevoProducto =>{
    tinto.push(nuevoProducto);

    return tinto
}

const controller = {
    index: (req, res) => {res.render("index",{tinto:tinto})},
    register: (req, res) => {res.render("register")},
    productDetail: (req, res) =>{res.render("prodDetail",{tinto:tinto})},
    login: (req, res) => {res.render("login")},
    prodCar:(req, res) => {res.render("prodCar")},
    toBuy: (req, res) => {res.render("finalizarCompra")},
    product: (req,res) => {res.render("prodCreate")},
    vinos: (req,res) =>{res.render("vinos", {tinto:tinto})},

    list: function(req, res){
        tinto;
        res.render('prodList', {'tinto':tinto});
    },

    // search: function(req, res) {
    //     let prodSearch = req.query.search;
    //     tinto;

    //     let prodResults = [];

    //     for (let i = 0; i < tinto.length; i++) {
    //         if (tinto[i].name.includes(prodSearch)) {
    //             prodResults.push(tinto[i])
    //         }
            
    //         res.send(prodResults)
    //     }
    // },

    create: function(req, res) {
        let newProducto = {
        id : tinto.length+1,
        name : req.body.name,
        tipo : req.body.tipo,
        bodega : req.body.bodega,
        collapse : 'collapse' + (tinto.length + 1),
        precio : req.body.precio,
        alcohol : req.body.alcohol,
        color : req.body.color,
        oferta: req.body.oferta,
        descuento: req.body.descuento,
        tamaño : req.body.tamaño,
        imagen : req.body.imagen
        }
        tinto.push(newProducto);
        fs.writeFileSync(miPathDataBase, JSON.stringify(tinto, null, ' '))
        res.redirect('/detalleProducto')
    },

    // edit : function(req, res) {
    //     let idProd = req.params.idProd;
    //     tinto;

    //     let prodToEdit = tinto[idProd - 1];

    //     res.render("prodEdit", {prodToEdit: prodToEdit});
    // },

    // update: (req, res) =>{
    //     const idProd = Number(req.params.idProd);

    //     const newArrayProducts = tinto.map(oneProduct => {
    //         if (oneProduct.id === Number(req.params.idProd)){
    //             let newTinto = {};
    //             newTinto[tinto.id] = tinto.id
    //             return newTinto
    //         }
    //         return oneProduct
    //     });
    //     res.render("prodEdit",{newArrayProducts:newArrayProducts})
    //     res.redirect('/prodEdit')
    // },

    // delete: (req, res) =>{
    //     const idProd = req.params.idProd;
    //     tinto;
    //     let prodToDelete = tinto.splice(0,idProd);
    //     res.render("prodList", {prodToDelete: prodToDelete})
    // }
}

module.exports = controller