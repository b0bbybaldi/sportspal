module.exports = function (sequelize, DataTypes) {
    var User = sequelize.define("User", {
        id: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            allowNull: false,
            autoIncrement: true
        },
        name: {
            type: DataTypes.STRING,
            is: ["^[a-z]+$", 'i'],
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
    User.associate = (models) => {
        User.belongsToMany(models.Game, {
            through: { model: models.GameUser }
        })
    }
    // User.associate = function(models) {
    //   // We're saying that a User should belong to an Game
    //   // A User can't be created without an Game due to the foreign key constraint
    //   User.belongsTo(models.Game, {
    //     foreignKey: {
    //       allowNull: false
    //     }
    //   });
    // };
    return User;
};
