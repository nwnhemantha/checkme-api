'use strict';
module.exports = (sequelize, DataTypes) => {
  const Share = sequelize.define('Share', {
    status: {
      type: DataTypes.INTEGER.UNSIGNED,
      defaultValue: 1
    },
    user_id: DataTypes.INTEGER.UNSIGNED,
    post_id: DataTypes.INTEGER.UNSIGNED,
  },
  {
    underscored: true, timestamps: true, freezeTableName: true, tableName: 'share'
  });

  Share.associate = function(models) {
    Share.belongsTo(models.Post, { foreignKey: 'post_id' });
    Share.belongsTo(models.User, { foreignKey: 'user_id' });
  };

  Share.const = {
    status: {
      active: 1,
      inactive: 0
    }
  }

  return Share;
};