/**
 * @Author: nilanjan
 * @Date:   2018-10-04T15:39:00+05:30
 * @Email:  nilanjandaw@gmail.com
 * @Filename: user.js
 * @Last modified by:   nilanjan
 * @Last modified time: 2018-10-04T16:30:54+05:30
 * @Copyright: Nilanjan Daw
 */



'use strict';
module.exports = (sequelize, DataTypes) => {
  const user = sequelize.define('user', {
    username: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: 'unique_username_constraint'
    },
    workspace_id: {
      type: DataTypes.STRING,
      allowNull: false,
      primaryKey: true,
      unique: 'unique_username_constraint'
    },
    email_id: {
      type: DataTypes.STRING,
      primaryKey: true
    },
    name: DataTypes.STRING,
    password: DataTypes.STRING
  }, {});
  user.associate = function(models) {
    // associations can be defined here
  };
  return user;
};
