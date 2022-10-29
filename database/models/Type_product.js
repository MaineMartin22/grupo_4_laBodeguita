module.exports = (sequelize, dataTypes) => {
    let alias = 'Type_product';
    let cols = {
        id: {
            type: dataTypes.BIGINT(10).UNSIGNED,
            primaryKey: true,
            autoIncrement: true
        },
        id_type: {
            type: dataTypes.INT(11),
            allowNull: false
        },
        type_products: {
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
    
const Type_product = sequelize.define(alias, cols, config);

Type_product.associate = function(models) {
    Type_product.belongsTo(models.type,{
        as: "Tipo", 
        foreignKey: "id_type", //columna en la DB que une las 2 tablas
                   
    });
}
return Type_product
};