if (process.env.NODE_ENV !== "production") {
    require('dotenv').config();
}

const express = require('express');
const app = express();
const mongoose = require('mongoose');
const cors = require('cors');

const postRoute = require('./routes/post');
const userRoute = require('./routes/user');
const commentRoute = require('./routes/comment');

main().catch(err => console.log(err));

async function main() {
    await mongoose.connect(process.env.MONGODB_API, {
        useNewUrlParser: true,
        useUnifiedTopology: true,
    });
    console.log("database connected")
    // use `await mongoose.connect('mongodb://user:password@127.0.0.1:27017/test');` if your database has auth enabled
}

app.use(cors());
app.use(express.json());


app.use('/user', userRoute);
app.use('/post', postRoute);
app.use('/comment', commentRoute);

app.get('*', (req, res) => {
    throw new Error('Route does not exist');
});

app.use((err, req, res, next) => {
    const { statusCode = 500 } = err;
    if (!err.message) err.message = 'Something Went Wrong!';

    res.status(statusCode).send(err.message);
});

app.listen(3000, () => {
    console.log('listening..')
});
