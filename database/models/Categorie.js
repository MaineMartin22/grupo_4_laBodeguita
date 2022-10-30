module.exports = (sequelize, dataTypes) => {
    let alias = 'Categories';
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

    const Categories = sequelize.define(alias, cols, config);

    Categories.associate = function(models){

        Categories.belongsToMany(models.User2,{
            as: "Categoria",
            through: "Categories_users", //a través de qué tabla pivot se unen los 2 modelos
            foreignKey: "id_categories", // cuál es el nombre de la columna en la tabla pivot que hace referencia al modelo actual
            otherKey: "users_categories", // le dice a sequalize cuál es el nombre de la columna en la tabla pivot que hace referencia a la conexión
            timestamps: false
        });
    }

    return Categories;
};