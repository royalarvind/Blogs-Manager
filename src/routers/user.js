const express  = require('express')
const Users = require('../models/user.js')
const auth =require('../middleware/auth.js')

const router = new express.Router()


router.post('/signup', async (req,res)=>{
    
    const user = new Users(req.body)
    try{
        await user.save()
        const token = await user.createAuthtoken()
        res.status(201).send({user,token})
    }catch(e){
        res.status(400).send(e)
    }  
})

router.post('/login',async (req,res)=>{
    try{
        const user = await Users.findByCredentials(req.body.email, req.body.password)
        const token = await user.createAuthtoken()
        res.status(200).send({user,token})
    }catch(e){
        console.log(e.message)
        res.status(400).send(e)
    }
})

router.get('/logout', auth, async (req,res)=>{
    try{
        req.user.tokens = req.user.tokens.filter((token)=>{
            return token.token !== req.token
        })
        await req.user.save()
        res.send()
    }catch(e){
        res.status(500).send(e)
    }
})


router.delete('/me', auth, async (req,res)=>{
    try{
    req.user.remove()
    res.send(req.user)
    }catch(e){
        res.status(400).send(e)
    }
})

module.exports = router