module.exports = (sequelize, dataTypes) => {
    let alias = 'Category';
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
        timestamps: false,
        tableName: "categories" //Nacho explicó que el nombre de la tabla sería el nombre del modelo en plural
    }

    const Category = sequelize.define(alias, cols, config);

    Category.associate = function(models){

        Category.hasMany(models.User2,{
            as: "users2", //hacemos referencia al nombre de la tabla con la que queremos asociar y que se le dio en la config
            foreignKey: "id_categories", //columna en la DB que une las 2 tablas
        });
    }

    return Category;
};