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


const controller = {
    login: (req, res) => {res.render("./usuarios/login")},
    prodCar:(req, res) => {res.render("./productos/prodCar")},
    toBuy: (req, res) => {res.render("./productos/finalizarCompra")},
    product: (req,res) => {res.render("./admin/prodCreate")},

    index: function(req, res){
    db.Product.findAll()
        .then(function(productos){
        return res.render('./web/index.ejs', {productos})
    })
    },

    productDetail: function(req, res){
    db.Product.findAll()
        .then(function(productos){
        return res.render('./productos/prodDetail.ejs', {productos})
    })
    },
    
    // LISTADO DE PRODUCTOS

   list: function(req, res){
    db.Product.findAll()
        .then(function(productos){
        return res.render('./admin/prodList.ejs', {productos})
    })
    },


    // DETALLE DE CADA UNO

    detalle: function(req,res){
    console.log(req.params.idProd);
    db.Product.findByPk(req.params.idProd, {
        include: [{association : 'cellars'}, {association : 'colors'}]
    })
        .then(product => {
        res.render('./productos/vinos.ejs', {product});
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
            image: req.file.originalname

        })
        res.redirect('./productos/detalleProducto')
    },

    // EDITAR DE PRODUCTO

    edit : function(req,res){
        console.log(req.params.idProd);
        db.Product.findByPk(req.params.idProd)
            .then(product => {
            res.render('./admin/prodEdit',{product} );
        });
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
            image: req.file.originalname

        }, {
        where: {
            id: req.params.idProd
        }
        });

        res.redirect('../list')
    },

    // BORRAR PRODUCTO


    delete: async (req, res) =>{
        db.Product.destroy({
        where: {
        id: req.params.idProd
        }
        })
        res.redirect('/product/list')

    }
}

module.exports = controller