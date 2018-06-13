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
        email: {
            type: DataTypes.STRING,
            allowNull: false,
            isEmail: true
        },

        password: {
            type: DataTypes.STRING,
            allowNull: false,
            len: [2, 10]
        }
    });

    return Users;
};
