'use strict';
module.exports = (sequelize, DataTypes) => {
  const Like = sequelize.define('Like', {
    status: {
      type: DataTypes.INTEGER.UNSIGNED,
      defaultValue: 1
    },
    post_id: DataTypes.INTEGER.UNSIGNED,
    user_id: DataTypes.INTEGER.UNSIGNED,
  },
  {
    underscored: true, timestamps: true, freezeTableName: true, tableName: 'like'
  });
  
  Like.associate = function(models) {
    Like.belongsTo(models.Post, { foreignKey: 'post_id' });
    Like.belongsTo(models.User, { foreignKey: 'user_id' });
  };

  Like.const = {
    status: {
      active: 1,
      inactive: 0
    }
  }


  return Like;
};