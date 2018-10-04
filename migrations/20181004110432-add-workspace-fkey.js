/**
 * @Author: nilanjan
 * @Date:   2018-10-04T16:34:32+05:30
 * @Email:  nilanjandaw@gmail.com
 * @Filename: 20181004110432-add-workspace-fkey.js
 * @Last modified by:   nilanjan
 * @Last modified time: 2018-10-04T16:43:47+05:30
 * @Copyright: Nilanjan Daw
 */



'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
    queryInterface.addConstraint('users', ['workspace_id'], {
      type: 'foreign key',
      name: 'fk_workspace_id',
      references: {
        table: 'workspaces',
        field: 'workspace_id',
      },
      onDelete: 'cascade',
      onUpdate: 'cascade',
    })
  },

  down: (queryInterface, Sequelize) => {
    queryInterface.removeConstraint('users', 'workspace_id')
  }
};
