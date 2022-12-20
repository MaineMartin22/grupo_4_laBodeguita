const path = require('path');
const db = require('../../database/models');
const sequelize = db.sequelize;
const { Op } = require("sequelize");

module.exports = {

    list: (req, res) => {
        db.Cellar.findAll({
            raw: true
        })
            .then(cellars => {

                let cellarsDetail = [];

                cellars.forEach(cellar => {
                    cellarsDetail.push({
                        id: cellar.id,
                        name: cellar.name,
                    })
                })
                let respuesta = {
                    meta: {
                        status: 200,
                        count: cellars.length,
                        url: '/api/cellar'
                    },
                    data: cellars

                }
                res.json(respuesta);
            })
    }
}