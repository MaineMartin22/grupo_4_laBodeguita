module.exports = (sequelize, dataTypes) => {
    let alias = 'SizeProduct';
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
        tableName: "sizeProduct" //Nacho explicó que el nombre de la tabla sería el nombre del modelo en plural
    };

    const SizeProduct = sequelize.define(alias, cols, config);

    SizeProduct.associate = function (models) {
        SizeProduct.hasMany(models.Size, {
            as: "size",
            foreignKey: "id",
            timestamps: false

        });
    } 

    return SizeProduct
};