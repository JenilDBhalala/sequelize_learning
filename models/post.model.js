const sequelize = require('./index');
const {DataTypes} = require('sequelize')

const Post = sequelize.define('post', {
    caption: {
        type: DataTypes.STRING,
    },
    location: {
        type: DataTypes.STRING,
        set(value) {
            this.setDataValue('location', value.toLowerCase())
        }
    },
    likes: {
        type: DataTypes.INTEGER,
        defaultValue: 0,
        validate: {
            isInt: {
                args: [true],
                msg: 'likes must be integer value!'
            },
            min: {
                args: [0],
                msg: 'likes must be non-negative value!'
            },
        }
    }
});
Post.associate = function (models) {
    // associations can be defined here
    Post.belongsTo(models.User, {
        foreignKey: {
            name: 'userId',
            allowNull: false,
        },
        onDelete: 'CASCADE'
    });

};

module.exports = Post;