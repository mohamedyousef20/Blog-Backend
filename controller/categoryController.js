
import asyncHandler from 'express-async-handler'

import {  deleteDocument,  getAllDocument, getDocument, updateDocument } from './handler.js'
import Category from '../model/CategoryModel.js'
import error from '../utils/error.js';



// @desc => Create Category 
// @route =>  /api/auth/category
// @method =>  Category
// @acl =>  public
export const createCategory = asyncHandler(async (req, res) => {


    const document = await Category.create({
        "user": req.user.id,
        "name": req.body.name,

    });
    res.status(200).json({ message: 'Created Successfully', document });
});

// @desc => Get All Category
// @route =>  /api/auth/category
// @method =>  GET
// @acl =>  public
export const getAllCategory = getAllDocument(Category);

// @desc => Get Category
// @route =>  /api/auth/category/:id
// @method =>  GET
// @acl =>  public
export const getCategory = getDocument(Category);

// @desc => Delete Category
// @route =>  /api/auth/category/:id
// @method =>  DELETE
// @acl =>  private : Admin 
export const deleteCategory = deleteDocument(Category)


// @desc => Update Category
// @route =>  /api/auth/category/:id
// @method =>  PATCH
// @acl =>  private : Admin 
export const updateCategory = updateDocument(Category);


