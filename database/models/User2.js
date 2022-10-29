module.exports = (sequelize, dataTypes) => {
    let alias = 'User2';
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
        surname: {
            type: dataTypes.STRING(25),
            allowNull: false
        },
        email: {
            type: dataTypes.TEXT,
            allowNull: false
        },
        password: {
            type: dataTypes.TEXT,
            allowNull: false
        },
        category: {
            type: dataTypes.INT(11),
            allowNull: false
        },
        image: {
            type: dataTypes.STRING,
            allowNull: false
        },
    };
    let config = {
        timestamps: true,
        createdAt: 'created_at',
        updatedAt: 'updated_at',
        deletedAt: false
    }
    const User2 = sequelize.define(alias, cols, config); 

    User2.hasMany(models.Cart, {
        as: "Carrito_usuario", 
        foreignKey: "cart_users", //columna en la DB que une las 2 tablas

    });
    User2.belongsToMany(modelos.Categories,{
        as: "Categoria",
        through: "categories_users", //a través de qué tabla pivot se unen los 2 modelos
        foreignKey: "users_categories", // cuál es el nombre de la columna en la tabla pivot que hace referencia al modelo actual
        otherKey: "id_categories", // le dice a sequalize cuál es el nombre de la columna en la tabla pivot que hace referencia a la conexión
        timestamps: false
    });

    return User2
};