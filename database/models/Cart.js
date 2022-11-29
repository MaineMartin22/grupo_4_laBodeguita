
module.exports = (sequelize, dataTypes) => {
    let alias = 'Cart';
    let cols = {
        id: {
            type: dataTypes.BIGINT(10).UNSIGNED,
            primaryKey: true,
            autoIncrement: true
        },
        name: {
            type: dataTypes.STRING(25),
            allowNull: false
        },
       id_user: {                           
            type: dataTypes.STRING(25),
            allowNull: false
        },
    }; 
    let config = {
        timestamps: false,
        tableName: "carts" //Nacho explicó que el nombre de la tabla sería el nombre del modelo en plural
    }

    const Cart = sequelize.define(alias, cols, config)

    Cart.associate = function (models) {
        
        Cart.belongsTo(models.Cart_product, {
            as: "cart_products",
            foreignKey: "id_cart", //columna en la DB que une las 2 tablas
        });
        /* Cart.hasMany(models.User2, {
            as: "users2",
            foreignKey: "id_user", //columna en la DB que une las 2 tablas
        }); */
    }

    return Cart;
};