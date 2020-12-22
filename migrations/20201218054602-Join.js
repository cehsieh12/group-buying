'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.createTable('Joins', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      C_id: {
        allowNull: false,
        type: Sequelize.INTEGER
      },
      G_id: {
        allowNull: false,
        type: Sequelize.INTEGER
      },
      J_initiator_id: {
        allowNull: false,
        type: Sequelize.INTEGER
      }
    });
  },

  down: (queryInterface, Sequelize) => {
    return queryInterface.dropTable('Joins');
  }
};
