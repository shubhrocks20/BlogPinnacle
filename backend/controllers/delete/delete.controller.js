import { Post } from "../../models";

const deleteController = {
    async deletePost(req, res, next){
        const postId = req.params.id;
        try{
            const deletedPost = await Post.findOneAndDelete({_id: postId});
            if(!deletedPost){
                res.status(404).json({error: 'Post not Found!'});
            }
            res.json({message: 'Item Delete Successfully', deletedPost});

        } catch(err){
            res.status(500).json({error: 'Internal Server Error'});
        }

    }

} 
export default deleteController;