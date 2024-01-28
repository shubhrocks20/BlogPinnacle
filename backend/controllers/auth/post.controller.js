import mongoose from 'mongoose'
import { Record } from '../../models';
import {Post} from '../../models';
import CustomErrorHandler from '../../services/CustomErrorHandler';
const postController = {
    async posts(req, res, next){
        try{

            const {recordId, title, content} = req.body;
    
            if(!mongoose.Types.ObjectId.isValid(recordId)){
                return next(CustomErrorHandler.wrongCredentials('ObjectId is not Appropiate'))
            }
            //check if recordId exist in Record
            const isRecord = await Record.findById(recordId);
            if(!isRecord){
                return next(CustomErrorHandler.notFound())
            }
            //Create new post
            const newPost = new Post({
                record: recordId,
                title, content
            })

            await newPost.save();

            res.json({message: 'Post created successfully'})
        }
        catch (error) {
            return next(error);
          } 
    }
}

export default postController;