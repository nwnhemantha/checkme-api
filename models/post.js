'use strict';
module.exports = (sequelize, DataTypes) => {
  const Post = sequelize.define('Post', {
    title: DataTypes.STRING,
    details: DataTypes.TEXT,
    tags: DataTypes.JSON,
    status: {
      type: DataTypes.INTEGER.UNSIGNED,
      defaultValue: 1
    }
  }, 
  {
    underscored: true, timestamps: true, freezeTableName: true, tableName: 'post'
  });

  Post.associate = function(models) {
    Post.belongsTo(models.Category, { foreignKey: 'category_id' });
    Post.belongsTo(models.User, { foreignKey: 'user_id' });
    Post.hasMany(models.Comment);
    Post.hasMany(models.Like);
    Post.hasMany(models.Share);
  };

  Post.const = {
    status: {
      active: 1,
      inactive: 0
    }
  }

  return Post;
};