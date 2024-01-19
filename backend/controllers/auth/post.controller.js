import mongoose from 'mongoose'
import { Record } from '../../models';
import {Post} from '../../models';
const postController = {
    async posts(req, res, next){
        try{

            const {recordId, title, content} = req.body;
    
            if(!mongoose.Types.ObjectId.isValid(recordId)){
                return res.status(400).json({ error: 'Invalid Record ObjectId' })
            }
            //check if recordId exist in Record
            const isRecord = await Record.findById(recordId);
            if(!isRecord){
                return res.status(400).json({error: 'Record not found'})
            }
            //Create new post
    
            const newPost = new Post({
                record: recordId,
                title, content
            })

            await newPost.save();

            res.status(200).json({message: 'Post created successfully'})
        }
        catch (error) {
            console.error(error);
            return res.status(500).json({ error: 'Internal Server Error' });
          } 
    }
}

export default postController;