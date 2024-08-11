import Validator from "validatorjs";
const UserValidation = {};
UserValidation.userRegister = (body) => {
  let rules = {
    name: "required|string",
    email: "required|email",
    password: "required|string",
    profile_pic: "required|string",
  };
  let validation = new Validator(body, rules);
  return validation;
};

UserValidation.userEmailVerify = (body) => {
  let rules = {
    email: "required|email",
  };
  let validation = new Validator(body, rules);
  return validation;
};

UserValidation.userVerifyPassword = (body) => {
  let rules = {
    userId:'required',
    password: "required|string",
  };
  let validation = new Validator(body, rules);
  return validation;
};

export default UserValidation;
