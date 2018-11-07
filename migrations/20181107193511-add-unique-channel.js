/**
 * @Author: nilanjan
 * @Date:   2018-11-08T01:05:11+05:30
 * @Email:  nilanjandaw@gmail.com
 * @Filename: 20181107193511-add-unique-channel.js
 * @Last modified by:   nilanjan
 * @Last modified time: 2018-11-08T01:06:26+05:30
 * @Copyright: Nilanjan Daw
 */



'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
    queryInterface.addConstraint('channels', ['workspace_id', 'channel_name'], {
      type: 'unique',
      name: 'unique_channel_constraint'
    })
  },

  down: (queryInterface, Sequelize) => {
    queryInterface.removeConstraint('users', 'unique_channel_constraint')
  }
};
