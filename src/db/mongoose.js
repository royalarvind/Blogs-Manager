const mongoose = require('mongoose')

mongoose.connect('mongodb://127.0.0.1:27017/blog-system',{
    useNewUrlParser:true,
    useUnifiedTopology: true,
    useCreateIndex:true
})





// me.save().then(()=>{
//     console.log(me)
// }).catch((error)=>{
//     console.log(error)
// })



