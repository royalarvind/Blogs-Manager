const express = require('express')
const Blog = require('../models/blog.js')
const Users = require('../models/user.js')
const auth = require('../middleware/auth')

const router = new express.Router()
router.post('/post', auth, async (req,res)=>{
    
    const blog = new Blog({
        ...req.body,
        author:req.user._id
    })
    try{
        await blog.save()
        res.status(201).send(blog)
    }catch(e){
        res.status(400).send(e)
    }
    
})
router.post('/clap/:id', auth, async (req,res)=>{
    const _id = req.params.id
    try{
        var blog = await Blog.findOne({_id})
        if(!blog){
            return res.status(404).send()
        }
        const hasValue = blog.liked_by.includes(req.user._id);
        
        if(hasValue){
            blog.claps = blog.claps-1
            var Index = blog.liked_by.indexOf(req.user._id.toString())
            blog.liked_by.splice(Index, 1)
            await blog.save()
        }
        else{
            blog.claps = blog.claps+1
            blog.liked_by = blog.liked_by.concat(req.user._id)
            await blog.save()
        }
        res.send(blog)
    }catch(e){
        res.status(500).send(e)
    }
    
})
router.get('/all-blogs', auth, async (req,res)=>{
    try{
        const blog = await Blog.find().populate('author','name').exec()
        blog.sort((a, b) => {
            return a.createdAt - b.createdAt;
        });
        if(!blog){
            return res.status(404).send()
        }
        res.send(blog)
    }catch(e){
        console.log(e)
        res.status(500).send(e)
    }
    
})

router.get('/all-blogs/:id', auth, async (req,res)=>{
    const _id = req.params.id
    try{
        const blog = await Blog.findOne({_id, author:req.user._id}).populate('author','name').exec()
        const Allblog = await Blog.find({ tags: { $in: blog.tags } }).populate('author','name').exec()
        
        if(!blog){
            return res.status(404).send()
        }

        if(blog.tags.length!=0){
            res.send(Allblog)
        }
        res.send(blog)
    }catch(e){
        res.status(500).send(e)
    }
})


router.delete('/all-blogs-delete/:id', auth, async (req,res)=>{
    try{
    const blog = await Blog.findOneAndDelete({_id:req.params.id, author:req.user._id})
    if(!blog){
        return res.status(404).send()
    }
    res.send(blog)
    }catch(e){
        res.status(400).send(e)
    }
})

module.exports = router