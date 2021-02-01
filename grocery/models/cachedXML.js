var mongoose = require('mongoose');

const cachedXMLSchema =  new mongoose.Schema({
    albertsons_id: String,
    stores: [Number],
    start_date: {type: Date, default: Date.now},
    end_date: {type: Date, default: Date.now},
    title: String,
    type: String
});

let cachedXMLModel;
try{
    cachedXMLModel = mongoose.model("cachedXML");
} catch{
    cachedXMLModel = mongoose.model("cachedXML", cachedXMLSchema);
}
export {cachedXMLSchema, cachedXMLModel};
