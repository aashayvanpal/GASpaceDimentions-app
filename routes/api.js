const express = require('express')
const BlogPost = require('../models/blogPost.js')

const router = express.Router()
// Routes
router.get('/', (req, res) => {

    BlogPost.find({})
        .then((data) => {
            console.log('data:', data)
            res.json(data)

        })
        .catch((error) => {
            console.log('error', error)
        })
})

router.post('/save', (req, res) => {
    // console.log('request.body', req.body)
    const data = req.body

    const newBlogPost = new BlogPost(data)

    newBlogPost.save(error => {
        if (error) {
            res.status(500).json({ msg: 'sorry internal server error' })
            return
        }
        return res.json({
            msg: 'we have recieved BlogPost data!'
        })
    })


})

router.get('/name', (req, res) => {
    const data = {
        username: 'user2',
        age: 50
    }
    res.json(data)
})

module.exports = router