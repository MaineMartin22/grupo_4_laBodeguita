module.exports = (sequelize, dataTypes) => {
    let alias = 'TypeProduct';
    let cols = {
        id: {
            type: dataTypes.BIGINT(10).UNSIGNED,
            primaryKey: true,
            autoIncrement: true
        },
        id_product: {
            type: dataTypes.STRING(25),
            allowNull: false
        },
        id_size: {
            type: dataTypes.STRING(25),
            allowNull: false
        }
    };
    let config = {
        timestamps: false,
        tableName: "typeProduct" //Nacho explicó que el nombre de la tabla sería el nombre del modelo en plural
    };

    const TypeProduct = sequelize.define(alias, cols, config);

    TypeProduct.associate = function (models) {
        TypeProduct.hasMany(models.Type, {
            as: "type",
            foreignKey: "id",
            timestamps: false

        });
    } 

    return TypeProduct
};