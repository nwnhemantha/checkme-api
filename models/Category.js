'use strict';

const config = require('config');

module.exports = function (sequelize, DataTypes) {
    let Category = sequelize.define("Category", {
            name: {
                type: DataTypes.STRING
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
                    active: 1,
                    inactive: 0
                },
                
            },
            underscored: true, timestamps: true, freezeTableName: true, tableName: 'category'
        }
    );

    return Category;
};