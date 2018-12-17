'use strict';

const config = require('config');

module.exports = function (sequelize, DataTypes) {
    let Post = sequelize.define("Post", {
            user_id: {
                type: DataTypes.INTEGER.UNSIGNED
            },
            category_id: {
                type: DataTypes.INTEGER.UNSIGNED
            },
            title: {
                type: DataTypes.STRING
            },
            details: {
                type: DataTypes.TEXT
            },
            tags: {
                type: DataTypes.JSON
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
            underscored: true, timestamps: true, freezeTableName: true, tableName: 'post'
        }
    );

    return Post;
};