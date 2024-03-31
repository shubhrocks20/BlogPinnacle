import { User } from "../../models/index.js";
import Joi from "joi";
import CustomErrorHandler from "../../services/CustomErrorHandler.js";
import bcrypt from 'bcrypt'
import jwt from 'jsonwebtoken'
import { JWT_SECRET_KEY } from "../../config/index.js";

const loginController = {
  async login(req, res, next) {
    const loginSchema = Joi.object({
      email: Joi.string().email().required(),
      password: Joi.string().pattern(new RegExp('^[a-zA-Z0-9]{3,30}$'))
    })

    const {error} = loginSchema.validate(req.body);
    if(error){
      return next(error);
    }
    const { email, password } = req.body;
    try {
      const user = await User.findOne({ email: email }).select('-createdAt -updatedAt -__v');
      
      if (!user) {
        return next(CustomErrorHandler.wrongCredentials())
      }

      const isPasswordSame = await bcrypt.compare(password, user.password);
      if (!isPasswordSame) {
        return next(CustomErrorHandler.wrongCredentials());
      }
      const jwtToken = jwt.sign({id: user._id, email: user.email}, JWT_SECRET_KEY);
      //removing sensitive information such as email and password
      const sanitizedUser = { ...user.toObject() };
      delete sanitizedUser.password;


      return res.json({user: sanitizedUser , token: jwtToken});
    } catch (error) {
      return next(error);
    }
  },
};

export default loginController;
