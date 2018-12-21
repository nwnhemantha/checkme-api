'use strict';
module.exports = (sequelize, DataTypes) => {
  const User = sequelize.define('User', {
    name: DataTypes.STRING,
    email: DataTypes.STRING,
    phone: DataTypes.STRING,
    token: DataTypes.STRING,
    user_type: {
      type: DataTypes.INTEGER.UNSIGNED,
      defaultValue: 0
    },
    login_type: {
      type: DataTypes.INTEGER.UNSIGNED,
      defaultValue: 0
    },
    status: {
      type: DataTypes.INTEGER.UNSIGNED,
      defaultValue: 1
    }
  }, 
  {
    underscored: true, timestamps: true, freezeTableName: true, tableName: 'user'
  });


  User.associate = function(models) {
    User.hasMany(models.Post);
    User.hasMany(models.Comment);
    User.hasMany(models.Like);
    User.hasMany(models.Share);
  };

  User.const = {
    status: {
      active: 1,
      inactive: 0
    },
    user_type: {
      admin: 1,
      normal: 0
    },
    login_type: {
      anonymous: 0,
      facebook: 1,
      google: 2
    }
  }

  return User;
};