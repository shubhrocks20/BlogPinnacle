import mongoose from 'mongoose';
import { User } from '../../models/index.js';
import { Post, Like, Comment } from '../../models/index.js';
import CustomErrorHandler from '../../services/CustomErrorHandler.js';
import uploadOnCloudinary from '../../middlewares/cloudinary.js';

const postController = {
    async addPost(req, res, next) {
        try {
            const { authorId, title, content } = req.body;

            if (!mongoose.Types.ObjectId.isValid(authorId)) {
                return next(CustomErrorHandler.wrongCredentials('ObjectId is not Appropriate'));
            }

            // Check if the author exists
            const isAuthor = await User.findById(authorId);
            if (!isAuthor) {
                return next(CustomErrorHandler.notFound());
            }

            // Upload the image on Cloudinary
            let imageLocalPath;
            if (req.files && req.files.image) {
                imageLocalPath = await uploadOnCloudinary(req.files.image[0].path);
            }

            // Create a new post
            const newPost = new Post({
                authorId,
                title,
                content,
                image: imageLocalPath ? imageLocalPath.url : null // Set image URL if uploaded
            });

            await newPost.save();

            res.json({ message: 'Post created successfully' });
        } catch (error) {
            return next(error);
        }
    },

    async addLike(req, res, next) {
        try {
            const { postId, userId } = req.body;

            // Check if post and user IDs are valid
            if (!mongoose.Types.ObjectId.isValid(postId) || !mongoose.Types.ObjectId.isValid(userId)) {
                return next(CustomErrorHandler.wrongCredentials('ObjectId is not Appropriate'));
            }

            // Check if post exists
            const post = await Post.findById(postId);
            if (!post) {
                return next(CustomErrorHandler.notFound('Post not found'));
            }

            // Check if user exists
            const user = await User.findById(userId);
            if (!user) {
                return next(CustomErrorHandler.notFound('User not found'));
            }

            // Check if the user has already liked the post
            const existingLike = await Like.findOne({ post_id: postId, user_id: userId });
            if (existingLike) {
                return next(CustomErrorHandler.notFound('User already liked this post'));
            }
            // Create a new like
            const newLike = new Like({ post_id: postId, user_id: userId });
            await newLike.save();
            

            res.json({ message: 'Like added successfully' });
        } catch (error) {
            return next(error);
        }
    },

    async addComment(req, res, next) {
        try {
            const { postId, userId, content } = req.body;

            // Check if post and user IDs are valid
            if (!mongoose.Types.ObjectId.isValid(postId) || !mongoose.Types.ObjectId.isValid(userId)) {
                return next(CustomErrorHandler.wrongCredentials('ObjectId is not Appropriate'));
            }

            // Check if post exists
            const post = await Post.findById(postId);
            if (!post) {
                return next(CustomErrorHandler.notFound('Post not found'));
            }

            // Check if user exists
            const user = await User.findById(userId);
            if (!user) {
                return next(CustomErrorHandler.notFound('User not found'));
            }

            // Create a new comment
            const newComment = new Comment({ post_id: postId, user_id: userId, content });
            await newComment.save();

            res.json({ message: 'Comment added successfully' });
        } catch (error) {
            return next(error);
        }
    },
    async unlike(req, res, next) {
        try {
            const { postId, userId } = req.body;

            // Check if post and user IDs are valid
            if (!mongoose.Types.ObjectId.isValid(postId) || !mongoose.Types.ObjectId.isValid(userId)) {
                return next(CustomErrorHandler.wrongCredentials('ObjectId is not Appropriate'));
            }

            // Check if the like exists
            const like = await Like.findOneAndDelete({ post_id: postId, user_id: userId });

            if (!like) {
                return next(CustomErrorHandler.notFound('Like not found'));
            }

            res.json({ message: 'Like removed successfully' });
        } catch (error) {
            return next(error);
        }
    },

    async uncomment(req, res, next) {
        try {
            const {commentId} = req.params;
    
            // Check if post and user IDs are valid
            if (!mongoose.Types.ObjectId.isValid(commentId) || !mongoose.Types.ObjectId.isValid(commentId)) {
                return next(CustomErrorHandler.wrongCredentials('commentId is not Appropriate'));
            }
    
            // Check if the comment exists
            const comment = await Comment.findOneAndDelete({_id: commentId});
    
            if (!comment) {
                return next(CustomErrorHandler.notFound('Comment not found'));
            }
    
            res.json({ message: 'Comment removed successfully' });
        } catch (error) {
            return next(error);
        }
    }
    
};

export default postController;
