'use strict';
module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable('produtos', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      codigo: {
        type: Sequelize.STRING(30),
        allowNull: false
      },
      nome: {
        type: Sequelize.STRING(100),
        allowNull: false
      },
      pr_venda: {
        type: Sequelize.DECIMAL(10,2),
        allowNull: false
      },
      pr_custo: {
        type: Sequelize.DECIMAL(10,2),
        allowNull: false
      },
      fabricante: {
        type: Sequelize.STRING(100),
        allowNull: false
      },
      imagem: {
        type: Sequelize.STRING(300),
        allowNull: false
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
    await queryInterface.dropTable('produtos');
  }
};
