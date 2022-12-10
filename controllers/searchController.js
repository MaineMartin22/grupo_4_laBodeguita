const db = require('../database/models');

const Product = db.Product

const searchController = {

    searchBar: function(req, res){

        let busquedaUsuario = req.query.search.toUpperCase();

        db.Product.findAll()
            .then(function(productos){

            let prodResults = []

            for (let i = 0; i < productos.length; i++) {
                if (productos[i].name.includes(busquedaUsuario)) {
                    prodResults.push(productos[i])
                }
                
            }
            res.render('./productos/prodSearch.ejs', {productos: prodResults, usuario: req.session.usuario})
        })
        }
}

module.exports = searchController;