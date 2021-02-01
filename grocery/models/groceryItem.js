var mongoose = require('mongoose');

const grocerySchema =  new mongoose.Schema({
    item: String,
    description: String,
    price: Number,
    quantity: Number,
    start: {type: Date, default: Date.now},
    end: {type: Date, default: Date.now},
    product: String
});

let groceryItemModel;
try{
    groceryItemModel = mongoose.model("GroceryItem");
} catch{
    groceryItemModel = mongoose.model("GroceryItem", grocerySchema);
}
export {grocerySchema, groceryItemModel};
