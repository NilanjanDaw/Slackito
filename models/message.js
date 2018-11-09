/**
 * @Author: nilanjan
 * @Date:   2018-11-04T18:18:08+05:30
 * @Email:  nilanjandaw@gmail.com
 * @Filename: message.js
 * @Last modified by:   nilanjan
 * @Last modified time: 2018-11-10T00:52:14+05:30
 * @Copyright: Nilanjan Daw
 */



'use strict';
module.exports = (sequelize, DataTypes) => {
  const message = sequelize.define('message', {
    id: {
      type: DataTypes.UUID,
      allowNull: false,
      primaryKey: true
    },
    workspace_id: DataTypes.STRING,
    channel_name: DataTypes.STRING,
    from: DataTypes.STRING,
    reply: {
      type: DataTypes.UUID,
      allowNull: true
    },
    body: DataTypes.STRING,
    type: DataTypes.STRING
  }, {});
  message.associate = function(models) {
    // associations can be defined here
  };
  return message;
};
