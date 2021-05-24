'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Post extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      models.Usuario.hasMany(Post, { foreignKey: 'usuarioId'});
      Post.belongsTo(models.Usuario, {foreignKey: 'usuarioId'});
    }
  };
  Post.init({
    usuarioId: DataTypes.NUMBER,
    title: DataTypes.STRING,
    description: DataTypes.STRING,
    genre: DataTypes.STRING,
    filename: DataTypes.STRING,
    filelocation: DataTypes.STRING,
    mediatype: DataTypes.STRING
  }, {
    sequelize,
    modelName: 'Post',
    tableName: 'posts'
  });
  return Post;
};
