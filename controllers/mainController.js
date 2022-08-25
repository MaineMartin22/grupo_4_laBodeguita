const ejs = require("ejs")


const tinto = [
    { id: 1, oferta: "15%", name: "Magna", tipo : "tinto", bodega: "Malbec", tamaño: "750ml", collapse: "collapse1", precio: 3590.00, alcohol: "14,1 vol", color: "Rojo violeta, profundo y vivo con matices azulados."},
    { id: 2, oferta: "20%", name: "Santa Julia", tipo : "tinto", bodega: "Malbec", tamaño: "750ml", collapse: "collapse2", precio: 3590.00, alcohol: "14,1 vol", color: "Rojo violeta, profundo y vivo con matices azulados."},
    { id: 3, oferta: "30%", name: "Las Perdices", tipo : "tinto", bodega: "Malbec", tamaño: "750ml", collapse: "collapse3", precio: 3590.00, alcohol: "14,1 vol", color: "Rojo violeta, profundo y vivo con matices azulados."},
    { id: 4, oferta: "10%", name: "La Linda", tipo : "tinto", bodega: "Malbec", tamaño: "750ml", collapse: "collapse4", precio: 3590.00, alcohol: "14,1 vol", color: "Rojo violeta, profundo y vivo con matices azulados."},
    { id: 5, oferta: "25%", name: "Tintillo", tipo : "tinto", bodega: "Malbec", tamaño: "750ml", collapse: "collapse5", precio: 3590.00, alcohol: "14,1 vol", color: "Rojo violeta, profundo y vivo con matices azulados."},
    { id: 6, oferta: "30%", name: "El Burro", tipo : "tinto", bodega: "Malbec", tamaño: "750ml", collapse: "collapse6", precio: 3590.00, alcohol: "14,1 vol", color: "Rojo violeta, profundo y vivo con matices azulados."},
    { id: 7, oferta: "15%", name: "El Zorrito", tipo : "tinto", bodega: "Malbec", tamaño: "750ml", collapse: "collapse7", precio: 3590.00, alcohol: "14,1 vol", color: "Rojo violeta, profundo y vivo con matices azulados."},
    { id: 8, oferta: "15%", name: "La Mantis", tipo : "tinto", bodega: "Malbec", tamaño: "750ml", collapse: "collapse8", precio: 3590.00, alcohol: "14,1 vol", color: "Rojo violeta, profundo y vivo con matices azulados."}
];

const blanco = [
    { id: 9, oferta: "15%", name: "MAGNA", tipo : "blanco", bodega: "Malbec", tamaño: "750ml", collapse: "collapse10", precio: 3590.00, alcohol: "14,1 vol", color: "Rojo violeta, profundo y vivo con matices azulados."},
    { id: 10, oferta: "15%", name: "MAGNA", tipo : "blanco", bodega: "Malbec", tamaño: "750ml", collapse: "collapse11", precio: 3590.00, alcohol: "14,1 vol", color: "Rojo violeta, profundo y vivo con matices azulados."},
    { id: 11, oferta: "15%", name: "MAGNA", tipo : "blanco", bodega: "Malbec", tamaño: "750ml", collapse: "collapse12", precio: 3590.00, alcohol: "14,1 vol", color: "Rojo violeta, profundo y vivo con matices azulados."},
    { id: 12, oferta: "15%", name: "MAGNA", tipo : "blanco", bodega: "Malbec", tamaño: "750ml", collapse: "collapse13", precio: 3590.00, alcohol: "14,1 vol", color: "Rojo violeta, profundo y vivo con matices azulados."},
    { id: 13, oferta: "15%", name: "MAGNA", tipo : "blanco", bodega: "Malbec", tamaño: "750ml", collapse: "collapse14", precio: 3590.00, alcohol: "14,1 vol", color: "Rojo violeta, profundo y vivo con matices azulados."},
    { id: 14, oferta: "15%", name: "MAGNA", tipo : "blanco", bodega: "Malbec", tamaño: "750ml", collapse: "collapse15", precio: 3590.00, alcohol: "14,1 vol", color: "Rojo violeta, profundo y vivo con matices azulados."},
    { id: 15, oferta: "15%", name: "MAGNA", tipo : "blanco", bodega: "Malbec", tamaño: "750ml", collapse: "collapse16", precio: 3590.00, alcohol: "14,1 vol", color: "Rojo violeta, profundo y vivo con matices azulados."},
    { id: 16, oferta: "15%", name: "MAGNA", tipo : "blanco", bodega: "Malbec", tamaño: "750ml", collapse: "collapse9", precio: 3590.00, alcohol: "14,1 vol", color: "Rojo violeta, profundo y vivo con matices azulados."},
];

const rosado = [
    { id: 1, oferta: "15%", name: "MAGNA", tipo : "rosado", bodega: "Malbec", tamaño: "750ml", collapse: "collapse17", precio: 3590.00, alcohol: "14,1 vol", color: "Rojo violeta, profundo y vivo con matices azulados."},
    { id: 2, oferta: "15%", name: "MAGNA", tipo : "rosado", bodega: "Malbec", tamaño: "750ml", collapse: "collapse18", precio: 3590.00, alcohol: "14,1 vol", color: "Rojo violeta, profundo y vivo con matices azulados."},
    { id: 3, oferta: "15%", name: "MAGNA", tipo : "rosado", bodega: "Malbec", tamaño: "750ml", collapse: "collapse19", precio: 3590.00, alcohol: "14,1 vol", color: "Rojo violeta, profundo y vivo con matices azulados."},
    { id: 4, oferta: "15%", name: "MAGNA", tipo : "rosado", bodega: "Malbec", tamaño: "750ml", collapse: "collapse20", precio: 3590.00, alcohol: "14,1 vol", color: "Rojo violeta, profundo y vivo con matices azulados."},
    { id: 5, oferta: "15%", name: "MAGNA", tipo : "rosado", bodega: "Malbec", tamaño: "750ml", collapse: "collapse21", precio: 3590.00, alcohol: "14,1 vol", color: "Rojo violeta, profundo y vivo con matices azulados."},
    { id: 6, oferta: "15%", name: "MAGNA", tipo : "rosado", bodega: "Malbec", tamaño: "750ml", collapse: "collapse22", precio: 3590.00, alcohol: "14,1 vol", color: "Rojo violeta, profundo y vivo con matices azulados."},
    { id: 7, oferta: "15%", name: "MAGNA", tipo : "rosado", bodega: "Malbec", tamaño: "750ml", collapse: "collapse23", precio: 3590.00, alcohol: "14,1 vol", color: "Rojo violeta, profundo y vivo con matices azulados."},
    { id: 8, oferta: "15%", name: "MAGNA", tipo : "rosado", bodega: "Malbec", tamaño: "750ml", collapse: "collapse24", precio: 3590.00, alcohol: "14,1 vol", color: "Rojo violeta, profundo y vivo con matices azulados."}
];


const oferta = [
    { id: 1, oferta: 10, porcen:0.1, name: "Magna", tipo : "tinto", bodega: "Malbec", tamaño: "750ml", collapse: "collapse1", precio: 3590.00, alcohol: "14,1 vol", color: "Rojo violeta, profundo y vivo con matices azulados."},
    { id: 2, oferta: 20, porcen:0.2, name: "Santa Julia", tipo : "tinto", bodega: "Malbec", tamaño: "750ml", collapse: "collapse2", precio: 3590.00, alcohol: "14,1 vol", color: "Rojo violeta, profundo y vivo con matices azulados."},
    { id: 3, oferta: 30, porcen:0.3, name: "Las Perdices", tipo : "tinto", bodega: "Malbec", tamaño: "750ml", collapse: "collapse3", precio: 3590.00, alcohol: "14,1 vol", color: "Rojo violeta, profundo y vivo con matices azulados."},
    { id: 4, oferta: 10, porcen:0.1, name: "La Linda", tipo : "tinto", bodega: "Malbec", tamaño: "750ml", collapse: "collapse4", precio: 3590.00, alcohol: "14,1 vol", color: "Rojo violeta, profundo y vivo con matices azulados."},];


const controller = {
    index: (req, res) => {res.render("index",{oferta:oferta})},
    register: (req, res) => {res.render("register")},
    productDetail: (req, res) =>{res.render("prodDetail",{tinto:tinto, blanco:blanco, rosado:rosado,})},
    login: (req, res) => {res.render("login")},
    prodCar:(req, res) => {res.render("prodCar")},
    wine1: (req, res) => {res.render("./productos/vino1")},
    toBuy: (req, res) => {res.render("finalizarCompra")}
}

module.exports = controller