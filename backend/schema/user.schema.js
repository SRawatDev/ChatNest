const mongoose = require('mongoose')
const userSchema =  new mongoose.Schema({
    name : {
        type : String,
    },
    email : {
        type : String,
        unique : true
    },
    password : {
        type : String,
    },
    profile_pic : {
        type : String,
        default : ""
    }
},{
    timestamps : true
})

export default userSchema