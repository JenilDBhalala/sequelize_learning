const express = require('express'); 
require('dotenv').config();
const sequelize = require('./db/config');
const {Op} = require('sequelize')
const User = require('./models/user.model')

const app = express();

app.use(express.urlencoded({ extended: false }));
app.use(express.json())


//adding user
app.post('/users', async(req, res) => {
    try{
        const user = await User.create({
            name : req.body.name,
            email : req.body.email,
            age : req.body.age
        })
        res.status(201).send(user);
    }
    catch(e){
        res.status(500).send(e.message);
    }
})


//fetching all users
app.get('/users', async(req, res) => {
    try{
        const users = await User.findAll();
        res.status(200).send(users);
    }
    catch(e){
        res.status(500).send(e.message);
    }
})


//fetching users by id
app.get('/users/:id', async(req, res) => {
    try{
        const users = await User.findOne({
            where : {
                id : req.params.id
            }
        });
        res.status(200).send(users);
    }
    catch(e){
        res.status(500).send(e.message);
    }
})


/*

//fetching users whose age is greater than 20
app.get('/users', async(req, res) => {
    try{
        const users = await User.findAll({
            where : {
                age : {
                    [Op.gt] : 20
                }
            }
        });
        res.status(200).send(users);
    }
    catch(e){
        res.status(500).send(e.message);
    }
})

*/


/*
//fetching users based on certain crieteria
app.get('/users/', async(req, res) => {
    try{
        const users = await User.findAll({
            order :[
                // [sequelize.col('age'),'desc'] //fetching all users order by age desc
                // ['age', 'desc'] //fetching all users order by age desc
                ['age', 'desc']
            ],
            limit : 2 , // will fetch top 2 users
            //count, min, max, sum is utility methods, so it will be used
            //with User.min() for example
        });
        res.status(200).send(users);
    }
    catch(e){
        res.status(500).send(e.message);
    }
})

*/


/*
//fetching all users specific attributes
app.get('/users', async(req, res) => {
    try{
        const users = await User.findAll({
            attributes : ['name', 'age']
        });
        res.status(200).send(users);
    }
    catch(e){
        res.status(500).send(e.message);
    }
})
*/


//update user name
app.put('/users/:id', async(req, res) => {
    try{
        const updatedRows = await User.update({name : req.body.name, email : req.body.email, age : req.body.age}, {
            where : {
                id : req.params.id
            }
        })

        if(updatedRows > 0){
            res.status(200).json({"message" : "User updated successfully"});
        }
        else{
            res.status(404).json({"message" : "User not found!"});
        }
    }
    catch(e){
        res.status(500).send(e.message);
    }
})


//delete user
app.delete('/users/:id', async(req, res) => {
    try{
        const deletedRows = await User.destroy({
           where : {id : req.params.id}
        })
        if(deletedRows > 0){
            res.status(200).json({"message" : "User deleted successfully"});
        }
        else{
            res.status(404).json({"message" : "User not found!"});
        }
    }
    catch(e){
        res.status(500).send(e.message);
    }
})



//server configuration
const port = process.env.PORT || 3001;
const host = process.env.HOST;

app.listen(port, () => {
    console.log(`app is listening on port http://${host}:${port}`);
})



