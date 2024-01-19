import mongoose from 'mongoose';
import { Post } from '../../models';
const getPostController = {
    async getPost(req, res, next){

        try{
            const posts = await Post.find().select(' -updatedAt -_id -__v -record');
            res.status(200).json(posts);
        }
        catch(err){
            console.log('Error While Fetching Posts!', err);
            res.status(500).json({msg: 'Internal Server Error!'});
        }

    }
}

export default getPostController;