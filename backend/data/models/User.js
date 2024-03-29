const fs = require("fs")
const path = require('path')
const bcryptjs = require('bcryptjs')

const User = {
    fileName: './data/usuarios.json',

    getData: function(){
        return JSON.parse(fs.readFileSync(this.fileName, 'utf-8'))
    },

    generateId: function() {
        let allUsers = this.findAll();
        let lastUser = allUsers.pop();
        if (lastUser){
            return lastUser.id + 1;
        }

        return 1;
    },

    findAll: function () {
        return this.getData();
    },

    findByPk: function (id) {
        let allUsers = this.findAll();
        // estoy iterando cada uno de los usuarios, y buscando el que tenga el mismo id, con el metodo find
        let userFound = allUsers.find(oneUser => oneUser.id === id);
        return userFound;
    },

    findByField: function (field, text) {
        let allUsers = this.findAll();
        // estoy iterando cada uno de los usuarios, y buscando el que tenga el mismo id, con el metodo find
        let userFound = allUsers.find(oneUser => oneUser[field] === text);
        return userFound;
    },

    create: function (userData) {
        let allUsers = this.findAll();
        let newUser = {
            id: this.generateId(),
            ...userData
        }
        allUsers.push(newUser);
        fs.writeFileSync(this.fileName, JSON.stringify(allUsers, null, ' '));
        return true;

    },

    delete: function (id) {
        let allUsers = this.findAll();
        let finalUsers = allUsers.filter(oneUser => oneUser.id !== id);
        fs.writeFileSync(this.fileName, JSON.stringify(finalUsers, null, ' '));
        return true;


    },
    comparePassword: function(password, user){
        if (!user.password)
          return false;
        return bcryptjs.compareSync(password, user.password);
      },

       changeToUpperCase: function(text) {
        return text.toUpperCase();
      }
}

module.exports = User;