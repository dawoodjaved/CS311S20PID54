const mongoose = require("mongoose");
const Schema = mongoose.Schema;

//create Schema and Model.
const ItemSchema = new Schema({
  name: {
    type: String,
    required: true,
  },
  date: {
    type: Date,
    default: Date.now(),
  },
});

//creating Model.
//mongodb uses collections name as prular and also with small letters so to do this
//we pass our created collection name as same as we created as a third  parameter in model function.
//now it will not created an other collection with prular and small letters.
//but it will save the data in the same collection as we created and passed as third parameter.
const Items = mongoose.model("items", ItemSchema, "Items");

//you can make model directly without making schema by defining
//schema within the model..

// var postMessagesModel = mongoose.model('postMessages',
// {
// name:{
//     type:String,
//     required:true
// },
// date:{
//     type:String,
//     default:Date.now();
// }
// });

module.exports = Items;
