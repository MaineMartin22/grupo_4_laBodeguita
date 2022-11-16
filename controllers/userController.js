const fs = require('fs');
const path = require('path')
const bcryptjs = require("bcryptjs")
const miUserPathDataBase = path.join(__dirname, '../data/usuarios.json')
const usuario = fs.readFileSync('./data/usuarios.json', 'utf-8');
const User = require('../data/models/User')
const db = require('../database/models');
const User2 = db.User2
const sequelize = db.sequelize;
const { Op } = require("sequelize");

const { validationResult } = require('express-validator')


const userController = {
    // REGISTRO DE NUEVO USUARIO

    registerUser: (req, res) => {
        res.render('./usuarios/register')
    },

    updateUser: (req, res) => {
        let errores = validationResult(req);

        // ERROR SI EXISTE OTRO USUARIO CON EL MISMO EMAIL

        // DE ACA HASTA 

        console.log(User2.findAll());


        let userInDb = User2.findAll({
            where: {
                email: req.body.email
            }
        })
        console.log(userInDb.email);
        if (userInDb.email) {
            return res.render('./usuarios/register', { errores: { email: { msg: 'Este email ya está registrado' } }, old: req.body })
        }

        //ACA, NO ANDA, NI TAMPOCO LLEGAN LOS ERRORES, PORQUE SI NO, NO CREARÍA EL USUARIO, POR LO QUE NO ANDAN TAMPOCO LAS VALIDACIONES


        // SI NO HAY ERRORES, SE PROCEDE A CREAR EL USUARIO
        if (errores.isEmpty()) {
            let user = {
                name: req.body.name,
                surname: req.body.surname,
                email: req.body.email,
                direction: req.body.direction,
                password: bcryptjs.hashSync(req.body.password, 12),
                image: req.file.filename,
                id_categories: 0
            }
            User2.create(user)
                .then((storedUser) => {
                    return res.redirect('./login');
                })
        } else {
            res.render('./usuarios/register', { errores: errores.mapped(), old: req.body },)
        }

    },

    // LISTA DE USUARIOS

    userList: function (req, res) {
        User2.findAll()
            .then(function (usuarios) {
                return res.render('./admin/userList.ejs', { usuarios })
            })
    },

    // BORRAR USUARIOS

    deleteUser: (req, res) => {
        (req, res) => {
            id = req.params.idUser
            User2.destroy({
                where: {
                    id: id
                }
            }).then(function (result) {
                res.redirect('../list')
            })
        }
    },


    login: (req, res) => {
        res.render('./usuarios/login'); //formulario login
    },

    loginProcess: (req, res) => {
        User2.findOne({
            where: {
                email: req.body.email
            },
            raw: true
        })
            .then((user) => {
                //Aquí guardo los errores que vienen desde la ruta, valiendome del validationResult
                let errors = validationResult(req);

                if (req.body.email != '' && req.body.password != '') {
                    bcryptjs.compareSync(req.body.password, user.password)
                } else {
                    return res.render(path.resolve(__dirname, '../views/usuarios/login'), { errors: [{ msg: "Credenciales invalidas" }] });
                }
                //console.log(user);

                if (user.length === 0) {
                    return res.render(path.resolve(__dirname, '../views/usuarios/login'), { errors: [{ msg: "Credenciales invalidas" }] });
                } else {
                    req.session.usuario = user;
                }
                //Aquí verifico si el usuario le dio click en el check box para recordar al usuario 
                if (req.body.recordarme) {
                    res.cookie('email', user.email, { maxAge: 1000 * 60 * 60 * 24 })
                }
                return res.redirect('/');

            })
    },

    profile: (req, res) => { //perfil usuario
        return res.render('./usuarios/userProfile', {
            user: req.session.userLogged,
            admin: req.session.admin
        });
    },

    logout: (req, res) => {
        res.clearCookie('userEmail');
        req.session.destroy();
        return res.redirect('/');
    },


    userEdit: (req, res) => {
        const idUser = req.params.idUser;

        res.render('./admin/userEdit', { 'users': users, 'idUser': idUser })
    },

    userEditUpdate: (req, res) => {
        User2.update({
            name: req.body.name,
            surname: req.body.surname,
            email: req.body.email,
            password: bcryptjs.hashSync(req.body.password, 12),
            imagen: req.file.filename
        }, {
            where: {
                id: req.params.idUser
            }
        });

        res.redirect('../list')
    },

}



module.exports = userController;

//console.log(userController.login({}));