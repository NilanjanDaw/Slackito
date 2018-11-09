/**
 * @Author: nilanjan
 * @Date:   2018-10-04T16:33:08+05:30
 * @Email:  nilanjandaw@gmail.com
 * @Filename: workspace.js
 * @Last modified by:   nilanjan
 * @Last modified time: 2018-11-10T01:32:35+05:30
 * @Copyright: Nilanjan Daw
 */



'use strict';
module.exports = (sequelize, DataTypes) => {
  const workspace = sequelize.define('workspace', {
    workspace_id: {
      type: DataTypes.STRING,
      allowNull:false,
      primaryKey: true
    }
  }, {});
  workspace.associate = function(models) {
    // associations can be defined here
  };
  return workspace;
};
