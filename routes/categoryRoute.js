import express from 'express'
import {
    createCategory,
    deleteCategory,
    getAllCategory,
    getCategory,
    updateCategory
} from '../controller/categoryController.js';
import { verifyToken } from '../utils/verifyToken.js';

const router = express.Router();

router.get('/', getAllCategory)

router.get('/:id', getCategory)

router.patch('/:id', updateCategory)

router.delete('/:id', deleteCategory)
// router.use(verifyToken)

router.post('/', createCategory)


export default router;