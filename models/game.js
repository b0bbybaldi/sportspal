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
            type: DataTypes.STRING
        },
        venue: {
            type: DataTypes.STRING,
            allowNull: false
        },
        hash: {
            type: DataTypes.STRING,
            allowNull: true
        }
    }); 

    return Games;
};
