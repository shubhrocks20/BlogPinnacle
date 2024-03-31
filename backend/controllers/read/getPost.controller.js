import mongoose from 'mongoose';
import { Post, User, Like, Comment } from '../../models/index.js';
import CustomErrorHandler from '../../services/CustomErrorHandler.js';

const getPostController = {
    async getPost(req, res, next) {
        try {
            const posts = await Post.find();

            if (!posts || posts.length === 0) {
                return next(CustomErrorHandler.notFound('No Posts Found!'));
            }

            // Array to hold populated posts
            const populatedPosts = [];

            // Loop through each post to populate likes and comments
            for (const post of posts) {
                // Populate author's username
                const author = await User.findById(post.authorId).select('username');

                // Populate likes for this post
                const likes = await Like.find({ post_id: post._id })
                const comments = await Comment.find({ post_id: post._id });
                // Populate comments for this post
                // const comments = await Comment.find({ post_id: post._id }).populate('user_id', 'username');

                // Add populated post to the array
                populatedPosts.push({
                    _id: post._id,
                    title: post.title,
                    content: post.content,
                    createdAt: post.createdAt,
                    image: post.image,
                    author: author ? author.username : '', // Author's username
                    likes: likes.length,
                    comments: comments.length,
                    
                });
            }

            res.json(populatedPosts);
        } catch (err) {
            return next(err);
        }
    },

    async getLatestBlogs(req, res, next) {
        try {
            const posts = await Post.find()
                                    .sort({ createdAt: -1 })
                                    .limit(3);

            if (!posts || posts.length === 0) {
                return next(CustomErrorHandler.notFound('No Posts Found!'));
            }

            const populatedPosts = [];

            for (const post of posts) {
                const author = await User.findById(post.authorId).select('username');
                const likes = await Like.find({ post_id: post._id }).populate('user_id', 'username');
                const comments = await Comment.find({ post_id: post._id }).populate('user_id', 'username');

                populatedPosts.push({
                    _id: post._id,
                    title: post.title,
                    content: post.content,
                    createdAt: post.createdAt,
                    author: author ? author.username : '',
                    image: post.image,
                    likes: likes.length,
                });
            }

            res.json(populatedPosts);
        } catch (error) {
            return next(error);
        }
    }
}

export default getPostController;
