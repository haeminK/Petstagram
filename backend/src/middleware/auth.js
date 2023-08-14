const jwt = require('jsonwebtoken');
const User = require("../models/User");
const Post = require("../models/Post");
const Comment = require("../models/Comment");
const ExpressError = require('../utils/ExpressError');

// Authenticate user before deleting or editing post
module.exports.isPostAuthor = async (req, res, next) => {
    const { postId } = req.params;


    const post = await Post.findById(postId)
        .populate({
            path: 'author',
            select: '-password'
        });

    try {
        //chekc if post exists
        if (!post) {
            throw new ExpressError("Post not found", 400);
        }

        //check if post author id equals to current user Id
        if (!(post.author._id).equals(req.user._id)) {
            throw new ExpressError("You don't have an access", 400);
        }
    }
    catch (e) {
        next(e)
    }

    next();
};

// Authenticate user before deleting comment
module.exports.isCommentAuthor = async (req, res, next) => {
    const { commentId } = req.params;

    const comment = await Comment.findById(commentId)
        .populate({
            path: 'author',
            select: '-password'
        });


    try {
        //check if comment exists
        if (!comment) {
            throw new ExpressError("Comment not found", 400);
        }

        //check if comment author id equals to current user Id
        if (!(comment.author._id).equals(req.user._id)) {
            throw new ExpressError("You don't have an access", 400);
        }
    } catch (e) {
        next(e);
    }

    next();
};


module.exports.authorize = async (req, res, next) => {
    const header = req.headers.authorization;
    const token = header && header.split(' ')[1];

    if (!token || token === 'undefined') return res.sendStatus(400);

    try {
        // verify user
        const decode = jwt.verify(token, process.env.JWT_SECRET);
        const user = await User.findById(decode?.userId);

        if (!user) {
            throw new ExpressError("User not found", 400);
        };

        req.user = user;
        next();
    } catch (error) {
        next(error);
    };
};