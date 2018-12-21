'use strict';
module.exports = (sequelize, DataTypes) => {
  const Comment = sequelize.define('Comment', {
    comment: DataTypes.TEXT,
    user_id: DataTypes.INTEGER.UNSIGNED,
    post_id: DataTypes.INTEGER.UNSIGNED,
    status: {
      type: DataTypes.INTEGER.UNSIGNED,
      defaultValue: 1
    }
  },
  {
    underscored: true, timestamps: true, freezeTableName: true, tableName: 'comment'
  });

  Comment.associate = function(models) {
    Comment.belongsTo(models.Post, { foreignKey: 'post_id' });
    Comment.belongsTo(models.User, { foreignKey: 'user_id' });
  };

  Comment.const = {
    status: {
      active: 1,
      inactive: 0
    }
  }

  return Comment;
};