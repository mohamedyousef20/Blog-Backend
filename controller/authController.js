

import User from "../model/UserModel.js"
import asyncHandler from 'express-async-handler'
import error from "../utils/error.js"
import bcrypt from "bcrypt"
import { createToken } from "../utils/verifyToken.js"
import { uploadOneImage } from "../middleware/uploadFile.js"
import bcryptjs from "bcryptjs"




export const createImage = uploadOneImage('profileImage');

// @desc => Register User
// @route =>  /api/auth/register
// @method =>  POST
// @acl =>  public

export const register = asyncHandler(async (req, res) => {

    const user = await User.create(req.body)
    if (!user) {
        return new error('Error ', 400)
    }

    // create token
    // const token = createToken(user._id, user.role);

    // @ =>TODO sending email (to verify account 'change isVerified => to true') //
    // send the code via email

    
    // try {
    //     await sendEmail({
    //         email: user.email,
    //         subject: 'Your Reset Code (Valid For 5 Minute)',
    //         message: `<h3>Hi ${user.name}</h3> \n We received request to reset password your verify code is 
    //         ${randomCode}\n Enter code to complete the verification`
    //     });
    // } catch (err) {



    res.status(201).json({ message: 'Register Is Done Successfully', data: user })

})


// @desc => Login User
// @route =>  /api/auth/login
// @method =>  POST
// @acl =>  public

export const login = asyncHandler(async (req, res, next) => {

    // check user is exist
    const user = await User.findOne({ email: req.body.email });

    if (!user) {
        return next(new error(' Email Is Un Correct', 400))
    }
    // check password is correct
    const passwordIsCorrect = await bcrypt.compare(req.body.password, user.password);
    console.log('passwordIsCorrect')

    if (!passwordIsCorrect) {
        return next(new error('Password  Is Un Correct', 400))
    }


    // create token
    const token = createToken(user._id, user.role);



    res.status(201).json({ message: 'login', data: user, token: token })

});


// @desc => delete my  account
// @route =>  /api/auth/delete-account
// @method =>  DELETE
// @acl =>  logged user

export const deleteMyAccount = asyncHandler(async (req, res, next) => {

    console.log(req.user.id)
        const user = await User.findByIdAndDelete(req.user.id);
    if (!user) {
            return next(new error(`No Document Is Found TO Delete`, 404))
        }


    await user.deleteOne();

    res.status(200).json({ message: 'Deleted Successfully', id: user.id })


});