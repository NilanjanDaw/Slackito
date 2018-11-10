/**
 * @Author: nilanjan
 * @Date:   2018-11-10T01:35:19+05:30
 * @Email:  nilanjandaw@gmail.com
 * @Filename: 20181109200519-create-channeluser.js
 * @Last modified by:   nilanjan
 * @Last modified time: 2018-11-10T13:43:05+05:30
 * @Copyright: Nilanjan Daw
 */



'use strict';
module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.createTable('channelusers', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      user_id: {
        type: Sequelize.INTEGER
      },
      channel_id: {
        type: Sequelize.INTEGER
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
    return queryInterface.dropTable('channelusers');
  }
};
