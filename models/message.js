'use strict';
module.exports = (sequelize, DataTypes) => {
  const message = sequelize.define('message', {
    to: DataTypes.INTEGER,
    from: DataTypes.STRING,
    body: DataTypes.STRING,
    type: DataTypes.STRING
  }, {});
  message.associate = function(models) {
    // associations can be defined here
  };
  return message;
};