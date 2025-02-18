
import express from 'express'
import {  deleteMyAccount, login, register } from "../controller/authController.js";
// import uploadImage from '../middleware/uploadFile.js';
import { createImage } from '../controller/authController.js';
import { imageProcessing } from '../middleware/uploadFile.js';
import { verifyToken } from '../utils/verifyToken.js';
// import registerValidation from '../validator/authValidation.js'
const router = express.Router()

// register route
router.post('/register', createImage, imageProcessing, register)
router.post('/login', login)
router.delete('/delete-account',verifyToken ,  deleteMyAccount)

export default router