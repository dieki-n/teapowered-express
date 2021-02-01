import express from 'express';
import React from 'react';

import { renderToString } from 'react-dom/server';

import connectDb from '../util/db.js';
import {blogPostModel} from './models/blogPost.js';
import {blogUrlSequenceModel} from './models/blogUrlSequence.js';

import Index from './pages/index.js';
import NewPostUI from './pages/admin.js';
import PostUI from './pages/post.js';
import {Error404} from './pages/errors.js';


const baseURL = "http://teapowered.test/blog/";

//Generates a URL string from the post title
//Checks the database to see if the URL has been used before; if so, adds a number to the end
//Returns a promise which resolves into the URL
function urlFromTitle(title){
    var url = title.trim().toLowerCase();      //remove trailing or leading whitespace
    url = url.replace(' ', '-');               //replace spaces with dashes
    url = url.replace(/[^0-9a-zA-Z_\-]/g, ''); //remove all non-alphanumeric chars
    return connectDb().then(() => {
        return blogUrlSequenceModel.findOne({"url": url})
    }).then((results) => {
        if (results != null){
            blogUrlSequenceModel.updateOne({"url": url}, {$inc:{sequence:1}}).exec();
            return url + "_" + (results.sequence + 1).toString();
        } else {
            new blogUrlSequenceModel({"url": url, "sequence": 1}).save();
            return url;
        }
    })
}
function htmlTemplate( reactDom, componentName ) {
    return `
        <!DOCTYPE html>
        <html> 
        <head>
            <meta charset="utf-8">
            <meta name="component" content="${componentName}">
            <title>Victor Noordhoek's Blog</title>
            <link rel="stylesheet" href="/blog_client.bundle.css"/>
        </head>
        
        <body>
            <div id="app">${ reactDom }</div>
            <script src="/blog/resources/client.bundle.js"></script>
        </body>
        </html>
    `;
}

var router = express.Router();

router.get('/newpost', function(req, res, next) {
    const jsx = ( <NewPostUI/> );
    res.send(htmlTemplate(renderToString(jsx), "NewPostUI"));
});

router.post('/newpost', function(req, res, next) {
    connectDb()
    .then(() => urlFromTitle(req.body.postTitle))
    .then(url => {
        var createdPost = new blogPostModel({
            title: req.body.postTitle,
            text: req.body.postBody,
            author: "Victor Noordhoek",
            url: url,
            author_id: 1,
            published: true,
        });
        createdPost.save();
        res.json({
            "error":0,
            "url": baseURL + "posts/" + url
        });
    })
    
});

router.get('/', function(req, res, next) {
    connectDb()
    .then(() => blogPostModel.find({published: true}))
    .then((results) => {
        if (results !== undefined){
            const jsx = ( <Index data={results} /> );
            res.send(htmlTemplate(renderToString(jsx), "Index"));
        } else {
            const jsx = ( <Error404/> );
            res.send(htmlTemplate(renderToString(jsx), "Error404"));
        }
    });
});

router.get('/posts/:postURL', function(req, res, next) {
    connectDb()
    .then(() => blogPostModel.findOne({published: true, url: req.params.postURL.toLowerCase()}))
    .then((result) => {
        const jsx = ( <PostUI data={result} /> );
        res.send(htmlTemplate(renderToString(jsx), "Index"));
    });
});

router.get('/page/:pageNumber', function(req, res, next) {
    connectDb()
    .then(() => blogPostModel.find({published: true}))
    .then((results) => {
        const jsx = (<Index data={results} />);
        res.send(htmlTemplate(renderToString(jsx), "Index"));
    });
    
});

export default router;