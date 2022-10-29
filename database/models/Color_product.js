module.exports = (sequelize, dataTypes) => {
    let alias = 'Color_product';
    let cols = {
        id: {
            type: dataTypes.BIGINT(10).UNSIGNED,
            primaryKey: true,
            autoIncrement: true
        },
        id_color: {
            type: dataTypes.INT(11),
            allowNull: false
        },
        color_product: {
            type: dataTypes.INT(11),
            allowNull: false
        }
    };
    let config = {
        timestamps: true,
        createdAt: 'created_at',
        updatedAt: 'updated_at',
        deletedAt: false
    };

    const Color_product = sequelize.define(alias, cols, config);

    Color_product.associate = function (models) {
       
        Color_product.belongsTo(models.Color, {
            as: "Color", 
            foreignKey: "id_color", //columna en la DB que une las 2 tablas

        });
    }
    return Color_product
};