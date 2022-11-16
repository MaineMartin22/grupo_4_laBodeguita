module.exports = (sequelize, dataTypes) => {
    let alias = 'User2';
    let cols = {
        id: {
            type: dataTypes.UUID,
            defaultValue: dataTypes.UUIDV4,
            primaryKey: true,
        },
        name: {
            type: dataTypes.STRING(25),
            allowNull: false
        },
        surname: {
            type: dataTypes.STRING(25),
            allowNull: false
        },
        email: {
            type: dataTypes.STRING(25),
            allowNull: false
        },
        direction: {
            type: dataTypes.STRING(50),
            allowNull: false
        },
        password: {
            type: dataTypes.STRING(25),
            allowNull: false
        },
        image: {
            type: dataTypes.STRING(50),
            //allowNull: false
        },
        id_cart: {
            type: dataTypes.STRING(25),
            //allowNull: false
        },

    };
    let config = {
        timestamps: false,
        tableName: "users2"
    }
    const User2 = sequelize.define(alias, cols, config); 

    User2.associate = function(models){
/* 
        User2.belongsTo(models.Cart, {
            as: "carts", 
            foreignKey: "id_user", //columna en la DB que une las 2 tablas
    
        }); */
        User2.belongsTo(models.Category,{
            as: "categories",
            foreignKey: "id_categories", //columna en la DB que une las 2 tablas
        });
    }

    return User2
};