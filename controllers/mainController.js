const ejs = require("ejs")

const User = require('../models/User')

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


const agregarProducto = nuevoProducto =>{
    tinto.push(nuevoProducto);
    return tinto
}


const controller = {
    index: (req, res) => {res.render("index",{tinto:tinto})},
    productDetail: (req, res) =>{res.render("prodDetail",{tinto:tinto})},
    login: (req, res) => {res.render("login")},
    prodCar:(req, res) => {res.render("prodCar")},
    toBuy: (req, res) => {res.render("finalizarCompra")},
    product: (req,res) => {res.render("prodCreate")},
    vinos: (req,res) =>{res.render("vinos", {tinto:tinto})},

    // LISTADO DE PRODUCTOS

    list: function(req, res){
        tinto;
        res.render('prodList', {'tinto':tinto});
    },

    // DETALLE DE CADA UNO

    detalle: function(req,res){
        const idProd = req.params.idProd;

        res.render('vinos', {'tinto': tinto, 'idProd': idProd})
    },
    getData : function () {
        return JSON.parse (fs.readFileSync(this.fileName , 'utf-8'));
     },

    // CREAR PRODUCTOS

    create: function(req, res) {
        let newProducto = {
        id : tinto.length+1,
        name : req.body.name,
        tipo : req.body.tipo,
        bodega : req.body.bodega,
        collapse : 'collapse' + (tinto.length + 1),
        precio : Number(req.body.precio),
        alcohol : req.body.alcohol,
        color : req.body.color,
        oferta: req.body.oferta,
        descuento: Number(req.body.descuento),
        tamaño : req.body.tamano,
        imagen : req.file.originalname,
        }
        tinto.push(newProducto);
        fs.writeFileSync(miPathDataBase, JSON.stringify(tinto, null, ' '))
        res.redirect('/detalleProducto')
    },

    // EDITAR DE PRODUCTO

    edit : function(req, res) {
        const idProd = req.params.idProd;

        res.render('prodEdit', {'tinto': tinto, 'idProd': idProd})
    },

    update:(req, res)=> {
        const idProd = req.params.idProd;

        const vinoEditado = {
            id: idProd,
            name : req.body.name,
            tipo : req.body.tipo,
            bodega : req.body.bodega,
            precio :  Number(req.body.precio),
            alcohol : req.body.alcohol,
            color : req.body.color,
            collapse: 'collapse' + idProd,
            oferta: req.body.oferta,
            descuento: Number(req.body.descuento),
            tamaño : req.body.tamano,
            imagen : req.file.originalname
        }

        const productoEditar = tinto.find(vino => vino.id == idProd)
        const index = tinto.indexOf(productoEditar)

        /* tinto.splice(index, 1, vinoEditado); */
        tinto[index] = vinoEditado

        fs.writeFileSync(miPathDataBase, JSON.stringify(tinto, null, ' '))

        res.redirect('/list')
    },

    // BORRAR PRODUCTO

    
    delete: (req, res) =>{
        const idProd = req.params.idProd;

        const productoEliminar = tinto.find(vino => vino.id == idProd)
        const index = tinto.indexOf(productoEliminar)

        tinto.splice(index, 1);

        fs.writeFileSync(miPathDataBase, JSON.stringify(tinto))

        res.redirect('/list')

    },

    // REGISTRO DE NUEVO USUARIO

    registerUser: (req, res) =>{
        res.render('register')
    },

    updateUser: (req, res) =>{
        let errores = validationResult(req);

        // ERROR SI EXISTE OTRO USUARIO CON EL MISMO EMAIL

        let userInDb = User.findByField('email', req.body.email)

        if (userInDb){
            return res.render('register', {errores: {email: { msg: 'Este email ya está registrado'}}, old: req.body})
        }

        // SI NO HAY ERRORES, SE PROCEDE A CREAR EL USUARIO

        if (errores.isEmpty()){
            let newUser = {
                id : users.length+1,
                nombre : req.body.nombre,
                apellido : req.body.apellido,
                direccion : req.body.direccion,
                email : req.body.email,
                contrasena: bcryptjs.hashSync(req.body.contrasena, 12),
                imagen : req.file.filename
                }

                users.push(newUser);
                fs.writeFileSync(miUserPathDataBase, JSON.stringify(users, null, ' '))
                res.redirect('login');
        }
        else{
            res.render('register', {errores: errores.mapped(), old: req.body},)
        }

    },


    // LOGIN DE USUARIOS

    // Comentado porque lo estan haciendo barb y cele en userController

    // login: (req, res) =>{
    //     return res.send('login')
    // },
    // loginProcess: (req, res) =>{
    //     let userToLogin = User.findByField('email', req.body.email) // buscamos el usuario por su email, ya q es unico

    //     if (userToLogin) {
    //         return res.send(userToLogin)
    //     }

    //     return res.render('login', {
    //         errores: {
    //             email:{
    //                 msg:'No se encuentra este email' 
    //             }
    //         }
    //     })
    // },
    // profile: (req, res) =>{
    //     return res.render('userProfile')
    // },

    // LISTA DE USUARIOS

    userList: function(req, res){
        users;
        res.render('userList', {'users':users});
    },

    // BORRAR USUARIOS

    deleteUser: (req, res) =>{
        const idUser = req.params.idUser;

        const usuarioEliminar = users.find(users => users.id == idUser)
        const index = users.indexOf(usuarioEliminar)

        users.splice(index, 1);

        fs.writeFileSync(miUserPathDataBase, JSON.stringify(users, null, ' '))

        res.redirect('../list')

    },
}

module.exports = controller