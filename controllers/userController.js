const { validationResult } = require('express');
const fs = require('fs');
const path = require('path')
const bcryptjs = require("bcryptjs")
const miUserPathDataBase = path.join(__dirname, '../data/usuarios.json')
const usuario = fs.readFileSync('./data/usuarios.json', 'utf-8');
const users = JSON.parse(usuario);

const userController = {
    login: (req, res) => {
        res.render('login'); //formulario login
    },
    loginProcess: (req, res) => {
        let userToLogin = users.findByField('email', req.body.email); //verificamos or email si la persona está registrada

        if (userToLogin) {
            let isOkThePassword = bcryptjs.compareSync(req.body.password, userToLogin.password);
            if (isOkThePassword) {
                delete userToLogin.password; //borra la contraseña por seguridad ya que no queremos tener esta información cuando esté logueado
                req.session.userLogged = userToLogin;
                return res.redirect('users/profile'); //crear perfil de usuario
            }
            return res.render('login', {
                errors: {
                    email: {
                        msg: 'Las credenciales son invalidas'
                    }
                }
            });
        }

        return res.render('login', {
            errors: {
                email: {
                    msg: 'No se encuentra este email en nuestra base de datos'
                }
            }
        });

    },

    profile: (req, res) => { //perfil usuario
        return res.render('userProfile',{
            user: req.session.userLogged
        }); 
    }
}


module.exports = userController;

//console.log(userController.login({}));