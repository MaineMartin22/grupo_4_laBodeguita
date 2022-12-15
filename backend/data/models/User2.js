const fs = require("fs")
const path = require('path')
const bcryptjs = require('bcryptjs')

const User2 = {
    filename: './database/models/User2.js',
    

    findByField: function (field, text) {
        let allUsers = this.findAll();
        // estoy iterando cada uno de los usuarios, y buscando el que tenga el mismo id, con el metodo find
        let userFound = allUsers.find(oneUser => oneUser[field] === text);
        return userFound;
    }
}


module.exports = User2;