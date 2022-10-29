module.exports = (sequelize, dataTypes) => {
    let alias = 'Type';
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

    };
    let config = {
        timestamps: true,
        createdAt: 'created_at',
        updatedAt: 'updated_at',
        deletedAt: false
    };

    const Type = sequelize.define(alias, cols, config);

    Type.associate = function (models) {

        Type.hasMany(models.Product, {
            as: "Tipo", 
            foreignKey: "type_products", //columna en la DB que une las 2 tablas

        });

    }
    return Types
};