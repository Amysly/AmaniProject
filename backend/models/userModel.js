const mongoose = require('mongoose')

const userSchema = mongoose.Schema({
    name:{
        type:String,
        required:[true, 'please add a name']
    },

     email:{
        type:String,
        required:[true, 'please add a email'],
        unique: true
    },
     password:{
        type:String,
        required:[true, 'please add a password']
    },

     role:{
        type:String,
          enum: ["student", "lecturer", "admin"],
          default: 'student'
    },
    
},
{
    timestamps :true
})
module.exports = mongoose.model('User', userSchema)