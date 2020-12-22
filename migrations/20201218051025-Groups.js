'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.createTable('Groups', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      name: {
        type: Sequelize.STRING,
        allowNull: false
      },
      minNum:{
        type: Sequelize.INTEGER,
        allowNull: false,
        defaultValue: 1
      },
      maxNum:{
        type: Sequelize.INTEGER,
        allowNull: false,
        defaultValue: 1
      },
      category:{
        type: Sequelize.STRING,
        allowNull: false
      },
      number:{
        type: Sequelize.INTEGER,
        allowNull: false,
        defaultValue: 0
      },
      deadline:{
        allowNull: false,
        type: Sequelize.DATE
      },
      addr:{
        type: Sequelize.STRING,
        allowNull: false
      },
      contactInfo:{
        type: Sequelize.STRING,
        allowNull: false
      },
      pid:{
        type: Sequelize.INTEGER,
        allowNull: false,
        reference: {
          model: 'Products',
          key: 'id',
        }
      },
      initiatorId:{
        type: Sequelize.INTEGER,
        allowNull: false,
        reference: {
          model: 'Users',
          key: 'id',
        }
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
    return queryInterface.dropTable('Groups');
  }
};
