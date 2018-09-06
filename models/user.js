const mongoose = require('mongoose');
// const passportLocalMongoose = require('passport-local-mongoose');
const bcrypt = require('bcryptjs');
// var findOrCreate = require('mongoose-findorcreate');

const Schema = mongoose.Schema;

const userSchema = new Schema({
    name: {
        type: String,
        required: true
    },
    username: {
        type: String,
        index: true,
        required: true,
        unique: true
    },
    email: {
        type: String,
        required: true,
        unique: true,
        lowercase: true
    },
    password: {
        type: String,
        required: true
    }
});

// userSchema.plugin(passportLocalMongoose);
// userSchema.plugin(findOrCreate);
module.exports = mongoose.model('User', userSchema);

module.exports.hashPassword = async (password) => {
    try {
        const salt = await bcrypt.genSaltSync(10);
        return await bcrypt.hash(password, salt);
    } catch (error) {
        throw new Error('Hashing failed ', error);
    }
}