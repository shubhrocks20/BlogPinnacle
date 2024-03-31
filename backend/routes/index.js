import express from 'express';
import { loginController, registerController, postController, getPostController, blogsController, updateController, deleteController } from '../controllers/index.js';
import {upload} from '../middlewares/multer.js'
import likesController from '../controllers/read/likes.controller.js';
import commentsController from '../controllers/read/comments.controller.js';

const router = express.Router();

router.post('/login', loginController.login); 
// ✅
router.post('/register', registerController.register);
// ✅
router.post('/post',upload.fields([{name: 'image', maxCount: 1}]), postController.addPost);
// ✅
router.post('/addLike', postController.addLike);
// ✅
router.post('/addComment', postController.addComment);
// ✅
router.post('/blog/unlike', postController.unlike);
// ✅
router.get('/blogs', getPostController.getPost);
// ✅
router.delete('/blog/uncomment/:commentId', postController.uncomment);
// ✅
router.get('/latest/blogs', getPostController.getLatestBlogs);
// ✅
router.get('/blogs/:userId', blogsController.getBlogs);
// ✅
router.get('/blog/:blogId', blogsController.getSingleBlog);
// ✅
router.patch('/blog/:id',upload.fields([{name: 'image', maxCount: 1}]), updateController.updatePost);

router.delete('/delete/blog/:id', deleteController.deletePost);
// ✅

router.get('/likedPost/:userId', likesController.getAllPostLikedByUser);
// ✅
router.get('/getComments/:postId', commentsController.getAllComments);
// ✅



export default router;
