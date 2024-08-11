import UserValidation from "../validation/user.validation.js"
import userService from "../service/user.service.js"
import _ from "lodash";
const UserController={}
UserController.UserSignup=async(request,response)=>{
    try {
        const validation=await UserValidation.userRegister(request.body);
        if (validation.fails()) {
            let err_msg_all = "";
            let msg = "";
            _.each(validation.errors.errors, (err_msg, key) => {
              msg = key;
              err_msg_all = err_msg;
            });
            return response
              .status(200)
              .json({ status: false, message: validation.errors.first(msg) });
          }
          const data=await  userService.Register(request)
          return response.status(200).json(data)
    } catch (error) {
        console.log(error)
        return response.status(500).json({
            message:error.message,
            status:false
        })
    }
}

UserController.verifyEmail=async(request,response)=>{
    try {
        const validation=await UserValidation.userEmailVerify(request.body);
        if (validation.fails()) {
            let err_msg_all = "";
            let msg = "";
            _.each(validation.errors.errors, (err_msg, key) => {
              msg = key;
              err_msg_all = err_msg;
            });
            return response
              .status(200)
              .json({ status: false, message: validation.errors.first(msg) });
          }
          const data=await userService.verifyEmail(request)
          return response.status(200).json(data)
    } catch (error) {
        console.log(error)
        return response.status(500).json(
            {
                message:error.message,
                status:false
            }
        )
        
    }
}
UserController.checkingpassword=async(request,response)=>{
    try {
        const validation=await UserValidation.userVerifyPassword(request.body);
        if (validation.fails()) {
            let err_msg_all = "";
            let msg = "";
            _.each(validation.errors.errors, (err_msg, key) => {
              msg = key;
              err_msg_all = err_msg;
            });
            return response
              .status(200)
              .json({ status: false, message: validation.errors.first(msg) });
          }
          const data=await userService.verifyPassword(request)
          return response.status(200).json(data)
        
    } catch (error) {
        console.log(error)
        return response.status(500).json(
            {
                message:error.message,
                status:false
            }
        )
        
    }
}

export default UserController;