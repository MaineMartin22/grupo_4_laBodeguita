module.exports = (sequelize, dataTypes) => {
    let alias = 'Cellar';
    let cols = {
        id: {
            type: dataTypes.BIGINT(10).UNSIGNED,
            primaryKey: true,
            autoIncrement: true
        },
        name: {
            type: dataTypes.STRING(25),
            allowNull: false
        }
    };
    let config = {
        timestamps: true,
        tableName: "cellars" //Nacho explicó que el nombre de la tabla sería el nombre del modelo en plural
    };

    const Cellar = sequelize.define(alias, cols, config);

    Cellar.associate = function (models) {
        Cellar.hasMany(models.Product, {
            as: "products",
            foreignKey: "id_cellar", //columna en la DB que une las 2 tablas

        });
    }
    return Cellar
};