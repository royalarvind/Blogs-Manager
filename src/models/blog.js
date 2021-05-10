const mongoose = require('mongoose')
const validator = require('validator')
const blog = mongoose.model('blogs',new mongoose.Schema({
    title:{
         type: String,
         required:true,
         trim:true
    },
    tags:[{
        type: String,
        enum : ['x','y','z'],
        default:[]
    }], 
    author: {
        type: mongoose.Schema.Types.ObjectId,
        required: true,
        ref:'users',    
    },
    claps:{
        type: Number,
        default : 0
    },
    liked_by:[{
        type: mongoose.Schema.Types.ObjectId
    }],
},{timestamps: true}))

module.exports=blog;