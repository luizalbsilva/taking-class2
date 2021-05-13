'use strict';
module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable('usuarios', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      nome: {
        type: Sequelize.STRING(30),
        allowNull: false
      },
      sobrenome: {
        type: Sequelize.STRING(50),
        allowNull: false
      },
      nascimento: {
        type: Sequelize.DATE,
        allowNull: true
      },
      endereco: {
        type: Sequelize.STRING,
        allowNull: true
      },
      telefone: {
        type: Sequelize.STRING,
        allowNull: true
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
  down: async (queryInterface, Sequelize) => {
    await queryInterface.dropTable('usuarios');
  }
};
