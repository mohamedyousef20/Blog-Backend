import mongoose from "mongoose";
import Comment from "./CommentModel.js";


const PostSchema = mongoose.Schema({
    title: {
        type: String,
        minlength: 1,
        trim: true
    },

    desc: {
        type: String,
        minlength: 1,
        trim: true,
        required: true
    },
    image: {
        type: Object,
        default: {
            url: '',
            publicId: null
        }
    },

    likes: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User'
    }],

    // Relation Between Posts And User Collections
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },

    // Relation Between Posts And Category Collections
    category: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Category',
        // required: true
    },


}, { timestamps: true });



PostSchema.pre(/^find/, function (next) {
    this.populate({
        path: "user",
        select: "name",

    })
    next();
})

PostSchema.pre('deleteOne', { document: true, query: true }, async function (next) {
    await Comment.deleteMany({ postId: this._id });
    console.log('deleting related comments ')
    next();
})


export default mongoose.model('Post', PostSchema)