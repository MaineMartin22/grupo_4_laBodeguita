module.exports = (sequelize, dataTypes) => {
    let alias = 'Product';
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
        type: {
            type: dataTypes.INT(11),
            allowNull: false
        },
        id_cellar: {
            type: dataTypes.INT(11),
            allowNull: false
        },
        price: {
            type: dataTypes.DECIMAL(),
            allowNull: false
        },
        alcohol: {
            type: dataTypes.STRING(20),
            allowNull: false
        },
        color: {
            type: dataTypes.INT(25),
            allowNull: false
        },
        collapse: {
            type: dataTypes.STRING(20),
            allowNull: false
        },
        sale: {
            type: dataTypes.BOOLEAN,
            allowNull: false
        },
        discount: {
            type: dataTypes.DECIMAL(),
            allowNull: false
        },
        size: {
            type: dataTypes.STRING,
            allowNull: false
        },
        image: {
            type: dataTypes.STRING,
            allowNull: false
        },
    };
    let config = {
        timestamps: true,
        createdAt: 'created_at',
        updatedAt: 'updated_at',
        deletedAt: false
    }
    const Product = sequelize.define(alias, cols, config);

    Product.associate = function (models) {
        Product.belongsTo(models.Type, {
            as: "Tipo", 
            foreignKey: "Type_product", //columna en la DB que une las 2 tablas

        });
        Product.belongsTo(models.Cellar, {
            as: "Cellar", 
            foreignKey: "id_cellar", //columna en la DB que une las 2 tablas

        });
        Product.belongsToMany(models.Colors,{
            as: "Colores",
            through: "Colors_products", //a través de qué tabla pivot se unen los 2 modelos
            foreignKey: "product_color", // cuál es el nombre de la columna en la tabla pivot que hace referencia al modelo actual
            otherKey: "id_color", // le dice a sequalize cuál es el nombre de la columna en la tabla pivot que hace referencia a la conexión
            timestamps: false
        });
        Product.belongsTo(models.Cart, {
            as: "Carrito", 
            foreignKey: "cart_products", //columna en la DB que une las 2 tablas

        });
    }

    return Product
};