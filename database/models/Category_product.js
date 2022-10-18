module.exports = (sequelize, dataTypes) => {
    let alias = 'Category_product';
    let cols = {
        id: {
            type: dataTypes.BIGINT(10).UNSIGNED,
            primaryKey: true,
            autoIncrement: true
        },
        id_user: {
            type: dataTypes.INT(11),
            allowNull: false
        },
        id_product: {
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
    
const Category_product = sequelize.define(alias, cols, config);

return Category_product
};