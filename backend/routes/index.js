import express from 'express';
import { loginController, registerController, postController, getPostController, blogsController, updateController, deleteController } from '../controllers';


const router = express.Router();


router.post('/login', loginController.login);
router.post('/register', registerController.register);
router.post('/post', postController.posts);
router.get('/posts', getPostController.getPost);
router.get('/blogs/:id', blogsController.getBlogs);
router.patch('/blog/:id', updateController.update);
router.delete('/delete/:id', deleteController.deletePost);
// router.get('/register', (req, res)=>{
//     res.json({msg: 'Hi'})
// })
// router.get('/show', showController.show);



export default router;
