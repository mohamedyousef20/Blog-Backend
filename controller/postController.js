
import asyncHandler from 'express-async-handler'

import { createDocument, deleteDocument, filterUserToLoggedUser, getAllDocument, getDocument, updateDocument } from './handler.js'
import Post from '../model/PostModel.js'
import error from '../utils/error.js';


// @desc => filter users to logged user

export const verifyOwnerShip = filterUserToLoggedUser(Post);


// @desc => Create Post 
// @route =>  /api/auth/post
// @method =>  POST
// @acl =>  public
export const createPost = asyncHandler(async (req, res) => {


    const Document = await Post.create({
        "user": req.user.id,
        "title": req.body.title,
        "desc": req.body.desc,
        "image": req.body.image,
    });
    res.status(200).json({ message: 'Created Successfully', Document });
});

// @desc => Get All Posts
// @route =>  /api/auth/post
// @method =>  GET
// @acl =>  public
export const getAllPost = getAllDocument(Post);

// @desc => Get Post
// @route =>  /api/auth/post/:id
// @method =>  GET
// @acl =>  public
export const getPost = getDocument(Post);

// @desc => Delete Posts
// @route =>  /api/auth/post/:id
// @method =>  DELETE
// @acl =>  private : Admin :Logged User
export const deletePost = deleteDocument(Post)


// @desc => Update Posts
// @route =>  /api/auth/post/:id
// @method =>  PATCH
// @acl =>  private : Admin :Logged User
export const updatePost = updateDocument(Post);

// if update images delete the old one
// and upload the new one


// @desc => Put Likes On Posts 
// @route =>  /api/auth/post
// @method =>  Patch
// @acl =>  public 

export const likes = async (req, res, next) => {
    let post = await Post.findById(req.params.id);

    if (!post) {
        return next(new error('No Posts Match This ID'))
    }

    const likeIndex = post.likes.find((el) => el.toString() === req.user.id)

    if (likeIndex) {

        post = await Post.findByIdAndUpdate(
            req.params.id,
            { $pull: { likes: req.user.id } },
            { new: true }
        )
    } else {
        post = await Post.findByIdAndUpdate(
            req.params.id,
            { $push: { likes: req.user.id } },
            { new: true }
        )
    } res.status(201).json({ message: 'success', data: post })

}