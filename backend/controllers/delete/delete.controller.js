import { Post } from "../../models";
import CustomErrorHandler from "../../services/CustomErrorHandler";

const deleteController = {
    async deletePost(req, res, next){
        const postId = req.params.id;
        try{
            const deletedPost = await Post.findOneAndDelete({_id: postId});
            if(!deletedPost){
                return next(CustomErrorHandler.notFound('Post Not Found!'))
            }
            res.json({message: 'Item Delete Successfully', deletedPost});

        } catch(err){
            return next(err)
        }

    }

} 
export default deleteController;