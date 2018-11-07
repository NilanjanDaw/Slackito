/**
 * @Author: nilanjan
 * @Date:   2018-11-08T00:40:52+05:30
 * @Email:  nilanjandaw@gmail.com
 * @Filename: 20181107191052-add-param-message.js
 * @Last modified by:   nilanjan
 * @Last modified time: 2018-11-08T01:04:00+05:30
 * @Copyright: Nilanjan Daw
 */



'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
    queryInterface.addColumn('messages', 'workspace_id', {
      type: Sequelize.STRING,
      allowNull: false
    })
    queryInterface.renameColumn('messages', 'to', 'channel_name')
  },

  down: (queryInterface, Sequelize) => {
    queryInterface.removeColumn('messages', 'workspace_id')
    queryInterface.renameColumn('messages', 'channel_name', 'to')
  }
};
