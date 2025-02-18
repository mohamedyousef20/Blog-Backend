
import express from 'express'
import { deleteUser, getAllUsers, getUser, updateUser } from '../controller/userController.js';
import {  verifyRole, verifyToken } from '../utils/verifyToken.js';
import { verifyOwnerShip } from '../controller/userController.js';



const router = express.Router();

// router.use(verifyToken, verifyRole('admin'))

router.get('/profile', getAllUsers)

router.get('/profile/:id', getUser)

router.patch('/profile/:id', updateUser)

router.delete('/profile/:id' ,deleteUser)

export default router;