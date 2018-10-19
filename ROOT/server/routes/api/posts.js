const express = require('express');
const mongodb = require('mongodb');

const router = express.Router();

// Get items
// router.get('/', (req, res) => {
//     res.send('hello');
// });
// Async function
router.get('/', async (req, res) => {
    const posts = await loadPostsConnection();
    res.send(await posts.find({}).toArray());
});

// Add item
router.post('/', async (req, res) => {
    const posts = await loadPostsConnection();
    let newPost = {
        text: req.body.text,
        createdAt: new Date() // consider creating a UTC date
    }
    await posts.insertOne(newPost);
    res.status(201).send();
});


// Delete item
router.delete('/:id', async (req, res) => {
    const posts = await loadPostsConnection();
    await posts.deleteOne(
        {_id: new mongodb.ObjectID(req.params.id)}
        );
    res.status(200).send();
});

//connect to DB
async function loadPostsConnection() {
    const client = await mongodb.MongoClient.connect(
        'mongodb://sa:aabbcc1234@ds119268.mlab.com:19268/vue_express', {
        useNewUrlParser: true
    });

    // returns DB "vue_express" collection a.k.a table "posts"
    return client.db('vue_express').collection('posts');
}

module.exports = router;