import express from 'express';
import React from 'react';
import schedule from 'node-schedule';
import { renderToString } from 'react-dom/server';

import albertsonsScraper from './scrapers/albertsons.js';

import connectDb from '../util/db.js';
import {groceryItemModel} from './models/groceryItem.js';

import Index from './components/index.js';

function htmlTemplate( reactDom ) {
    return `
        <!DOCTYPE html>
        <html> 
        <head>
            <meta charset="utf-8">
            <title>Grocery Sales Over Time</title>
            <link rel="stylesheet" href="grocery/resources/client.bundle.css"/>
        </head>
        
        <body>
            <div id="app">${ reactDom }</div>
            <script src="grocery/resources/client.bundle.js"></script>
        </body>
        </html>
    `;
}

var midnight_scraper = schedule.scheduleJob("0 * * *", function(){
    console.log("I ran at midnight.");
    albertsonsScraper();
})

var router = express.Router();
/* GET home page. */
router.get('/', function(req, res, next) {
  /*connectDb()
    .then(albertsonsScraper)
    .then(result => res.send(result))
    .catch(err => res.send(err)); */
    const jsx = ( <Index /> );
    const reactDom = renderToString( jsx );

    
    res.send( htmlTemplate( reactDom ) );
    

});
router.get('/search/:query/:token', function(req, res, next) {
    var output = []; 
    connectDb().then((result) => {
        return groceryItemModel.find({$text: {$search: req.params.query}}).limit(10)
    }).then(results => {
        results.forEach((r) => {
            output.push(r.item)
        })
        res.json({data: output, token: req.params.token});
    });    
});

router.get('/data/:item', function(req, res, next) {
    var output = []; 
    connectDb().then((result) => {
        return groceryItemModel.find({item: req.params.item})
    }).then(results => {
        res.json(results);
    });
    
});
export default router;