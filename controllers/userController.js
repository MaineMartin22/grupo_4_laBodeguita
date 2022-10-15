const fs = require('fs');
const path = require('path')
const bcryptjs = require("bcryptjs")
const miUserPathDataBase = path.join(__dirname, '../data/usuarios.json')
const usuario = fs.readFileSync('./data/usuarios.json', 'utf-8');
const users = JSON.parse(usuario);
const User = require('../models/User')

const { validationResult } = require('express-validator')


const userController = {
     // REGISTRO DE NUEVO USUARIO

     registerUser: (req, res) =>{
        res.render('register')
    },

    updateUser: (req, res) =>{
        let errores = validationResult(req);

        // ERROR SI EXISTE OTRO USUARIO CON EL MISMO EMAIL

        let userInDb = User.findByField('email', req.body.email)

        if (userInDb){
            return res.render('register', {errores: {email: { msg: 'Este email ya está registrado'}}, old: req.body})
        }

        // SI NO HAY ERRORES, SE PROCEDE A CREAR EL USUARIO

        if (errores.isEmpty()){
            let newUser = {
                id : users.length+1,
                nombre : req.body.nombre,
                apellido : req.body.apellido,
                direccion : req.body.direccion,
                email : req.body.email,
                contrasena: bcryptjs.hashSync(req.body.contrasena, 12),
                categoria: "comprador",
                imagen : req.file.filename
                }

                users.push(newUser);
                fs.writeFileSync(miUserPathDataBase, JSON.stringify(users, null, ' '))
                res.redirect('login');
        }
        else{
            res.render('register', {errores: errores.mapped(), old: req.body},)
        }

    },

      // LISTA DE USUARIOS

      userList: function(req, res){
        users;
        res.render('userList', {'users':users});
    },

    // BORRAR USUARIOS

    deleteUser: (req, res) =>{
        const idUser = req.params.idUser;

        const usuarioEliminar = users.find(users => users.id == idUser)
        const index = users.indexOf(usuarioEliminar)

        users.splice(index, 1);

        fs.writeFileSync(miUserPathDataBase, JSON.stringify(users, null, ' '))

        res.redirect('../list')

    },


    login: (req, res) => {
        res.render('login'); //formulario login
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
                return res.render('login', {
                    errors: {
                        email: {
                            msg: 'Las credenciales son inválidas'
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
            user: req.session.userLogged,
            admin: req.session.admin
        }); 
    },
    logout: (req, res) =>{
        res.clearCookie('userEmail');
        req.session.destroy();
        return res.redirect('/');
    }
}


module.exports = userController;

//console.log(userController.login({}));