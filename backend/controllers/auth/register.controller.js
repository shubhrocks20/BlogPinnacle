import { User } from "../../models/index.js";
import Joi from 'joi'
import bcrypt from 'bcrypt'
import CustomErrorHandler from "../../services/CustomErrorHandler.js";

const registerController = {
    async register(req, res, next){
        const registerSchema = Joi.object({
            username: Joi.string().required(),
            email: Joi.string().email(),
            password: Joi.string().pattern(new RegExp('^[a-zA-Z0-9]{3,30}$')).required(),
        })

        const {error} = registerSchema.validate(req.body);
        if(error){
            return next(error);
        }

        // if user already exist
        const user = await User.findOne({email: req.body.email})
        if(user){
            
            return next(CustomErrorHandler.alreadyExist('User Already Exists'))
        }
        const {username, email, password} = req.body;
        const hashedPassword = await bcrypt.hash(password, 10);

        const newUser = new User({
            username, email, password: hashedPassword
        })

        try{
            const savedUser = await newUser.save()
            res.json({msg: 'User Registered Successfully!', savedUser});
        }
        catch(error){
            return next(error);
        }
    }

    
} 
export default registerController;