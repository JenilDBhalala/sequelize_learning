const sequelize = require('../db/config');
const { DataTypes } = require('sequelize')

module.exports =  sequelize.define('user', {
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
},{
    hooks : {
        beforeValidate : (user) => {
            if(user.name)
                user.name = user.name.toLowerCase();
            if(user.email)
                user.email = user.email.toLowerCase();
        }
    }
})