'use strict';
module.exports = (sequelize, DataTypes) => {
  const file = sequelize.define('file', {
    message_id: DataTypes.UUID,
    filename: DataTypes.STRING,
    filehash: DataTypes.STRING
  }, {});
  file.associate = function(models) {
    // associations can be defined here
  };
  return file;
};