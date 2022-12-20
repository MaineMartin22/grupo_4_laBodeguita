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
        
        price: {
            type: dataTypes.INTEGER(11),
            allowNull: false
        },
        
        description: {
            type: dataTypes.TEXT,
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
        Product.belongsToMany(models.Size, {
            as: "sizes",
            through: 'sizeProduct',
            foreignKey: "id_product",
            otherKey: 'id_size',
            timestamps: false

        });
        Product.belongsToMany(models.Type, {
            as: "types",
            through: 'typeProduct',
            foreignKey: "id_product",
            otherKey: 'id_type',
            timestamps: false

        });
        
    }

    return Product
};
