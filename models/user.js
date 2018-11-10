/**
 * @Author: nilanjan
 * @Date:   2018-10-04T15:39:00+05:30
 * @Email:  nilanjandaw@gmail.com
 * @Filename: user.js
 * @Last modified by:   nilanjan
 * @Last modified time: 2018-11-10T14:59:34+05:30
 * @Copyright: Nilanjan Daw
 */



'use strict';
module.exports = (sequelize, DataTypes) => {
  const user = sequelize.define('user', {
    id: {
      allowNull: false,
      autoIncrement: true,
      primaryKey: true,
      type: DataTypes.INTEGER
    },
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
      type: DataTypes.STRING
    },
    name: DataTypes.STRING,
    password: DataTypes.STRING,
    is_admin: {
      type: DataTypes.BOOLEAN,
      defaultValue: false
    }
  }, {});
  user.associate = function(models) {
    // models.user.belongsToMany(models.channel, {
    //   through: models.channeluser,
    //   unique: false,
    //   as: 'channels',
    //   foreignkey: 'user_id',
    //   otherKey: 'user_id'
    // })
  };
  return user;
};
