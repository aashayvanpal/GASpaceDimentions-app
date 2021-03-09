const mongoose = require('mongoose')

// Step2 :Define the schema
// defining the schema
const Schema = mongoose.Schema
const BlogPostSchema = new Schema({
    title: String,
    body: String,
    date: {
        type: String,
        default: Date.now()
    }
})

// Step3 Define the model
// Modules
const BlogPost = mongoose.model('BlogPost', BlogPostSchema)

module.exports = BlogPost