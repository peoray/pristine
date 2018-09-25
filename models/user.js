const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');

const {
    Schema
} = mongoose;

const userSchema = new Schema({
    local: {
        name: {
            type: String,
        },
        username: {
            type: String,
            index: true,
            unique: true
        },
        email: {
            type: String,
            unique: true,
            lowercase: true
        },
        password: {
            type: String,
        },
        secretToken: {
            type: String
        },
        active: {
            type: Boolean
        }
    },
    google: {
        id: String,
        // token: String,
        email: String,
        username: String
    },
    facebook: {
        id: String,
        // token: String,
        email: String,
        username: String
    }
});

module.exports = mongoose.model('User', userSchema);

module.exports.hashPassword = async password => {
    try {
        const salt = await bcrypt.genSaltSync(10);
        return await bcrypt.hash(password, salt);
    } catch (error) {
        throw new Error('Hashing failed ', error);
    }
}

module.exports.comparePassword = async (inputPassword, hashedPassword) => {
    try {
        return await bcrypt.compare(inputPassword, hashedPassword);
    } catch (error) {
        throw new Error('comparing failed', error);
    }
}