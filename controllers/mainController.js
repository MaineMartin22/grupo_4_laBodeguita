const ejs = require("ejs")
const subir = require('../models/productsModel')
const fs = require('fs');
const path = require('path')
const bcryptjs = require("bcryptjs")

const miPathDataBase = path.join(__dirname, '../data/productos.json')
const miUserPathDataBase = path.join(__dirname, '../data/usuarios.json')
const prods = fs.readFileSync('./data/productos.json', 'utf-8');
const usuario = fs.readFileSync('./data/usuarios.json', 'utf-8');
const tinto = JSON.parse(prods);
const users = JSON.parse(usuario);

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

    list: function(req, res){
        tinto;
        res.render('prodList', {'tinto':tinto});
    },

    detalle: function(req,res){
        const idProd = req.params.idProd;

        res.render('vinos', {'tinto': tinto, 'idProd': idProd})
    },

    // search: function(req, res) {
    //     let prodBuscado = req.query.search;
    //     let prodResult = [];

    //     for (let i = 0; i < tinto.length; i++) {
    //         if (tinto[i].name.includes(prodBuscado)) {
    //         prodResult.push(tinto[i]);
    //     }
    //     }

    //     res.render('prodResults', {prodResult: prodResult})
    // },
    getData : function () {
        return JSON.parse (fs.readFileSync(this.fileName , 'utf-8'));
     },


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
        tamaño : req.body.tamaño,
        imagen : req.body.imagen
        }
        tinto.push(newProducto);
        fs.writeFileSync(miPathDataBase, JSON.stringify(tinto, null, ' '))
        res.redirect('/detalleProducto')
    },

     update : function(req, res) {
        let idProd = req.params.idProd;

        let prodToEdit = tinto[idProd - 1];

        res.render("prodEdit", {prodToEdit: prodToEdit});
    },

    edit:(req, res)=> {
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
            tamaño : req.body.tamaño,
            imagen : req.body.imagen
        }

        const productoEditar = tinto.find(vino => vino.id == idProd)
        const index = tinto.indexOf(productoEditar)

        /* tinto.splice(index, 1, vinoEditado); */
        tinto[index] = vinoEditado

        fs.writeFileSync(miPathDataBase, JSON.stringify(tinto, null, ' '))

        res.redirect('/detalleProducto')
    },
    


    delete: (req, res) =>{
        const idProd = req.params.idProd;

        const productoEliminar = tinto.find(vino => vino.id == idProd)
        const index = tinto.indexOf(productoEliminar)

        tinto.splice(index, 1);

        fs.writeFileSync(miPathDataBase, JSON.stringify(tinto))

        res.redirect('/list')

    },

    registerUser: (req, res) =>{

        let newUser = {
            id: users.length+1,
            nombre: req.body.nombre,
            apellido: req.body.apellido,
            email: req.body.email,
            password: req.body.password,
            categoria: req.body.categoria,
            imagen: req.body.avatar,
            }

            newUser = {
                ... req.body,
                password: bcryptjs.hashSync(req.body.password, 12)
            }

            users.push(newUser);
            fs.writeFileSync(miUserPathDataBase, JSON.stringify(users, null, ' '))
            res.render("register")

    },

    updateUser: (req, res) =>{
        let idUser = req.params.idUser;

        let userCreate = users[idUser - 1];

        res.render("index", {userCreate: userCreate, tinto: tinto});

    },

    userList: function(req, res){
        users;
        res.render('userList', {'users':users});
    },

    deleteUser: (req, res) =>{
        const idUser = req.params.idUser;

        const usuarioEliminar = users.find(users => users.id == idUser)
        const index = users.indexOf(usuarioEliminar)

        users.splice(index, 1);

        fs.writeFileSync(miUserPathDataBase, JSON.stringify(users))

        res.redirect('../list')

    },
}

module.exports = controller