/**
 * @Author: nilanjan
 * @Date:   2018-11-04T17:45:33+05:30
 * @Email:  nilanjandaw@gmail.com
 * @Filename: channel.js
 * @Last modified by:   nilanjan
 * @Last modified time: 2018-11-10T14:59:39+05:30
 * @Copyright: Nilanjan Daw
 */



'use strict';
module.exports = (sequelize, DataTypes) => {
  const channel = sequelize.define('channel', {
    channel_name: DataTypes.STRING,
    workspace_id: DataTypes.STRING
  }, {});
  channel.associate = function(models) {
    // models.channel.belongsToMany(models.user, {
    //   through: models.channeluser,
    //   unique: false,
    //   foreignkey: 'channel_id',
    //   as: 'users',
    //   otherKey: 'channel_id'
    //   })
  };
  return channel;
};
