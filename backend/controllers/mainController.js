const fs = require('fs');

const path = require('path')

const bcryptjs = require("bcryptjs")

const { validationResult } = require('express-validator')

const db = require('../database/models');
const sequelize = db.sequelize;
const { Op } = require("sequelize");



const controller = {
    login: (req, res) => {res.render("./usuarios/login", {usuario: req.session.usuario})},
    prodCar:(req, res) => {res.render("./productos/prodCar", {usuario: req.session.usuario})},
    toBuy: (req, res) => {res.render("./productos/finalizarCompra", {usuario: req.session.usuario})},

    product: async function(req, res){
        const cellars = await db.Cellar.findAll()
        const sizes = await db.Size.findAll()
        const colors = await db.Color.findAll()

            return res.render('./admin/prodCreate', {cellars, sizes, colors, usuario: req.session.usuario})
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
            let sizes = await db.Size.findAll({
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

    detalle: async function(req,res){
    const product = await db.Product.findByPk(req.params.idProd, {
        include: ['cellars', 'colors',  'sizes']
    })
        res.render('./productos/vinos.ejs', {product, usuario: req.session.usuario});
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
            const productStored = await db.Product.create({
            name: (req.body.name).toUpperCase(),
            type: req.body.tipo,
            id_cellar: req.body.bodega,
            price: req.body.precio,
            description: req.body.description,
            alcohol: req.body.alcohol,
            id_color: req.body.color,
            sale: req.body.oferta,
            discount: req.body.descuento,
            ficha: req.file.originalname,
            image: req.file.originalname
        })
        productStored.addSize(req.body.tamano);

        res.redirect('./list')}
    },

    // EDITAR DE PRODUCTO

    edit : async function(req,res){
        const product = await db.Product.findByPk(req.params.idProd)
        const cellars = await db.Cellar.findAll()
        const sizes = await db.Size.findAll()
        const colors = await db.Color.findAll()
        
        res.render('./admin/prodEdit',{product, cellars, sizes, colors, usuario: req.session.usuario} );
        },

    update: async (req, res)=> {
        const resultValidation = validationResult(req);


        if(resultValidation.errors.length > 0) {
            db.Product.findByPk(req.params.idProd, { include: ['cellars', 'colors',  'sizes'] })
            .then(product => {
            res.render('./admin/prodEdit',{product, usuario: req.session.usuario, errors: resultValidation.mapped(),  old: req.body,
            } );
        });
        }
        
        else{
            const productEdit = await db.Product.findByPk(req.params.idProd, { include: ['cellars', 'colors',  'sizes'] })
            db.Product.update({
            name: (req.body.name).toUpperCase(),
            type: req.body.tipo,
            id_cellar: req.body.bodega,
            price: req.body.precio,
            description: req.body.description,
            alcohol: req.body.alcohol,
            color: req.body.color,
            sale: req.body.oferta,
            discount: req.body.descuento,
            ficha: req.file.originalname,
            image: req.file.originalname
        }, {
        where: {
            id: req.params.idProd
        }
        });
        productEdit.addSize(req.body.tamano);

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