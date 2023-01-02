const path = require('path');
const db = require('../../database/models');
const sequelize = db.sequelize;
const { Op } = require("sequelize");

module.exports = {

    list: async (req, res) => {
        db.Product.findAll({
            raw: true,
            include: ['cellars', 'sizes', 'colors'],
            //Trae asociacion en objeto
            nest: true
        })
            .then(async productos => {

                let categoryTinto = 0;
                let categoryBlanco = 0;
                let categoryRosado = 0;


                productos.forEach(products => {
                    if (products.type == 'Tinto') {
                     categoryTinto++
                    }
                    if (products.type == 'Blanco') {
                        categoryBlanco++
                    }
                    if (products.type == 'Rosado') {
                        categoryRosado++
                    }
                })

                let countByCategory = [
                    {
                        Type: 'Tinto',
                        count: categoryTinto
                    },
                    {
                        Type: 'Blanco',
                        count: categoryBlanco
                    },
                    {
                        Type: 'Rosado',
                        count: categoryRosado
                    }
                ]

                let productDetail = [];

                productos.forEach(products => {
                    console.log(products);
                    productDetail.push({
                        id: products.id,
                        name: products.name,
                        description: products.description,
                        cellar: products.cellars.name,
                        type: products.type,
                        price: products.price,
                        description: products.description,
                        alcohol: products.alcohol,
                        sale: products.sale,
                        discount: products.discount,
                        size: products.sizes.size,
                        sizes: products.sizes,
                        image: `/images/products/${products.image}`,
                        color: products.colors.name,
                        detail: `/api/products/${products.id}`
                    })
                })

                let respuesta = {
                    meta: {
                        status: 200,
                        count: productos.length,
                        countByCategory: countByCategory,
                        url: '/api/products'
                    },
                    data: productDetail

                }
                res.json(respuesta);
            })
    },

    detail: async (req, res) => {
        db.Product.findByPk(req.params.id, 
            {
                raw: true,
                include: ['cellars', 'sizes', 'colors'],
                //Trae asociacion en objeto
                nest: true
        })
            .then(async product => {
                let productDetail = [];

                productDetail.push({
                    id: product.id,
                    name: product.name,
                    type: product.type,
                    price: product.price,
                    description: product.description,
                    alcohol: product.alcohol,
                    sale: product.sale,
                    discount: product.discount,
                    size: product.size,
                    image: `/images/products/${product.image}`,
                    sizes: product.sizes,
                    colors: product.colors.name
                })

                let respuesta = {
                    meta: {
                        status: 200,
                        url: `/api/products/${product.id}`
                    },
                    data: productDetail
                }
                res.json(respuesta);
            });
    },

   /*  search: function(req, res){

        let busquedaUsuario = input.current.value
        db.Product.findAll()
            .then(function(productos){

            let prodResults = []

            for (let i = 0; i < productos.length; i++) {
                if (productos[i].name.includes(busquedaUsuario)) {
                    prodResults.push(productos[i])
                }
                
            }
        })
        } */
}