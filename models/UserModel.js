const mongoose = require('mongoose');
const Schema = mongoose.Schema;

// Create Schema
const UserSchema = new Schema({
  name: {
    type: String,
    required: true
  },
  email: {
    type: String,
    required: true,
    unique: true
  },
  password: {
    type: String,
    required: true
  },
  register_date: {
    type: Date,
    default: Date.now
  }
});

//creating Model.
//mongodb uses collections name as prular and also with small letters so to do this 
//we pass our created collection name as same as we created as a third  parameter in model function.
//now it will not created an other collection with prular and small letters.
//but it will save the data in the same collection as we created and passed as third parameter.
const User = mongoose.model('user', UserSchema,'Users');

module.exports = User;
