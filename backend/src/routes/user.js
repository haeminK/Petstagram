const express = require('express');
const router = express.Router();
const User = require('../models/User');
const catchAsync = require('../utils/catchAsync');
const jwt = require('jsonwebtoken');
const { authorize } = require('../middleware/auth');
const ExpressError = require('../utils/ExpressError');

// sign user and return new token
const jwtSign = userId => (
    jwt.sign({
        userId: userId.toHexString()
    },
        process.env.JWT_SECRET,
        { expiresIn: '1h' }
    )
);

router.get('/auth', authorize, catchAsync(async (req, res, next) => {
    const { user } = req;

    //send up to date user data
    return res.json({
        email: user.email,
        username: user.username,
        image: user.image,
        id: user._id
    })
}));

//register user
router.post('/register', catchAsync(async (req, res, next) => {
    const user = new User(req.body);
    await user.save();

    //sign in user and get token
    const token = jwtSign(user._id);
    const userData = {
        email: user.email,
        username: user.username,
        image: user.image,
        id: user._id
    };

    return res.json({ user: userData, token });
}));

//logiin user
router.post('/login', catchAsync(async (req, res, next) => {
    const { username, password } = req.body;
    const foundUser = await User.findOne({ username });

    // if username exists
    if (!foundUser) {
        throw new ExpressError("Incorrect username or password", 400);

    };

    //if password match
    const match = await foundUser.comparePassword(password);
    if (!match) {
        throw new ExpressError("Incorrect username or password", 400);
    };
    const userData = {
        email: foundUser.email,
        username: foundUser.username,
        image: foundUser.image,
        id: foundUser._id
    };
    // sign in user, then send userdata and token
    const token = jwtSign(foundUser._id);
    return res.json({ user: userData, token })
}));

// send 200 response if user is loged in before signing out
router.post('/logout', authorize, catchAsync(async (req, res, next) => {
    return res.sendStatus(200);
}));

module.exports = router;