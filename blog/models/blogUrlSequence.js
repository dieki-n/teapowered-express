var mongoose = require('mongoose');

const blogUrlSequenceSchema =  new mongoose.Schema({
    url: String,
    sequence: Number
});

let blogUrlSequenceModel;
try{
    blogUrlSequenceModel = mongoose.model("blogUrl");
} catch{
    blogUrlSequenceModel = mongoose.model("blogUrl", blogUrlSequenceSchema);
}
export {blogUrlSequenceSchema, blogUrlSequenceModel};
