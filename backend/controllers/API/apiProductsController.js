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
                let sizes = await db.SizeProduct.findAll({
                    raw: true,
                    include: 'size',
                    nest: true
                })
                let color = await db.Color.findAll({
                    raw: true,
                    include: 'products',
                    nest: true
                })

                sizes = sizes.map(size => size.size.size)

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
                        image: `/images/products/${products.image}`,
                        sizes: sizes,
                        color: products.colors.name,
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

    detail: async (req, res) => {
        db.Product.findByPk(req.params.id)
            .then(async product => {
                let sizes = await db.SizeProduct.findAll({
                    raw: true,
                    where: {
                        id_product: product.id
                    },
                    include: 'size',
                    nest: true
                })

                sizes = sizes.map(size => size.size.size)

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
                    //size: product.size,
                    image: `/images/products/${product.image}`,
                    sizes: sizes,
                    colors: color
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