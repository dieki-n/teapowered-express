var mongoose = require('mongoose');

const blogPostSchema =  new mongoose.Schema({
    title: String,
    text: String,
    author: String,
    author_id: Number,
    published: Boolean,
    url: String,
    date: {type: Date, default: Date.now},
});

let blogPostModel;
try{
    blogPostModel = mongoose.model("blogPost");
} catch{
    blogPostModel = mongoose.model("blogPost", blogPostSchema);
}
export {blogPostSchema, blogPostModel};
