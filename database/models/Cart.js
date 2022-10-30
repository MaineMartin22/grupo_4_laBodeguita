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
        cart_user: {
            type: dataTypes.INTEGER(11),
            allowNull: false
        }
    };
    let config = {
        timestamps: true,
        createdAt: 'created_at',
        updatedAt: 'updated_at',
        deletedAt: false
    };

    const Cart = sequelize.define(alias, cols, config)

    Cart.associate = function (models) {

        Cart.hasMany(models.Product, {
            as: "Carrito",
            foreignKey: "cart_products", //columna en la DB que une las 2 tablas

        });
        Cart.belongsTo(models.User2, {
            as: "Carrito_usuario",
            foreignKey: "cart_user", //columna en la DB que une las 2 tablas

        });
    }

    return Cart;
};