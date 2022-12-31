module.exports = (sequelize, dataTypes) => {
    let alias = 'Provincia';
    let cols = {
        id: {
            type: dataTypes.BIGINT(10).UNSIGNED,
            primaryKey: true,
            autoIncrement: true
        },
        provincia: {
            type: dataTypes.STRING(120),
            allowNull: false
        }
    };
    let config = {
        timestamps: false,
        tableName: "cellars" //Nacho explicó que el nombre de la tabla sería el nombre del modelo en plural
    };

    const Provincia = sequelize.define(alias, cols, config);

    Provincia.associate = function (models) {
        Provincia.hasMany(models.User2, {
            as: "provincias",
            foreignKey: "provincia", //columna en la DB que une las 2 tablas

        });
    }
    return Provincia
};