/**
 * @Author: nilanjan
 * @Date:   2018-11-04T17:47:38+05:30
 * @Email:  nilanjandaw@gmail.com
 * @Filename: 20181104121738-add-channel-fkey.js
 * @Last modified by:   nilanjan
 * @Last modified time: 2018-11-04T18:29:05+05:30
 * @Copyright: Nilanjan Daw
 */



'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
    queryInterface.addConstraint('channels', ['workspace_id'], {
      type: 'foreign key',
      name: 'fk_channel',
      references: {
        table: 'workspaces',
        field: 'workspace_id',
      },
      onDelete: 'cascade',
      onUpdate: 'cascade',
    })
  },

  down: (queryInterface, Sequelize) => {
    queryInterface.removeConstraint('channels', 'fk_channel')
  }
};
