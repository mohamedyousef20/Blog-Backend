import mongoose from "mongoose";


const CommentSchema = mongoose.Schema({
    postId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Post",
        required: true
    },

    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
        required: true
    },
    username: {
        type: String,
        required: true
    },
    text: {
        type: String,
        required: true
    }



}, { timestamps: true });

CommentSchema.pre('save',async function (next) {
   await this.populate({
        path: 'user',
        select: 'name'
    });
    next();
})


export default mongoose.model('Comment', CommentSchema)