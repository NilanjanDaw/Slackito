/**
 * @Author: nilanjan
 * @Date:   2018-11-04T18:18:38+05:30
 * @Email:  nilanjandaw@gmail.com
 * @Filename: 20181104124838-add-message-fkey.js
 * @Last modified by:   nilanjan
 * @Last modified time: 2018-11-04T18:29:58+05:30
 * @Copyright: Nilanjan Daw
 */



'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
    queryInterface.addConstraint('messages', ['to'], {
      type: 'foreign key',
      name: 'fk_message_to',
      references: {
        table: 'channels',
        field: 'id'
      },
      onDelete: 'cascade',
      onUpdate: 'cascade',
    })
  },

  down: (queryInterface, Sequelize) => {
    queryInterface.removeConstraint('messages', 'fk_message_to')
  }
};
