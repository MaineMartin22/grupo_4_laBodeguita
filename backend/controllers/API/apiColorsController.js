const path = require('path');
const db = require('../../database/models');
const sequelize = db.sequelize;
const { Op } = require("sequelize");

module.exports = {

    list: (req, res) => {
        db.Color.findAll({
            raw: true
        })
            .then(colors => {

                let colorsDetail = [];

                colors.forEach(color => {
                    colorsDetail.push({
                        id: color.id,
                        name: color.name,
                    })
                })

                let respuesta = {
                    meta: {
                        status: 200,
                        count: colors.length,
                        url: '/api/colors'
                    },
                    data: colorsDetail

                }
                res.json(respuesta);
            })
    }
}