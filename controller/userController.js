import User from "../model/UserModel.js"
import asyncHandler from 'express-async-handler'
import error from "../utils/error.js"
import { deleteDocument, filterUserToLoggedUser, getAllDocument, getDocument, updateDocument } from "./handler.js"
import { removeFromCloudinary } from "../utils/cloudinary.js";
// import uploadImage from "../middleware/uploadFile.js";



// @desc => Find All User
// @route =>  /api/auth/user
// @method =>  GET
// @acl =>  Private :Admin
// const upload = multer({dest:'images'})
// export const createImage = multer({ dest: 'images' });



// @desc => Get All User
// @route =>  /api/auth/user
// @method =>  GET
// @acl =>  Private :Admin
export const getAllUsers = getAllDocument(User, 'posts');

// @desc => Update User
// @route =>  /api/auth/user:id
// @method =>  PATCH
// @acl =>  Private :Logged User
export const updateUser = asyncHandler(async (req, res, next) => {
    const updateOne = await User.findByIdAndUpdate(
        { _id: req.params.id },

        {
            name: req.body.name,
            email: req.body.email,
            bio: req.body.bio,
            profileImage: req.body.profileImage,
            accountIsVerified: req.body.accountIsVerified
        },

        { new: true }

    );
    if (!updateOne) {
        return next(new createError(`No Documents Found To Update`, 404))
    }
    res.status(200).json({ msg: 'success', data: updateOne });
});;


// @desc => Get User
// @route =>  /api/auth/user:id
// @method =>  GET
// @acl =>  Public
export const getUser = getDocument(User , 'posts');



// @desc => Delete User
// @route =>  /api/auth/user:id
// @method =>  DELETE
// @acl =>  Private : logged user or Admin
export const deleteUser = deleteDocument(User)




// @desc => filter users to logged user

export const verifyOwnerShip = filterUserToLoggedUser(User);

