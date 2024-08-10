import mongoose from "mongoose"
const conversationSchema = new mongoose.Schema({
    sender : {
        type : mongoose.Schema.ObjectId,
        required : true,
        ref : 'User'
    },
    receiver : {
        type : mongoose.Schema.ObjectId,
        required : true,
        ref : 'users'
    },
    messages : [
        {
            type : mongoose.Schema.ObjectId,
            ref : 'messages'
        }
    ]
},{
    timestamps : true
})
export default conversationSchema