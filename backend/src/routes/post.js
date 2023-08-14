const express = require('express');
const router = express.Router();
const Post = require('../models/Post');
const multer = require('multer');
const { storage } = require('../cloudinary/index');
const upload = multer({ storage });
const catchAsync = require('../utils/catchAsync');
const { cloudinary } = require('../cloudinary/index');
const { authorize, isPostAuthor } = require('../middleware/auth');

router.get('/', catchAsync(async (req, res, next) => {
    //categories filter
    const filters = req.query.filters;
    const filterQuery = filters ? { categories: { $in: filters.categories } } : {}

    const posts = await Post
        .find(filterQuery)
        .sort([['createdAt', 'desc']])
        .populate(
            {
                path: 'author',
                select: 'username'
            });

    return res.status(200).json(posts);
}))

router.post('/', authorize, upload.array('images'), catchAsync(async (req, res, next) => {
    const postData = JSON.parse(req.body.postData);
    const newPost = new Post(postData);

    //overwrite images with data from req.files
    newPost.images = req.files.map(f => ({ url: f.path, filename: f.filename }));
    newPost.author = req.user._id;
    await newPost.save();

    res.status(201).json({ postId: newPost._id });
}));

router.get('/:postId', catchAsync(async (req, res, next) => {
    const postId = req.params.postId;
    const foundPost = await Post.findById(postId)
        .populate({
            path: 'author',
            select: '-password'
        })
        .populate({
            path: 'comments',
            populate: {
                path: 'author',
                select: '-password'
            }
        });

    //increase view counts
    foundPost.views = foundPost.views + 1;
    await foundPost.save();

    //sort comment by createdAt in decreasing order
    foundPost.comments.sort((a, b) => b.createdAt - a.createdAt);
    res.status(200).json(foundPost);
}));

router.delete('/:postId', authorize, isPostAuthor, catchAsync(async (req, res, next) => {
    const deletedPost = await Post.findByIdAndDelete(req.params.postId);

    //Delete images stored in cloudinary
    if (deletedPost.images) {
        for (let image of deletedPost.images) {
            await cloudinary.uploader.destroy(image.filename);
        }
    };

    res.sendStatus(200);
}));

router.put('/:postId', authorize, isPostAuthor, upload.array('images'), catchAsync(async (req, res, next) => {
    //extract path and file name from newly added images
    const newImages = req.files.map(f => ({ url: f.path, filename: f.filename }));
    const {
        title,
        description,
        categories,
        originalImages,
        deletedOriginalImgs } = JSON.parse(req.body.postData);

    const foundPost = await Post.findByIdAndUpdate(
        req.params.postId,
        {
            title,
            description,
            categories,
            // merge originalImages and newImages list
            images: [...originalImages, ...newImages]
        });
    await foundPost.save();

    // destroy deleted images from cloudinary store
    if (deletedOriginalImgs) {
        for (let filename of deletedOriginalImgs) {
            await cloudinary.uploader.destroy(filename);
        }
    };

    res.sendStatus(201);
}))

module.exports = router;