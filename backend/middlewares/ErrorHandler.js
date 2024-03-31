import Joi from "joi";
import { DEBUG } from "../config/index.js";
import CustomErrorHandler from "../services/CustomErrorHandler.js";

const ErrorHandler = (err, req, res, next)=>{
    let status = 500;
    let data = {
        message: 'Internal Server Error',
        ...(DEBUG === 'true' && {originalError: err.message})
    }

    if(err instanceof Joi.ValidationError){
        status = 401;
        data = {
            message: err.message
        }
    }
    if(err instanceof CustomErrorHandler){
        status = err.status;
        data = {
            message: err.message
        }
    }

    return res.status(status).json(data)
}

export default ErrorHandler;