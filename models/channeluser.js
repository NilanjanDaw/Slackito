'use strict';
module.exports = (sequelize, DataTypes) => {
  const channeluser = sequelize.define('channeluser', {
    user_id: DataTypes.INTEGER,
    channel_id: DataTypes.INTEGER
  }, {});
  channeluser.associate = function(models) {
    // associations can be defined here
  };
  return channeluser;
};