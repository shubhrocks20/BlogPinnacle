import mongoose from 'mongoose';
import { Post } from '../../models';
const blogsController = {
    async getBlogs(req, res, next){
        const Id = req.params.id;
        if(!mongoose.Types.ObjectId.isValid(Id)){
            return res.status(400).json({ error: 'Invalid Record ObjectId' })
        }
        try{
            const records = await Post.find({record: Id}).select('-createdAt -updatedAt -__v -record');
            res.json(records);

        }
        catch(err){
            console.error(err);
            res.status(500).json({ error: 'Internal Server Error' });
        }
    }
}

export default blogsController;