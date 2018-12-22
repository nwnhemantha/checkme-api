'use strict';
module.exports = (sequelize, DataTypes) => {
  const PostTag = sequelize.define('PostTag', {
    tag:  { 
      type: DataTypes.STRING,
      unique: true
    },
    post_id: DataTypes.INTEGER,
    status: {
      type: DataTypes.INTEGER.UNSIGNED,
      defaultValue: 1
    }
  }, {
    underscored: true, timestamps: true, freezeTableName: true, tableName: 'post_tag'
  });

  PostTag.associate = function(models) {
    PostTag.belongsTo(models.Post)
  };

  PostTag.const = {
    status: {
      active: 1,
      inactive: 0
    }
  }
  return PostTag;
};