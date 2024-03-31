import { Comment } from "../../models/index.js";

const commentsController = {
    async getAllComments(req, res, next){
        const {postId} = req.params;

        try{
            const document = await Comment.find({post_id: postId}).populate('user_id', 'username').select('-__v ');
            res.json(document);
        }
        catch(err){
            return next(err);
        }
    }
}

export default commentsController;