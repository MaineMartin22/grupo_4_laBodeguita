module.exports = (sequelize, dataTypes) => {
    let alias = 'Product';
    let cols = {
        id: {
            type: dataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true
        },
        name: {
            type: dataTypes.STRING(25),
            allowNull: false
        },
        type: {
            type: dataTypes.STRING(25),
            allowNull: false
        },
        
        price: {
            type: dataTypes.INTEGER(11),
            allowNull: false
        },
        alcohol: {
            type: dataTypes.STRING(20),
            allowNull: false
        },
        sale: {
            type: dataTypes.BOOLEAN,
            allowNull: false
        },
        discount: {
            type: dataTypes.STRING(20),
            allowNull: false
        },
        size: {
            type: dataTypes.STRING(8),
            allowNull: false
        },
        image: {
            type: dataTypes.STRING(50),
            // allowNull: false
        },
        id_cellar: {
            type: dataTypes.STRING(25),
            allowNull: false
        },
        id_color: {
            type: dataTypes.STRING(25),
            // allowNull: false
        },
    };
    let config = {
        timestamps: false,
        tableName: "products" //Nacho explicó que el nombre de la tabla sería el nombre del modelo en plural
    }
    const Product = sequelize.define(alias, cols, config);

    Product.associate = function (models) {

        Product.belongsTo(models.Cellar, {
            as: "cellars",
            foreignKey: "id_cellar", //columna en la DB que une las 2 tablas
        });
        Product.belongsTo(models.Color, {
            as: "colors",
            foreignKey: "id_color", // cuál es el nombre de la columna en la tabla pivot que hace referencia al modelo actual
        });
        Product.belongsToMany(models.Cart_product, {
            as: "cart_products",
            through: "cart_product", // ponemos el nombre de la tabla pivot
            foreignKey: "id_product", // nombre de la columna en la tabla pivot que hace referencia al modelo actual
            otherKey: "id_cart", // le dice a sequalize cuál es el nombre de la columna en la tabla pivot que hace referencia a la conexión
            timestamps: false
        });
    }

    return Product
};
