module.exports = (sequelize, dataTypes) => {
    let alias = 'Categories_users';
    let cols = {
        id: {
            type: dataTypes.BIGINT(10).UNSIGNED,
            primaryKey: true,
            autoIncrement: true
        },
        users_categories: {
            type: dataTypes.INTEGER(11),
            allowNull: false
        },
        id_categories: {
            type: dataTypes.INTEGER(11),
            allowNull: false
        }
        
    };
    let config = {
        timestamps: true,
        createdAt: 'created_at',
        updatedAt: 'updated_at',
        deletedAt: false
    };
    
const Categories_users = sequelize.define(alias, cols, config);


return Categories_users
};