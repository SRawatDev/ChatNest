import mongoose from "mongoose";
const connection=async()=>{
    try {
        await mongoose.connect("mongodb+srv://sumitrawat:sumitrawat123@fooddelivery.4rq8d0f.mongodb.net/chatapplication")
        console.log('mongodb is connected',mongoose.connection.host)
    } catch (error) {
        console.log(error)
        
    }
}

export default connection