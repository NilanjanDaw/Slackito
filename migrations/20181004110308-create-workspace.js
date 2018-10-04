/**
 * @Author: nilanjan
 * @Date:   2018-10-04T16:33:08+05:30
 * @Email:  nilanjandaw@gmail.com
 * @Filename: 20181004110308-create-workspace.js
 * @Last modified by:   nilanjan
 * @Last modified time: 2018-10-04T16:33:38+05:30
 * @Copyright: Nilanjan Daw
 */



'use strict';
module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.createTable('workspaces', {
      workspace_id: {
        allowNull: false,
        primaryKey: true,
        type: Sequelize.STRING
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE
      }
    });
  },
  down: (queryInterface, Sequelize) => {
    return queryInterface.dropTable('workspaces');
  }
};
