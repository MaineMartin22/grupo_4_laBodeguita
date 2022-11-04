module.exports = (sequelize, dataTypes) => {
    let alias = 'Color';
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
        tableName: "colors" //Nacho explicó que el nombre de la tabla sería el nombre del modelo en plural
    };

    const Color = sequelize.define(alias, cols, config);
    
    Color.associate = function (models) {
       
        Color.hasMany(models.Product,{
            as: "products",
            foreignKey: "id_color", // cuál es el nombre de la columna en la tabla pivot que hace referencia al modelo actual
        })
    }
    return Color
};