const express = require('express');
const router = express.Router();
const Comment = require('../models/Comment');
const Post = require('../models/Post');
const catchAsync = require('../utils/catchAsync');
const { authorize, isCommentAuthor } = require('../middleware/auth');
const mongoose = require('mongoose');


router.post('/', authorize, catchAsync(async (req, res, next) => {
    const { commentBody, userId, postId } = req.body;

    //get current post and push new comment to the post.
    const post = await Post.findById(postId);
    const comment = new Comment({ body: commentBody, author: userId });

    post.comments.push(comment._id);
    await comment.save();
    await post.save();


    const populatedPost = await post.populate({
        path: 'comments',
        populate: {
            path: 'author',
            select: '-password'
        }
    });
    //sort comment by createdAt in decreasing order
    post.comments.sort((a, b) => b.createdAt - a.createdAt);

    res.status(200).json({ newComments: populatedPost.comments });

}));

router.delete('/:postId/:commentId', authorize, isCommentAuthor, catchAsync(async (req, res, next) => {
    const postId = req.params.postId;
    const commentId = new mongoose.Types.ObjectId(req.params.commentId)

    //remove comment from post.comments
    const updatedPost = await Post.findOneAndUpdate(
        { _id: postId },
        { $pull: { comments: { $in: [commentId] } } },
        { new: true })
        .populate({
            path: 'comments',
            populate: {
                path: 'author',
                select: '-password'
            }
        });

    //remove comment itself
    await Comment.findByIdAndDelete(commentId);

    //sort comment by createdAt in decreasing order
    updatedPost.comments.sort((a, b) => b.createdAt - a.createdAt);
    res.status(200).json({ updatedComments: updatedPost.comments });
}))

module.exports = router;