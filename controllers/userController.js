const fs = require('fs');

const path = require('path')

const bcryptjs = require("bcryptjs")

const User = require('../data/models/User')

const User3 = require('../data/models/User2')


const db = require('../database/models');

const User2 = db.User2

const { validationResult } = require('express-validator')



// console.log(User2.findAll().then(function(result) {
//     console.log(result);
// }));


const userController = {
    // REGISTRO DE NUEVO USUARIO

    registerUser: (req, res) => {
        res.render('./usuarios/register')
    },

    updateUser: (req, res) =>{
        const resultValidation = validationResult(req);

        // return res.send (resultValidation)

        // return res.send(resultValidation.mapped())

        // return res.send(errors)


        if(resultValidation.errors.length > 0) {
            return  res.render('./usuarios/register', {
                errors: resultValidation.mapped(),  old: req.body
            });
        }
    
           let user = {
                name : req.body.name,
                surname : req.body.surname,
                email : req.body.email,
                direction: req.body.direction,
                password: bcryptjs.hashSync(req.body.password, 12),
                // image : req.file.filename,
                id_categories: 0
            }

            User2.findOne({
                where: {
                    email: req.body.email
                },
                raw: true
            })
            .then((users) => { 
                console.log(users);
                if (users) {
                    return  res.render('./usuarios/register', {
                        old: req.body, errors: [{msg: 'Este email esta creado'}]
                        //FALTA CREAR EL ERROR QUE INFORME QUE EL EMAIL YA ESTA REGISTRADO
                    });
                }
                else{
                    User2
                    .create(user)
                    .then((storedUser) => {
                        return  res.redirect('./login');
                    })
                    .catch(error => console.log(error));
                }
            })
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