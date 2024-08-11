import userModel from "../model/user.model.js";
import bcrypt from "bcryptjs";
import moveimage from "../helper/moveimage.js"
import mongoose from "mongoose";
import jwt from "jsonwebtoken"
const userService = {};
userService.Register = async (request) => {
    const checkingEmail = await userModel.findOne({ email: request.body.email });
    if (checkingEmail) {
        return { message: 'User already exists with this email', status: false };
    }
    const salt = await bcrypt.genSalt(10);
    const hashpassword = bcrypt.hashSync(request.body.password, salt); 
    request.body.password = hashpassword;

    const data = new userModel(request.body);
    await data.save();
    await moveimage.moveFileFromFolder(request.body.profile_pic,"images")
    return { message: 'User is registered successfully', status: true };
};

userService.verifyEmail=async(request)=>{
    if(!await userModel.findOne({email:request.body.email}).select("-password"))
    {
        return {message:"Email is not register",status:false}
    }
    return {message:"user email verify sucessfully",status:true}
}
userService.verifyPassword=async(request)=>{
    const userData=await userModel.findOne({_id:new mongoose.Types.ObjectId(request.body.userId)},{email:1,password:1,name:1,tokken:1})
    if(!await bcrypt.compare(request.body.password,userData.password)){
        return {message:"password is incorrect",status:false}
    }
    const data=jwt.sign(userData.toObject(),"sumitrawat")
    userData.tokken=data;
    return {message:"Password is correct", data:userData}
}

export default userService;
