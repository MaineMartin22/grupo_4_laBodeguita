module.exports = (sequelize, dataTypes) => {
    let alias = 'Type';
    let cols = {
        id: {
            type: dataTypes.BIGINT(10).UNSIGNED,
            primaryKey: true,
            autoIncrement: true
        },
        name: {
            type: dataTypes.STRING(),
            allowNull: false
        }
    };
    let config = {
        timestamps: false,
        tableName: "types" //Nacho explicó que el nombre de la tabla sería el nombre del modelo en plural
    };

    const Type = sequelize.define(alias, cols, config);

    Type.associate = function (models) {
        Type.belongsToMany(models.Product, {
            as: "types",
            through: 'typeProduct',
            foreignKey: "id_type",
            otherKey: 'id_product',
            timestamps: false

        });
    } 
    return Type
};