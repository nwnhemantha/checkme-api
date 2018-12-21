'use strict';
module.exports = (sequelize, DataTypes) => {
  const Tag = sequelize.define('Tag', {
    tag:  { 
      type: DataTypes.STRING,
      unique: true
    },
    status: {
      type: DataTypes.INTEGER.UNSIGNED,
      defaultValue: 1
    }
  }, {
    underscored: true, timestamps: true, freezeTableName: true, tableName: 'tag'
  });

  Tag.associate = function(models) {
    // associations can be defined here
  };

  Tag.const = {
    status: {
      active: 1,
      inactive: 0
    }
  }
  return Tag;
};