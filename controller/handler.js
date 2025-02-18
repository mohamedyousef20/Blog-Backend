
import asyncHandler from 'express-async-handler'
import error from "../utils/error.js"
import Comment from '../model/CommentModel.js';



// @desc => create Documents Handler
// @method =>  POST
export const createDocument = (Model) =>
    asyncHandler(async (req, res) => {


        const Document = await Model.create(req.body);
        res.status(200).json({ message: 'Created Successfully', Document });
    });


// @desc => Get All Documents Handler 
// @method =>  GET

export const getAllDocument = (Model, populateField) => asyncHandler(async (req, res) => {

    console.log(req.filterDocument)
    // check if filter for nested route
    let filterDocument = {};
    if (req.filterDocument) { filterDocument = req.filterDocument };

    // processing to Building Query Request


    // get number of documents  


    let queryRequest = await Model.find(filterDocument);


    const numberOfDocuments = await Model.countDocuments(filterDocument);



    // if (populateField) {
    //     queryRequest = queryRequest.populate(populateField);
    // }
    // processing to Execute Query Request
    const document = await queryRequest

    // find all of documents 


    res.status(200).json({ message: 'Success', data: document, numberOfDocument: numberOfDocuments })
});



// @desc => Get Documents Handler
// @method =>  GET

export const getDocument = (Model, populateField) => asyncHandler(async (req, res, next) => {


    // processing to Building Query Request

    let queryRequest = await Model.findById(req.params.id);



    if (populateField) {
        queryRequest = queryRequest.populate(populateField);
    }
    // processing to Execute Query Request
    const document = await queryRequest

    if (!document) {
        return next(new error(`No Document Is Found TO Get`, 404))
    }

    res.status(200).json({ message: 'Success', data: document })
});


// @desc => Update Document Handler
// @method =>  PATCH

export const updateDocument = (Model) => asyncHandler(async (req, res, next) => {
    const document = await Model.findByIdAndUpdate(
        { _id: req.params.id }
        , req.body,
        { new: true }
    );
    console.log(Model)
    if (!document) {
        return next(new error('No Document Found To Update'))
    }


    res.status(200).json({ message: 'Success', data: document });

    document.save();


});


// @desc => Delete Document Handler
// @method =>  DELETE


export const deleteDocument = (Model) => asyncHandler(async (req, res, next) => {

    const document = await Model.findByIdAndDelete(req.params.id);
    if (!document) {
        return next(new error(`No Document Is Found TO Delete`, 404))
    }


    await document.deleteOne();

    res.status(200).json({ message: 'Deleted Successfully', id: document.id })
});


// ######## check if logged user delete his owner posts and comments or not

export const filterUserToLoggedUser = (Model) => asyncHandler(async (req, res, next) => {
    const document = await Model.findById(req.params.id);
    if (!document) {
        return next(new error('No Document Belong To This ID'))
    }
    if (document.user.id !== req.user.id && req.user.role !== 'admin') {
        return next(new error('You are not authorized to make this action '))
    }
    next();

});