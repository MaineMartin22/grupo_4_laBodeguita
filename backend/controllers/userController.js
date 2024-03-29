const fs = require('fs');

const path = require('path')

const bcryptjs = require("bcryptjs")

const bcrypt = require('bcrypt')

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

            // let salt = bcrypt.genSaltSync(12)
    
           let user = {
                name : (req.body.name).toUpperCase(),
                surname : (req.body.surname).toUpperCase(),
                email : (req.body.email).toUpperCase(),
                direction: req.body.direction,
                password: bcrypt.hashSync(req.body.password, 12),
                image : req.file.filename
            }

            console.log(user.password);

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
            id = req.params.idUser
            User2.destroy({
                where: {
                    id: id
                }
            }).then(function (result) {
                res.redirect('../list')
            })
    },


    login: (req, res) => {
        res.render('./usuarios/login', {usuario: req.session.usuario}); //formulario login
    },

    loginProcess: (req, res) => {
        //Aquí guardo los errores que vienen desde la ruta, valiendome del validationResult

        let resultValidation = validationResult(req);
        let errors = resultValidation.mapped()
        console.log(errors);

        if(resultValidation.errors.length > 0) {
            return  res.render('./usuarios/login', {
                usuario: req.session.usuario,
                errors: resultValidation.mapped(),  old: req.body,
            });
        }

        User2.findOne({
            where: {
                email: req.body.email
            },
            raw: true
        })
            .then((user) => {

                console.log(user);
                if (req.body.email != '' && req.body.password != '') {
                    let passBody = req.body.password
                    let passwordCorrect = bcrypt.compareSync(passBody, user.password)
                    console.log(user.password);
                    console.log(user);
                    // let passwordCorrect = true;
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
        console.log(idUser);
        db.User2.findByPk(idUser)
            .then(users => {
            res.render('./admin/userEdit',{users, usuario: req.session.usuario} );
        });
        },

    userEditUpdate: (req, res) => {
        const idUser = req.params.idUser

        User2.findOne({
            where: {
                email: req.body.email
            },
            raw: true
        })
            .then(users => {
                console.log(users);
                console.log(idUser);
        User2.update({
            name: req.body.name,
            surname: req.body.surname,
            email: users.email,
            direction: req.body.direction,
            password: users.password,
            imagen: req.file.filename,
            id_categories: req.body.category
        }),{
            where:{
                id: req.params.idUser
            },
            raw: true
        }});
        res.redirect('../list')
    },

}



module.exports = userController;

//console.log(userController.login({}));