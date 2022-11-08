const ejs = require("ejs")

const User = require('../data/models/User')

const fs = require('fs');

const path = require('path')

const bcryptjs = require("bcryptjs")

const miPathDataBase = path.join(__dirname, '../data/productos.json')

const miUserPathDataBase = path.join(__dirname, '../data/usuarios.json')

const prods = fs.readFileSync('./data/productos.json', 'utf-8');

const usuario = fs.readFileSync('./data/usuarios.json', 'utf-8');

const tinto = JSON.parse(prods);

const users = JSON.parse(usuario);

const { validationResult } = require('express-validator')

const db = require('../database/models');
const sequelize = db.sequelize;
const { Op } = require("sequelize");

const Product = db.Product


const agregarProducto = nuevoProducto =>{
    tinto.push(nuevoProducto);
    return tinto
}


const controller = {
    productDetail: (req, res) =>{res.render("prodDetail",{tinto})},
    login: (req, res) => {res.render("login")},
    prodCar:(req, res) => {res.render("prodCar")},
    toBuy: (req, res) => {res.render("finalizarCompra")},
    product: (req,res) => {res.render("prodCreate")},
    vinos: (req,res) =>{res.render("vinos", {tinto})},
    index: function(req, res){
        db.Product.findAll()
            .then(function(productos){
            return res.render('index.ejs', {productos})
        })
        },
    
    // LISTADO DE PRODUCTOS

   list: function(req, res){
    db.Product.findAll()
        .then(function(productos){
        return res.render('prodList.ejs', {productos})
    })
    },


    // DETALLE DE CADA UNO

    detalle: function(req,res){
    db.Product.findByPk(req.params.id)
    .then(product => {
        res.render('prodDetail.ejs', {product});
    });
    },

    // CREAR PRODUCTOS

    create: function(req, res) {
        db.Product.create({
            name: req.body.name,
            type: req.body.tipo,
            id_cellar: req.body.bodega,
            price: req.body.precio,
            alcohol: req.body.alcohol,
            color: req.body.color,
            sale: req.body.oferta,
            discount: req.body.descuento,
            size: req.body.tamano,
            image: req.body.imagen

        })
        res.redirect('/detalleProducto')
    },

    // EDITAR DE PRODUCTO

    edit : function(req, res) {
        let pedidoProducto = db.Product.findByPk(req.params.id);
        let pedidoGenero = db.Genre.findAll();

        Promise.all[pedidoProducto, pedidoGenero]
        .then(function([producto, generos]){
            res.render('prodEdit', {producto, generos})
        })
    },

    update:(req, res)=> {
        db.Product.update({ 
            name: req.body.name,
            type: req.body.tipo,
            id_cellar: req.body.bodega,
            price: req.body.precio,
            alcohol: req.body.alcohol,
            color: req.body.color,
            sale: req.body.oferta,
            discount: req.body.descuento,
            size: req.body.tamano,
            image: req.body.imagen

        }, {
        where: {
            id: req.params.id
        }
        });

        res.redirect('/list')
    },

    // BORRAR PRODUCTO


    delete: (req, res) =>{
        db.Product.destroy({
        where: {
        id: req.params.id
        }
        })
        res.redirect('/list')

    }
}

module.exports = controller