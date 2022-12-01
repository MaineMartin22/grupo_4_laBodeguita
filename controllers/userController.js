const fs = require('fs');

const path = require('path')

const bcryptjs = require("bcryptjs")

const bcrypt = require('bcrypt')

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
        res.render('./usuarios/register', {usuario: req.session.usuario})
    },

    updateUser: (req, res) =>{
        const resultValidation = validationResult(req);

        // return res.send (resultValidation)

        // return res.send(resultValidation.mapped())

        // return res.send(errors)


        if(resultValidation.errors.length > 0) {
            return  res.render('./usuarios/register', {
                usuario: req.session.usuario,
                errors: resultValidation.mapped(),  old: req.body
            });
        }

            let salt = bcrypt.genSaltSync(12)
    
           let user = {
                name : req.body.name,
                surname : req.body.surname,
                email : req.body.email,
                direction: req.body.direction,
                password: bcrypt.hashSync(req.body.password, salt),
                image : req.file.filename
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
                        usuario: req.session.usuario,
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
                return res.render('./admin/userList.ejs', { usuarios, usuario: req.session.usuario })
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
        res.render('./usuarios/login', {usuario: req.session.usuario}); //formulario login
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

                if(errors.errors.length){
                    return res.render('./usuarios/login', {errors: errors.mapped(), oldDate:req.body})
                }

                console.log(user);
                if (req.body.email != '' && req.body.password != '') {
                    let passBody = req.body.password
                    // let passwordCorrect = bcrypt.compareSync(passBody, user.password)
                    let passwordCorrect = true;
                    console.log(passwordCorrect);
                    console.log(passBody);
                    console.log(user.password);

                    if (passwordCorrect === false) {
                        console.log('ok2')
                        return res.render(path.resolve(__dirname, '../views/usuarios/login'), { usuario: req.session.usuario, errors: [{ msg: "Credenciales invalidas" }] });
                    }

                    if(passwordCorrect === true) {
                        console.log('contraseña correcta')
                        req.session.usuario = user;
                    }
                    
                //Aquí verifico si el usuario le dio click en el check box para recordar al usuario 
                if (req.body.recordarme) {
                    console.log('ok5')
                    res.cookie('email', user.email, { maxAge: 1000 * 60 * 60 * 24 })
                    console.log('ok6')
                }
                return res.redirect('/');

            }})
    },

    profile: (req, res) => { //perfil usuario
        return res.render('./usuarios/userProfile', {
            usuario: req.session.usuario,
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

        res.render('./admin/userEdit', { usuario: req.session.usuario, 'users': users, 'idUser': idUser })
    },

    userEditUpdate: (req, res) => {
        User2.update({
            name: req.body.name,
            surname: req.body.surname,
            email: req.body.email,
            password: bcrypt.hashSync(req.body.password, 12),
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