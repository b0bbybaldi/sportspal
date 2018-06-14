module.exports = function (sequelize, DataTypes) {
    var Games = sequelize.define("Games", {
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
        event_date: {
            type: DataTypes.DATE,
            isNumeric: true,
        },
        latitude: {
            type: DataTypes.INTEGER,
            allowNull: true,
            defaultValue: null,
            validate: { min: -90, max: 90 }
        },
        longitude: {
            type: DataTypes.INTEGER,
            allowNull: true,
            defaultValue: null,
            validate: { min: -180, max: 180 }
        },
        hash: {
            type: DataTypes.String,
            allowNull: true
        }
    }); 

    return Games;
};
