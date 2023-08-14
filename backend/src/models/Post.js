const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const postSchema = new Schema({
    author: {
        type: Schema.Types.Object,
        ref: 'User'
    },
    comments: [
        {
            type: Schema.Types.Object,
            ref: 'Comment'
        }
    ],
    title: {
        type: String
    },
    description: {
        type: String
    },
    images: {
        type: Array
    },
    views: {
        type: Number,
        default: 0
    },
    categories: [
        {
            type: String
        }
    ]
}, { timestamps: true });

const Post = mongoose.model('Post', postSchema);
module.exports = Post;