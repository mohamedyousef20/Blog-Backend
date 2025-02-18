
import express from 'express'
import { createPost, deletePost, getAllPost, getPost, likes, updatePost, verifyOwnerShip } from '../controller/postController.js';
import { verifyToken } from '../utils/verifyToken.js';
import commentRouter from './commentRoute.js'
const router = express.Router();

// nested route
router.use('/:postId/comments', commentRouter)


////////////////////////////////////////

router.get('/', getAllPost);
router.get('/:id', getPost);
router.patch('/:id', updatePost);
router.use(verifyToken)
router.patch('/like/:id', likes);
///////////////////////////////////////

router.use(verifyToken);
router.post('/',createPost);
router.delete('/:id', verifyOwnerShip, deletePost);


export default router;