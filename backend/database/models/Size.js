module.exports = (sequelize, dataTypes) => {
    let alias = 'Size';
    let cols = {
        id: {
            type: dataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true
        },
        size: {
            type: dataTypes.STRING,
            allowNull: false
        }
    };
    let config = {
        timestamps: false,
        tableName: "sizes" //Nacho explicó que el nombre de la tabla sería el nombre del modelo en plural
    };

    const Size = sequelize.define(alias, cols, config);

    Size.associate = function (models) {
        Size.belongsToMany(models.Product, {
            as: "products",
            through: 'sizeProduct',
            foreignKey: "id_size",
            otherKey: 'id_product',
            timestamps: false

        });
    } 
    return Size
};