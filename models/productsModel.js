const model = {
    agregarProducto: (tinto, nuevoProducto) =>{
        tinto.push(nuevoProducto);
        return tinto;
    },

    editarProducto: (tinto, prodEdit) =>{
        tinto.push(prodEdit);
        return tinto
    }
}

module.exports = model;