module.exports = (sequelize, dataTypes) => {
    let alias = 'Product';
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
        id_type: {
            type: dataTypes.STRING(15),
            allowNull: false
        },
        cellar: {
            type: dataTypes.STRING(50),
            allowNull: false
        },
        collapse: {
            type: dataTypes.STRING(20),
            allowNull: false
        },
        alcohol: {
            type: dataTypes.STRING(20),
            allowNull: false
        },
        color: {
            type: dataTypes.LONGBLOB(),
            allowNull: false
        },
        sale: {
            type: dataTypes.LONGBLOB(),
            allowNull: false
        },
        discount: {
            type: dataTypes.LONGBLOB(),
            allowNull: false
        },
        size: {
            type: dataTypes.LONGBLOB(),
            allowNull: false
        },
        image: {
            type: dataTypes.LONGBLOB(),
            allowNull: false
        },
    };
    let config = {
        timestamps: true,
        createdAt: 'created_at',
        updatedAt: 'updated_at',
        deletedAt: false
    }
    const Product = sequelize.define(alias, cols, config); 


    return Product
};