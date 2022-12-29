const path = require('path');
const db = require('../../database/models');
const sequelize = db.sequelize;
const { Op } = require("sequelize");

module.exports = {

    list: (req, res) => {
        db.Size.findAll({
            raw: true,
            nest: true

        })
            .then(sizes => {

                let sizesDetail = [];

                sizes.forEach(size => {
                    sizesDetail.push({
                        id: size.id,
                        name: size.size,
                    })
                })

                let respuesta = {
                    meta: {
                        status: 200,
                        count: sizes.length,
                        url: '/api/sizes'
                    },
                    data: sizesDetail

                }
                res.json(respuesta);
            })
    },

    
}