/**
 * @Author: nilanjan
 * @Date:   2018-10-04T16:08:48+05:30
 * @Email:  nilanjandaw@gmail.com
 * @Filename: 20181004103848-add-workspace-param.js
 * @Last modified by:   nilanjan
 * @Last modified time: 2018-11-10T00:04:16+05:30
 * @Copyright: Nilanjan Daw
 */



'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
    queryInterface.addColumn('users', 'workspace_id', {
      type: Sequelize.STRING,
      allowNull: false
    })
    queryInterface.addConstraint('users', ['workspace_id', 'email_id'] , {
      type: 'unique',
      name: 'unique_users_constraint'
    })
    queryInterface.addConstraint('users', ['workspace_id', 'username'], {
      type: 'unique',
      name: 'unique_username_constraint'
    })
  },

  down: (queryInterface, Sequelize) => {
    queryInterface.removeConstraint('users', 'unique_users_constraint')
    queryInterface.removeConstraint('users', 'unique_username_constraint')
    queryInterface.removeColumn('users', 'workspace_id')
  }
};
