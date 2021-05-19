'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class produto extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  };
  produto.init({
    codigo: DataTypes.STRING(30),
    nome: DataTypes.STRING(100),
    pr_venda: DataTypes.NUMBER(10,2),
    pr_custo: DataTypes.NUMBER(10,2),
    fabricante: DataTypes.STRING(100),
    imagem: DataTypes.STRING(300)
  }, {
    sequelize,
    modelName: 'produto',
    tableName: 'produtos'
  });
  return produto;
};
