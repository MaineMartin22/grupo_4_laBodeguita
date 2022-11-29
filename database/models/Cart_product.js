module.exports = (sequelize, dataTypes) => {
    let alias = 'Cart_product';
    let cols = {
        id: {
            type: dataTypes.BIGINT(10).UNSIGNED,
            primaryKey: true,
            autoIncrement: true
        },
        quantity: {
            type: dataTypes.INTEGER(11),
            allowNull: false
        },
        price_product: {
            type: dataTypes.INTEGER(11),
            allowNull: false
        },
        id_cart: {
            type: dataTypes.STRING(25),
            allowNull: false
        },
        id_product: {
            type: dataTypes.STRING(25),
            allowNull: false
        },
       
    }
    let config = {
        timestamps: false,
        tableName: "cart_products" //Nacho explicó que el nombre de la tabla sería el nombre del modelo en plural
    }
    const Cart_product = sequelize.define(alias, cols, config);

    Cart_product.associate = function (models) {
        Cart_product.belongsTo(models.Cart, {
            as: "carts",
            foreignKey: "id_cart", //columna en la DB que une las 2 tablas
        });

        Cart_product.belongsToMany(models.Product, {
        as: "products",
        through: "cart_product", // ponemos el nombre de la tabla pivot
        foreignKey: "id_cart", // nombre de la columna en la tabla pivot que hace referencia al modelo actual
        otherKey: "id_product", // le dice a sequalize cuál es el nombre de la columna en la tabla pivot que hace referencia a la conexión
        timestamps: false
    });
}

return Cart_product
};
