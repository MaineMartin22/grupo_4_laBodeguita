const path = require('path');
const db = require('../../database/models');
const sequelize = db.sequelize;
const { Op } = require("sequelize");

module.exports = {

    list: (req, res) => {
        db.Product.findAll()
            .then(productos => {

                let categoryTinto = [];
                let categoryBlanco = [];
                let categoryRosado = [];


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

                let productDetail = [];

                productos.forEach(products => {
                    productDetail.push({
                        id: products.id,
                        name: products.name,
                        description: products.description,
                        id_cellar: products.id_cellar,
                        detail: `/api/products/${products.id}`
                    })
                })

                let respuesta = {
                    meta: {
                        status: 200,
                        count: productos.length,
                        countByCategory: { 'Tinto': categoryTinto, 'Blanco': categoryBlanco, 'Rosado': categoryRosado },
                        url: '/api/products'
                    },
                    data: productDetail

                }
                res.json(respuesta);
            })
    },

    detail: (req, res) => {
        db.Product.findByPk(req.params.id)
            .then(product => {

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
                    id_cellar: product.id_cellar,
                    id_color: product.id_color,
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
    }
}