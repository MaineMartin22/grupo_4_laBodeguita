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

const Cellar = db.Cellar


const controller = {
    login: (req, res) => {res.render("./usuarios/login", {usuario: req.session.usuario})},
    prodCar:(req, res) => {res.render("./productos/prodCar", {usuario: req.session.usuario})},
    toBuy: (req, res) => {res.render("./productos/finalizarCompra", {usuario: req.session.usuario})},

    product: function(req, res){
        db.Cellar.findAll()
            .then(function(cellars){
            return res.render('./admin/prodCreate', {cellars, usuario: req.session.usuario})
        })
        },

    index: function(req, res){
    db.Product.findAll()
        .then(function(productos){
            console.log(req.session.usuario)
        return res.render('./web/index.ejs', {productos, usuario: req.session.usuario})
    })
    },
    productDetail: function(req, res){
    db.Product.findAll(
        {   
            include: [{association : 'sizes'}]
        })
        .then(async productos => {
            let sizes = await db.SizeProduct.findAll({
                include: 'size',
                raw: true,
                nest: true
            })
        sizes = sizes.map(size => size.size.size)
        console.log(sizes);
        return res.render('./productos/prodDetail.ejs', {productos, sizes, usuario: req.session.usuario})
    })
    },
    
    // LISTADO DE PRODUCTOS

   list: function(req, res){
    db.Product.findAll()
        .then(function(productos){
        return res.render('./admin/prodList.ejs', {productos, usuario: req.session.usuario})
    })
    },


    // DETALLE DE CADA UNO

    detalle: function(req,res){
    console.log(req.params.idProd);
    db.Product.findByPk(req.params.idProd, {
        include: [{association : 'cellars'}, {association : 'colors'},  'sizes']
    })
        .then( async product => {
            let sizes = await db.SizeProduct.findAll({
                where: {
                    id_product : req.params.idProd
                },
                include: 'size',
                raw: true,
                nest: true
            })
        sizes = sizes.map(size => size.size.size)
        console.log(sizes);
        res.render('./productos/vinos.ejs', {product, sizes, usuario: req.session.usuario});
    });
    },

    // CREAR PRODUCTOS

    create: async function(req, res) {

        const resultValidation = validationResult(req);


        if(resultValidation.errors.length > 0) {
            return  res.render('./admin/prodCreate', {
                usuario: req.session.usuario,
                errors: resultValidation.mapped(),  old: req.body,
            });
        }
        else{
        await db.Product.create({
            name: (req.body.name).toUpperCase(),
            type: req.body.tipo,
            id_cellar: req.body.bodega,
            price: req.body.precio,
            description: req.body.description,
            alcohol: req.body.alcohol,
            id_color: req.body.color,
            sale: req.body.oferta,
            discount: req.body.descuento,
            image: req.file.originalname
        })

        res.redirect('./list')}
    },

    // EDITAR DE PRODUCTO

    edit : function(req,res){
        console.log(req.params.idProd);
        db.Product.findByPk(req.params.idProd)
            .then(product => {
            res.render('./admin/prodEdit',{product, usuario: req.session.usuario} );
        });
        },

    update: async (req, res)=> {
        const resultValidation = validationResult(req);


        if(resultValidation.errors.length > 0) {
            db.Product.findByPk(req.params.idProd)
            .then(product => {
            res.render('./admin/prodEdit',{product, usuario: req.session.usuario, errors: resultValidation.mapped(),  old: req.body,
            } );
        });
        }
        else{
       await db.Product.update({
            name: (req.body.name).toUpperCase(),
            type: req.body.tipo,
            id_cellar: req.body.bodega,
            price: req.body.precio,
            description: req.body.description,
            alcohol: req.body.alcohol,
            color: req.body.color,
            sale: req.body.oferta,
            discount: req.body.descuento,
            image: req.file.originalname
        }, {
        where: {
            id: req.params.idProd
        }
        });

        db.Product.findByPk(req.params.idProd)
        .then(function(producto){
            console.log(producto);
            if (producto) {
                console.log(producto.id);
                console.log(req.body.tamano);
                db.SizeProduct.create({
                    id_product: producto.id,
                    id_size: req.body.tamano
            })
        }
        })

        res.redirect('../list')
    }},

    // BORRAR PRODUCTO


    delete: (req, res) =>{
        id = req.params.idProd
        db.Product.destroy({
        where: {
        id: id
        }
        }).then(function(result){
            res.redirect('../list')
        })
    }
}

module.exports = controller