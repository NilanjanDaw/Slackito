/**
 * @Author: nilanjan
 * @Date:   2018-11-10T01:36:14+05:30
 * @Email:  nilanjandaw@gmail.com
 * @Filename: 20181109200614-add-fkey-channeluser.js
 * @Last modified by:   nilanjan
 * @Last modified time: 2018-11-10T01:42:37+05:30
 * @Copyright: Nilanjan Daw
 */



'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
    queryInterface.addConstraint('channelusers', ['user_id'], {
      type: 'foreign key',
      name: 'fk_user_id',
      references: {
        table: 'users',
        field: 'id',
      },
      onDelete: 'cascade',
      onUpdate: 'cascade',
    })
    queryInterface.addConstraint('channelusers', ['channel_id'], {
      type: 'foreign key',
      name: 'fk_channel_id',
      references: {
        table: 'channels',
        field: 'id',
      },
      onDelete: 'cascade',
      onUpdate: 'cascade',
    })
  },

  down: (queryInterface, Sequelize) => {
    queryInterface.removeConstraint('channelusers', 'fk_user_id')
    queryInterface.removeConstraint('channelusers', 'fk_channel_id')
  }
};
