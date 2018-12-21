'use strict';
module.exports = (sequelize, DataTypes) => {
  const Category = sequelize.define('Category', {
    name: {
      type: DataTypes.STRING
    },
    status: {
        type: DataTypes.INTEGER.UNSIGNED,
        defaultValue: 1
    }

  },
  {
    underscored: true, timestamps: true, freezeTableName: true, tableName: 'category'
  });

  Category.associate = function(models) {
    Category.hasMany(models.Post)  
  };

  Category.const = {
    status: {
      active: 1,
      inactive: 0
    }
  }

  return Category;
};