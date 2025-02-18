import { createDocument, deleteDocument, filterUserToLoggedUser, getAllDocument, getDocument, updateDocument } from './handler.js'
import Comment from '../model/CommentModel.js'
import asyncHandler from 'express-async-handler';
import error from '../utils/error.js';


//  #################################
// create filter function for nested route


export const createFilterDocument = (req, res, next) => {
    let filterDocument = {};
    console.log(filterDocument)
    if (req.params.postId) filterDocument = { postId: req.params.postId };
    req.filterDocument = filterDocument;
    console.log(req.filterDocument)
    next();
}


// @desc => filter users to logged user

export const verifyOwnerShip = filterUserToLoggedUser(Comment);






// @desc => Create Comment 
// @route =>  /api/auth/comment
// @method =>  Comment
// @acl =>  public
export const createComment = asyncHandler(async (req, res) => {


    const Document = await Comment.create({
        "postId": req.body.postId,
        "user": req.user.id,
        "username": req.user.name,
        "text": req.body.text,
    });
    res.status(200).json({ message: 'Created Successfully', Document });
});

// @desc => Get All Comments
// @route =>  /api/auth/comment
// @method =>  GET
// @acl =>  public
export const getAllComment = getAllDocument(Comment);

// @desc => Get Comment
// @route =>  /api/auth/comment/:id
// @method =>  GET
// @acl =>  public
export const getComment = getDocument(Comment);

// @desc => Get All Comments
// @route =>  /api/auth/comment
// @method =>  GET
// @acl =>  private : Admin :Logged User
export const deleteComment = deleteDocument(Comment);
// delete all comments
// delete Comments images


// @desc => Update Comments
// @route =>  /api/auth/comment/:id
// @method =>  PATCH
// @acl =>  private : Admin :Logged User
export const updateComment = updateDocument(Comment);



