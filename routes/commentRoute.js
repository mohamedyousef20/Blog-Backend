
import express from 'express'
import { createComment, createFilterDocument, deleteComment, getAllComment, getComment, updateComment } from '../controller/commentController.js';
import { verifyRole, verifyToken } from '../utils/verifyToken.js';

const router = express.Router({ mergeParams: true });

router.get('/', createFilterDocument, getAllComment);
router.get('/:id', getComment);
router.use(verifyToken)

router.post('/', createComment);
router.use(verifyToken, verifyRole('user', 'admin'))
router.delete('/:id', deleteComment);
router.patch('/:id', updateComment);








export default router;