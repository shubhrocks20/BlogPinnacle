import mongoose from 'mongoose';
import { Post } from '../../models';
import CustomErrorHandler from '../../services/CustomErrorHandler';
const getPostController = {
    async getPost(req, res, next){

        try{
            const posts = await Post.find().select(' -updatedAt -_id -__v -record');
            if(!posts){
                return next(CustomErrorHandler.notFound('No Posts Found!'))
            }
            res.json(posts);
        }
        catch(err){
            return next(err);
        }
    },
    async getLatestBlogs(req, res, next){
        try{
            const posts = await Post.find().sort({ createdAt: -1 }).limit(3)
            res.json(posts);
        }
        catch(error){
            return next(error);
        }
    }
}

export default getPostController;