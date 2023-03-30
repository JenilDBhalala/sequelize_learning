const sequelize = require('../db/config');
const { DataTypes } = require('sequelize')
const Post = require('./post.model');

const User = sequelize.define('user', {
    name : {
        type : DataTypes.STRING,
        allowNull : false,
        unique : {
            args : true,
            msg : 'Name already in use, Please provide different username!'
        },
        validate : {
            notNull : {
                msg : 'Please enter name!'
            }
        },
        set(value) {
            this.setDataValue('name', value.toLowerCase())
        }
    },
    email : {
        type : DataTypes.STRING,
        allowNull : false,
        unique : {
            args : true,
            msg : 'Email already in use, Please provide different email!'
        },
        validate : {
            isEmail : {
                msg : 'Please enter valid email!'
            },
        },
        set(value) {
            this.setDataValue('email', value.toLowerCase())
        }
    },
    age : {
        type : DataTypes.INTEGER,
        allowNull : false,
        validate : {
            isInt: {
                args : [true],
                msg : 'age must be integer value!'
            },
            min: {
                args : [16],
                msg : 'age must be atleast 16!'
            }, 
            notNull : {
                msg : 'Please enter age!'
            }
        }
    }
})

module.exports = User;