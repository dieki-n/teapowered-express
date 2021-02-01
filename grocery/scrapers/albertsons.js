var fetch = require('node-fetch');
var util = require('util');
var xml2js = require('xml2js');
var striptags = require('striptags');
var TimedQueue = require('../util/timedQueue');
var connectDb = require('../../util/db.js');
var {cachedXMLSchema, cachedXMLModel} = require('../models/cachedXML.js');
var {grocerySchema, groceryItemModel} = require('../models/groceryItem.js');



const RATE_LIMIT = 3000 //milliseconds to wait between requests
const filter_phrases = ["Selected varieties.", "Selected varieties", "Previously Frozen.", "In selected stores while supplies last.", ", select varieties"]
const LAST_UPDATED = "01-12-2021";
const STORE_LIST_URL = "https://circulars-prod.cpnscdn.com/padolib/Albertsons/catalogs.json";
const XML_CATALOG_URL = "https://circulars-prod.cpnscdn.com/padolib/Albertsons/%s/store/%d/productDB.xml"
const ALREADY_CACHED = "XML already in database"


const requestQueue = new TimedQueue(RATE_LIMIT);


function checkStatus(res){
    if (res.ok) { // res.status >= 200 && res.status < 300
        return res;
    } else {
        throw new Error(res.statusText);
    } 
} 

function parseStoreList(json){
    let output = []
    json.catalogs.forEach(catalog => {
        if ('stores' in catalog && 'id' in catalog) {
            output.push({
                "albertsons_id"  : catalog.id,
                "stores"         : Object.keys(catalog.stores).map(s => parseInt(s)),
                "start_date"     : catalog.start,
                "end_date"       : catalog.start,
                "title"          : catalog.properties.posterTitle,
                "type"           : catalog.type
            });
        } else {
            console.log(catalog)
        }
    });
    /*Object.keys(output).forEach(c => {
        if (output[c].stores.includes('819')){
            console.log(c, output[c].type, output[c].title, output[c].date);
        }
    })*/
    return output;
}

function getStoreList(){
    return requestQueue.add(() => fetch(STORE_LIST_URL))
        .then(checkStatus)
        .then(res => res.json())
        .then(parseStoreList);        
}

function processDescription(str){
    let output = striptags(str);
    filter_phrases.forEach(phrase => {
        output = output.replace(phrase, "");
    })
    return output.trim();
}
function parseCatalog(xml){
    let data = xml['catalog-productdb']['catalog-product']
    let output = [];
    data.forEach(i => {
        if (Number(i.$.sale) > 0){
            let grocery_item = {item:  striptags(i.$.title).trim(),
                         description: processDescription(i.description.join(" ")),
                         price: Number(i.$.sale),
                         quantity: Number(i.$.quantity),
                         start: new Date(i.$.start),
                         end: new Date(i.$.end),
                         product: i.$.product};

            let x = groceryItemModel.findOneAndUpdate(grocery_item, grocery_item, {upsert: true}).exec(); //Use update so that if it already exists we don't create duplicates

            output.push(grocery_item);
            console.log(i.$.title.padEnd(60).substring(0,60), processDescription(i.description.join(" ")).padEnd(60).substring(0,60), `${i.$.quantity}/${i.$.sale}`, i.$.bogo);
        }
    });
    return output;
}

//This function is NOT SAFE against untrusted input. Do not accept an xml_id from a user.
function getCatalogItems(xml_id, store){
    let url = util.format(XML_CATALOG_URL, xml_id, Number(store));
    return requestQueue.add(() => fetch(url))
        .then(checkStatus)
        .then(res => res.text())
        .then(xml2js.parseStringPromise)
        .then(parseCatalog);        
}

function getStoreCatalogs(catalog_list){
    catalog_list.forEach(catalog => {
        cachedXMLModel.find({albertsons_id: catalog.albertsons_id}).then(xmls => {
            console.log(xmls.length, xmls);
            if (xmls.length == 0){
                new cachedXMLModel(catalog).save(); //Store in database
                return getCatalogItems(catalog.albertsons_id, catalog.stores[0]);
            } else {
                return Promise.reject(ALREADY_CACHED);
            }
        }).then(output => {
            console.log("I didn't wanna get here");
            return output;
        }).catch(err => {
            if (err != ALREADY_CACHED) console.error(err);
            return err;
        });
        console.log(catalog.albertsons_id, catalog.stores[0])
    })
    
}
function albertsonsScraper(){
    console.log(`Albertsons Weekly Ad Scraping Engine v${LAST_UPDATED}`)
    return connectDb()
            .then(getStoreList)
            .then(getStoreCatalogs);
   
   
   

}

export default albertsonsScraper
