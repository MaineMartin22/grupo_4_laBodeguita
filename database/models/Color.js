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
        createdAt: 'created_at',
        updatedAt: 'updated_at',
        deletedAt: false
    };

    const Color = sequelize.define(alias, cols, config);
    
    Color.associate = function (models) {
       Color.belongsTo(models.Color_product, {
            as: "Color", 
            foreignKey: "id_color", //columna en la DB que une las 2 tablas

        });
        Color.belongsToMany(models.Product,{
            as: "Colores",
            through: "colors_products", //a través de qué tabla pivot se unen los 2 modelos
            foreignKey: "id_color", // cuál es el nombre de la columna en la tabla pivot que hace referencia al modelo actual
            otherKey: "Color_product", // le dice a sequalize cuál es el nombre de la columna en la tabla pivot que hace referencia a la conexión
            timestamps: false
        })
    }
    return Color
};