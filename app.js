const express = require('express'); 
require('dotenv').config();

const User = require('./models/user.model');
const Post = require('./models/post.model');

User.hasMany(Post);
Post.belongsTo(User,{
    foreignKey : {
        name : 'userId', 
        allowNull : false,
    },
    onDelete : 'CASCADE'
});

//imporatant for understanding workflow : https://github.com/nedssoft/sequelize-with-postgres-tutorial/

//import routes
const userRoutes = require('./routes/user.route')
const postRoutes = require('./routes/post.route')

const app = express();

app.use(express.urlencoded({ extended: false }));
app.use(express.json())

//middleware for user routes
app.use(userRoutes);
app.use(postRoutes);


//server configuration
const port = process.env.PORT || 3001;
const host = process.env.HOST;

app.listen(port, () => {
    console.log(`app is listening on port http://${host}:${port}`);
})



