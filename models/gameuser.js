const User = require('./user.js');
const Game = require('./game.js');

module.exports = function (sequelize, DataTypes){
    var GameUsers = sequelize.define("GameUsers", {
    	GameId: DataTypes.INTEGER,
    	UserId: DataTypes.INTEGER
    },
    {
    	indexes: [{
    		fields: ['GameID', 'UserId']
    	}]
    });

    return GameUsers;
  }
  