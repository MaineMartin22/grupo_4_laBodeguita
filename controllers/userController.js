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

     registerUser: (req, res) =>{
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

      userList: function(req, res){
        User2.findAll()
            .then(function(usuarios){
            return res.render('./admin/userList.ejs', {usuarios})
        })
        },

    // BORRAR USUARIOS

    deleteUser: (req, res) =>{
        (req, res) =>{
            id = req.params.idUser
           User2.destroy({
            where: {
            id: id
            }
            }).then(function(result){
                res.redirect('../list')
            })
        }
    },


    login: (req, res) => {
        res.render('./usuarios/login'); //formulario login
    },

    loginProcess: (req, res) => {
        let userToLogin = User.findByField('email', req.body.email);
        let userAdmin = User.findByField('categoria', "admin");

        if(userToLogin) {
            let isOkThePassword = bcryptjs.compareSync(req.body.password, userToLogin.contrasena);
            if (isOkThePassword) {
                delete userToLogin.contrasena;
                req.session.userLogged = userToLogin;

                if(userToLogin.categoria == userAdmin.categoria){
                    req.session.admin = userAdmin;
                }
    
                if(req.body.remember_user) {
                    res.cookie('userEmail', req.body.email, { maxAge: (1000 * 60) * 60 })
                }
    
                return res.redirect('/users/profile');
                } 
                return res.render('./usuarios/login', {
                    errors: {
                        email: {
                            msg: 'Las credenciales son inválidas'
                        }
                    }
                });
            }
    
            return res.render('./usuarios/login', {
                errors: {
                    email: {
                        msg: 'No se encuentra este email en nuestra base de datos'
                    }
                }
            });
        },

    profile: (req, res) => { //perfil usuario
        return res.render('./usuarios/userProfile',{
            user: req.session.userLogged,
            admin: req.session.admin
        });
    },

    logout: (req, res) =>{
        res.clearCookie('userEmail');
        req.session.destroy();
        return res.redirect('/');
    },


    userEdit: (req, res) =>{
        const idUser = req.params.idUser;

        res.render('./admin/userEdit', {'users': users, 'idUser': idUser})
    },

    userEditUpdate:(req, res)=> {
        User2.update({
            name : req.body.name,
            surname : req.body.surname,
            email : req.body.email,
            password: bcryptjs.hashSync(req.body.password, 12),
            imagen : req.file.filename
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