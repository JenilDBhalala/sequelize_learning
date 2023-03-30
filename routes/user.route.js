const express = require('express');
const router = express.Router();
const User = require('../models/user.model')
// const {Op} = require('sequelize')

//adding user
router.post('/users', async(req, res) => {
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
router.get('/users', async(req, res) => {
    try{
        const users = await User.findAll();
        res.status(200).send(users);
    }
    catch(e){
        res.status(500).send(e.message);
    }
})


//fetching users by id
router.get('/users/:id', async(req, res) => {
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
//finds counts and rows of users whose name contains 'i' letter
router.get('/users/', async(req, res) => {
    try{
        const {count, rows}= await User.findAndCountAll({
            where : {
                name : {
                    [Op.like] : '%i%'
                }
            },
        });
        res.status(200).send({count, rows});
    }
    catch(e){
        res.status(500).send(e.message);
    }
})
*/


/*
//fetching users whose age is greater than 20
router.get('/users', async(req, res) => {
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
router.get('/users/', async(req, res) => {
    try{
        const users = await User.findAll({
            order :[
                // [sequelize.col('age'),'desc'] //fetching all users order by age desc
                // ['age', 'desc'] //fetching all users order by age desc
                ['age', 'desc']
            ],
            limit : 2 , // will fetch top 2 users
            //count, min, max, sum, increment, decrement is utility methods, so it will be used
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
router.get('/users', async(req, res) => {
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
router.put('/users/:id', async(req, res) => {
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
router.delete('/users/:id', async(req, res) => {
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


module.exports = router