const ejs = require("ejs")
const productsModel = require('../models/productsModel')


const tinto = [
    { id: 1, oferta: true, porcen:0.1, name: "Magna", tipo : "Tinto", bodega: "Malbec", tamaño: "750ml", collapse: "collapse1", precio: 3590.00, alcohol: "14,1 vol", color: "Rojo violeta, profundo y vivo con matices azulados.", imagen:'/images/CADUS-SINGLE-VINEYARD.jpg'},
    { id: 2, oferta: true, porcen:0.2, name: "Santa Julia", tipo : "Tinto", bodega: "Malbec", tamaño: "750ml", collapse: "collapse2", precio: 3590.00, alcohol: "14,1 vol", color: "Rojo violeta, profundo y vivo con matices azulados.", imagen:'/images/CADUS-SINGLE-VINEYARD.jpg'},
    { id: 3, oferta: true, porcen:0.3, name: "Las Perdices", tipo : "Tinto", bodega: "Malbec", tamaño: "750ml", collapse: "collapse3", precio: 3590.00, alcohol: "14,1 vol", color: "Rojo violeta, profundo y vivo con matices azulados.", imagen:'/images/CADUS-SINGLE-VINEYARD.jpg'},
    { id: 4, oferta: true, porcen:0.1, name: "La Linda", tipo : "Tinto", bodega: "Malbec", tamaño: "750ml", collapse: "collapse4", precio: 3590.00, alcohol: "14,1 vol", color: "Rojo violeta, profundo y vivo con matices azulados.", imagen:'/images/CADUS-SINGLE-VINEYARD.jpg'},
    { id: 5, oferta: false, porcen:0.1, name: "Tintillo", tipo : "Tinto", bodega: "Malbec", tamaño: "750ml", collapse: "collapse5", precio: 3590.00, alcohol: "14,1 vol", color: "Rojo violeta, profundo y vivo con matices azulados.", imagen:'/images/CADUS-SINGLE-VINEYARD.jpg'},
    { id: 6, oferta: false, porcen:0.2, name: "El Burro", tipo : "Tinto", bodega: "Malbec", tamaño: "750ml", collapse: "collapse6", precio: 3590.00, alcohol: "14,1 vol", color: "Rojo violeta, profundo y vivo con matices azulados.", imagen:'/images/CADUS-SINGLE-VINEYARD.jpg'},
    { id: 7, oferta: false, porcen:0.3, name: "El Zorrito", tipo : "Tinto", bodega: "Malbec", tamaño: "750ml", collapse: "collapse7", precio: 3590.00, alcohol: "14,1 vol", color: "Rojo violeta, profundo y vivo con matices azulados.", imagen:'/images/CADUS-SINGLE-VINEYARD.jpg'},
    { id: 8, oferta: false, porcen:0.1, name: "La Mantis", tipo : "Tinto", bodega: "Malbec", tamaño: "750ml", collapse: "collapse8", precio: 3590.00, alcohol: "14,1 vol", color: "Rojo violeta, profundo y vivo con matices azulados.", imagen:'/images/CADUS-SINGLE-VINEYARD.jpg'}
];

const oferta = [
    { id: 1, oferta: 10, porcen:0.1, name: "Magna", tipo : "Tinto", bodega: "Malbec", tamaño: "750ml", collapse: "collapse1", precio: 3590.00, alcohol: "14,1 vol", color: "Rojo violeta, profundo y vivo con matices azulados."},
    { id: 2, oferta: 20, porcen:0.2, name: "Santa Julia", tipo : "Tinto", bodega: "Malbec", tamaño: "750ml", collapse: "collapse2", precio: 3590.00, alcohol: "14,1 vol", color: "Rojo violeta, profundo y vivo con matices azulados."},
    { id: 3, oferta: 30, porcen:0.3, name: "Las Perdices", tipo : "Tinto", bodega: "Malbec", tamaño: "750ml", collapse: "collapse3", precio: 3590.00, alcohol: "14,1 vol", color: "Rojo violeta, profundo y vivo con matices azulados."},
    { id: 4, oferta: 10, porcen:0.1, name: "La Linda", tipo : "Tinto", bodega: "Malbec", tamaño: "750ml", collapse: "collapse4", precio: 3590.00, alcohol: "14,1 vol", color: "Rojo violeta, profundo y vivo con matices azulados."},];




const agregarProducto = nuevoProducto =>{
    tinto.push(nuevoProducto);

    return tinto
}



const controller = {
    index: (req, res) => {res.render("index",{oferta:oferta})},
    register: (req, res) => {res.render("register")},
    productDetail: (req, res) =>{res.render("prodDetail",{tinto:tinto})},
    login: (req, res) => {res.render("login")},
    prodCar:(req, res) => {res.render("prodCar")},
    toBuy: (req, res) => {res.render("finalizarCompra")},
    product: (req,res) => {res.render("prodCreate")},

    list: function(req, res){
        tinto;
        res.render('prodList', {'tinto':tinto});
    },

    search: function(req, res) {
        let prodSearch = req.query.search;
        tinto;

        let prodResults = [];

        for (let i = 0; i < tinto.length; i++) {
            if (tinto[i].name.includes(prodSearch)) {
                prodResults.push(tinto[i])
            }
            
            res.send(prodResults)
        }
    },

    create: function(req, res){
        
        const id = tinto.length+1;
        const name = req.body.name;
        const tipo = req.body.tipo;
        const bodega = req.body.bodega;
        const collapse = 'collapse' + (tinto.length + 1);
        const precio = req.body.precio;
        const alcohol = req.body.alcohol;
        const color = req.body.color;
        const tamaño = req.body.tamaño;
        const imagen = './images/' + req.body.imagen;

        const newProduct = {
        id,
        name,
        tipo,
        bodega,
        collapse,
        precio,
        alcohol,
        color,
        tamaño,
        imagen
        }

        const nuevoArray = agregarProducto(newProduct);
        res.redirect('/detalleProducto')
    },

    edit : function(req, res) {
        let idProd = req.params.idProd;
        tinto;

        let prodToEdit = tinto[idProd - 1];

        res.render("prodEdit", {prodToEdit: prodToEdit});
        res.redirect("/list")
    },

    // update: (req, res) =>{
    //     const idProd = Number(req.params.idProd);

    //     const newArrayProducts = tinto.map(oneProduct => {
    //         if (oneProduct.id === Number(req.params.idProd)){
    //             return {
    //                 ...oneProduct,
    //                 ...req.body,

    //             }
    //         }
    //         return oneProduct
    //     });
    // }
}




module.exports = controller