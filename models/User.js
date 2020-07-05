
const mongoose = require('mongoose');

// Schema - object that defines the structure of any document taht wiil be stored in MongoDB collection

const UserSchema = new mongoose.Schema({
  username: {type: String, required: true},
  email: {type: String, required: true},
  password: {type: String, required: true},
  date: {type: Date, default: Date.now}
})

// Model - object thta gives easy access to a named collection, allowing you to query the collection and use the Schema to validate any documents you save to that collection. It is created by combining a Schema, a Connection and a collection name.

const User = mongoose.model('User', UserSchema);

// User document is created after validation in users.js

// exporting User

module.exports = User;
