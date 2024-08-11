import UserController from "../controller/userRegister.controller.js"
import uploadImageArr from "../controller/imageUpload.controller.js";
import {Router} from "express"
const routes=Router()
routes.post("/signup",UserController.UserSignup);
routes.post("/uploadImage",uploadImageArr)
routes.post("/emailVerify",UserController.verifyEmail)
routes.post("/verifypassword",UserController.checkingpassword)
export default routes;