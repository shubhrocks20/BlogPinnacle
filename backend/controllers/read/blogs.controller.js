import mongoose from 'mongoose';
import { Post, Like, Comment, User } from '../../models/index.js';
import CustomErrorHandler from '../../services/CustomErrorHandler.js';

const blogsController = {
    async getBlogs(req, res, next) {
        const {userId} = req.params;
        if (!mongoose.Types.ObjectId.isValid(userId)) {
            return next(CustomErrorHandler.wrongCredentials('ObjectId is not Appropriate'));
        }
        try {
            // Find all posts by authorId
            const posts = await Post.find({ authorId: userId }).select('-created_at -__v -author_id');

            if (!posts || posts.length === 0) {
                return next(CustomErrorHandler.notFound('No Posts Found!'));
            }

            // Array to hold populated posts
            const populatedPosts = [];

            // Loop through each post to fetch likes and comments
            for (const post of posts) {
                // Fetch likes for this post
                const likes = await Like.find({ post_id: post._id });

                // Fetch comments for this post
                const comments = await Comment.find({ post_id: post._id });

                // Add populated post to the array
                populatedPosts.push({
                    _id: post._id,
                    title: post.title,
                    content: post.content,
                    image: post.image,
                    likes: likes.length,
                    comments: comments.length,
                    
                });
            }

            res.json(populatedPosts);
        } catch (err) {
            return next(err);
        }
    },
    async getSingleBlog(req, res, next) {
        const { blogId } = req.params;
        try {
            const post = await Post.findById(blogId);
    
            if (!post) {
                return next(CustomErrorHandler.notFound('No Post Found!'));
            }
            
    
            // Populate author's username
            const author = await User.findById(post.authorId).select('username');
    
            // Populate likes for this post
            const likes = await Like.find({ post_id: post._id });
    
            // Populate comments for this post
            const comments = await Comment.find({ post_id: post._id });
    
            const populatedPost = {
                _id: post._id,
                title: post.title,
                content: post.content,
                createdAt: post.createdAt,
                image: post.image,
                author: author ? author.username : '', // Author's username
                likes: likes.length,
                comments: comments.length,
            };
    
            res.json({ post: populatedPost });
        } catch (err) {
            return next(err);
        }
    }
    
};

export default blogsController;
