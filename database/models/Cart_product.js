module.exports = (sequelize, dataTypes) => {
    let alias = 'Cart_products';
    let cols = {
        id: {
            type: dataTypes.BIGINT(10).UNSIGNED,
            primaryKey: true,
            autoIncrement: true
        },
        id_cart: {
            type: dataTypes.INT(11),
            allowNull: false
        },
        cart_products: {
            type: dataTypes.INT(11),
            allowNull: false
        },
        quantity: {
            type: dataTypes.LONGBLOB(),
            allowNull: false
        },
        price_product: {
            type: dataTypes.BIGINT,
            allowNull: false
        },
    }
};
let config = {
    timestamps: true,
    createdAt: 'created_at',
    updatedAt: 'updated_at',
    deletedAt: false
};

const Cart_products = sequelize.define(alias, cols, config);

return Cart_products;
