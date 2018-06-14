module.exports = function (sequelize, DataTypes) {
    var Users = sequelize.define("Users", {
        id: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            allowNull: false,
            autoIncrement: true
        },
        name: {
            type: DataTypes.STRING,
            is: ["^[a-Z]+$", 'i'],
            allowNull: false 
        },
        password: {
            type: DataTypes.STRING,
            allowNull: false
        }
    });

    return Users;
};
