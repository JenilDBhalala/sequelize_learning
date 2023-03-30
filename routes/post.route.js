const express = require('express');
const router = express.Router();
const Post = require('../models/post.model')
// const {Op} = require('sequelize')


//adding post
router.post('/posts', async(req, res) => {
    try{
        const post = await Post.create({
            caption : req.body.caption,
            location : req.body.location,
            likes : req.body.likes,
            userId : req.body.userId
        })
        res.status(201).send(post);
    }
    catch(e){
        res.status(500).send(e.message);
    }
})


//fetching all posts
router.get('/posts', async(req, res) => {
    try{
        const posts = await Post.findAll();
        res.status(200).send(posts);
    }
    catch(e){
        res.status(500).send(e.message);
    }
})


//fetching posts by id
router.get('/posts/:id', async(req, res) => {
    try{
        const posts = await Post.findOne({
            where : {
                id : req.params.id
            }
        });
        res.status(200).send(posts);
    }
    catch(e){
        res.status(500).send(e.message);
    }
})


//update post caption
router.put('/posts/:id', async(req, res) => {
    try{
        const updatedRows = await Post.update({caption : req.body.caption, location : req.body.location, likes : req.body.likes, userId : req.body.userId}, {
            where : {
                id : req.params.id
            }
        })

        if(updatedRows > 0){
            res.status(200).json({"message" : "Post updated successfully"});
        }
        else{
            res.status(404).json({"message" : "Post not found!"});
        }
    }
    catch(e){
        res.status(500).send(e.message);
    }
})


//delete post
router.delete('/posts/:id', async(req, res) => {
    try{
        const deletedRows = await Post.destroy({
           where : {id : req.params.id}
        })
        if(deletedRows > 0){
            res.status(200).json({"message" : "Post deleted successfully"});
        }
        else{
            res.status(404).json({"message" : "Post not found!"});
        }
    }
    catch(e){
        res.status(500).send(e.message);
    }
})


module.exports = router