'use strict';

const config = require('config');

module.exports = function (sequelize, DataTypes) {
    let User = sequelize.define("User", {
            name: {
                type: DataTypes.STRING
            },
            email: {
                type: DataTypes.STRING
            },
            telephone: {
                type: DataTypes.STRING
            },
            type: {
                type: DataTypes.INTEGER.UNSIGNED,
                defaultValue: 0   
            },
            status: {
                type: DataTypes.INTEGER.UNSIGNED,
                defaultValue: 1
            }
        }, {
            hooks: {
               
            },
            classMethods: {
                associate: function(models) {

                },
                status: {
                    inactive: 0,
                    active: 1
                },
                type: {
                    user: 0,
                    admin: 1
                },
            },
            underscored: true, timestamps: true, freezeTableName: true, tableName: 'user'
        }
    );

    return User;
};