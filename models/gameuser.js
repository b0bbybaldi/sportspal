const db = require('./models');
module.exports = function (sequelize, DataTypes){
    var GameUser = sequelize.define("GameUser", {});
    GameUser.belongsTo(db.User);
    GameUser.belongsTo(db.Game);
    return GameUser;
  }
  