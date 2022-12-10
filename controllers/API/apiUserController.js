const path = require('path');
const db = require('../../database/models');
const User2 = require('../../database/models/User2');
const sequelize = db.sequelize;
const { Op } = require("sequelize");

module.exports = {

    list: (req, res) => {
        db.User2.findAll()
        .then(clientes => {

            let userDetail = [];

            clientes.forEach(user => {
                userDetail.push({
                    id: user.id,
                    name: user.name,
                    surname: user.surname,
                    email: user.email,
                    detail: `/api/users/${user.id}`
                })
            })

            let respuesta = {
                meta: {
                    status : 200,
                    count: clientes.length,
                    url: '/api/users'
                },
                users: userDetail
                
            }
                res.json(respuesta);
            })
    },
    
    detail: (req, res) => {
        db.User2.findByPk(req.params.id)
            .then(cliente => {

                let user = [];

                user.push({
                    id: cliente.id,
                    name: cliente.name,
                    surname: cliente.surname,
                    email: cliente.email,
                    img: `/images/avatar/${cliente.image}`
                })

                let respuesta = {
                    meta: {
                        status: 200,
                        url: '/api/clientes/:id'
                    },
                    data: user
                }
                res.json(respuesta);
            });
    }
}