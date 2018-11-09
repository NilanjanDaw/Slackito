/**
 * @Author: nilanjan
 * @Date:   2018-10-04T15:39:00+05:30
 * @Email:  nilanjandaw@gmail.com
 * @Filename: 20181002151225-create-user.js
 * @Last modified by:   nilanjan
 * @Last modified time: 2018-11-10T00:09:56+05:30
 * @Copyright: Nilanjan Daw
 */



'use strict';
module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.createTable('users', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      username: {
        type: Sequelize.STRING
      },
      email_id: {
        type: Sequelize.STRING
      },
      name: {
        type: Sequelize.STRING
      },
      password: {
        type: Sequelize.STRING
      },
      is_admin: {
        type: Sequelize.BOOLEAN,
        defaultValue: false
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
    return queryInterface.dropTable('users');
  }
};
