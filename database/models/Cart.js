
module.exports = (sequelize, dataTypes) => {
    let alias = 'Cart';
    let cols = {
        id: {
            type: dataTypes.BIGINT(10).UNSIGNED,
            primaryKey: true,
            autoIncrement: true
        },
        quantity: {
            type: dataTypes.BIGINT(25),
            allowNull: false
        },
       id_user: {                           
            type: dataTypes.STRING(25),
            allowNull: false
        },
    }; 
    
    let config = {
        timestamps: false,
        tableName: "carts" //Nacho explicó que el nombre de la tabla sería el nombre del modelo en plural
    }

    const Cart = sequelize.define(alias, cols, config);
    return Cart;
};