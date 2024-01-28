import mongoose from 'mongoose';
import { Post } from '../../models';
import CustomErrorHandler from '../../services/CustomErrorHandler';
const blogsController = {
    async getBlogs(req, res, next){
        const Id = req.params.id;
        if(!mongoose.Types.ObjectId.isValid(Id)){
            return next(CustomErrorHandler.wrongCredentials('ObjectId is not Appropiate'))
        }
        try{
            const records = await Post.find({record: Id}).select('-createdAt -updatedAt -__v -record');
            if(!records){
                return next(CustomErrorHandler.notFound('No Post Found!'));
            }
            res.json(records);
        }
        catch(err){
           return next(err)
        }
    },
    
}

export default blogsController;