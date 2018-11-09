/**
 * @Author: nilanjan
 * @Date:   2018-11-04T18:18:08+05:30
 * @Email:  nilanjandaw@gmail.com
 * @Filename: 20181104124808-create-message.js
 * @Last modified by:   nilanjan
 * @Last modified time: 2018-11-10T00:13:22+05:30
 * @Copyright: Nilanjan Daw
 */



'use strict';
module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.createTable('messages', {
      id: {
        allowNull: false,
        primaryKey: true,
        type: Sequelize.UUID
      },
      to: {
        type: Sequelize.STRING
      },
      from: {
        type: Sequelize.STRING
      },
      body: {
        type: Sequelize.STRING
      },
      type: {
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
    return queryInterface.dropTable('messages');
  }
};
