module.exports = (sequelize, dataTypes) => {
    let alias = 'Color_product';
    let cols = {
        id: {
            type: dataTypes.BIGINT(10).UNSIGNED,
            primaryKey: true,
            autoIncrement: true
        },
        id_product: {
            type: dataTypes.INT(11),
            allowNull: false
        },
        id_user: {
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

return Color_product
};