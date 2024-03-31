import { Post } from "../../models/index.js";
import { Like, Comment } from "../../models/index.js"; // Import Like and Comment models
import CustomErrorHandler from "../../services/CustomErrorHandler.js";

const deleteController = {
    async deletePost(req, res, next) {
        const postId = req.params.id;
        try {
            // Find the post to be deleted
            const deletedPost = await Post.findOneAndDelete({ _id: postId });

            if (!deletedPost) {
                return next(CustomErrorHandler.notFound('Post Not Found!'));
            }

            // Delete all likes associated with the post
            await Like.deleteMany({ post_id: postId });

            // Delete all comments associated with the post
            await Comment.deleteMany({ post_id: postId });

            res.json({ message: 'Item Delete Successfully', deletedPost });
        } catch (err) {
            return next(err);
        }
    }
};

export default deleteController;
