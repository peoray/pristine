const mongoose = require('mongoose');
const passportLocalMongoose = require('passport-local-mongoose');
// var findOrCreate = require('mongoose-findorcreate');

const Schema = mongoose.Schema;

const userSchema = new Schema({
    fullname: String,
    username: String,
    email: String,
    password: String,
    googleId: String,
    facebookId: String
});

userSchema.plugin(passportLocalMongoose);
// userSchema.plugin(findOrCreate);

module.exports = mongoose.model('User', userSchema);