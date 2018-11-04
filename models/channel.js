'use strict';
module.exports = (sequelize, DataTypes) => {
  const channel = sequelize.define('channel', {
    channel_name: DataTypes.STRING,
    workspace_id: DataTypes.STRING
  }, {});
  channel.associate = function(models) {
    // associations can be defined here
  };
  return channel;
};