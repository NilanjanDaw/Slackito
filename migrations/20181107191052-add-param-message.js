/**
 * @Author: nilanjan
 * @Date:   2018-11-08T00:40:52+05:30
 * @Email:  nilanjandaw@gmail.com
 * @Filename: 20181107191052-add-param-message.js
 * @Last modified by:   nilanjan
 * @Last modified time: 2018-11-10T00:31:28+05:30
 * @Copyright: Nilanjan Daw
 */



'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
    queryInterface.addColumn('messages', 'workspace_id', {
      type: Sequelize.STRING,
      allowNull: false
    })
    queryInterface.addColumn('messages', 'reply', {
      type: Sequelize.UUID,
      allowNull: true
    })
    queryInterface.renameColumn('messages', 'to', 'channel_name')
    queryInterface.addConstraint('messages',  ['reply'], {
      type: 'foreign key',
      name: 'fk_reply',
      references: {
        table: 'messages',
        field: 'id',
      },
      onDelete: 'cascade',
      onUpdate: 'cascade',
    })
  },
  down: (queryInterface, Sequelize) => {
    queryInterface.removeColumn('messages', 'workspace_id')
    queryInterface.removeConstraint('messages', 'fk_reply')
    queryInterface.removeColumn('messages', 'reply')
    queryInterface.renameColumn('messages', 'channel_name', 'to')
  }
};
