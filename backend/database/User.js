const { Schema, model } = require('mongoose');

const mongoose = require('mongoose');
const { databaseTablesEnum } = require('../config');
const { USER } = require('../config/database-tables.enum');

const userSchema = new Schema({
    name: {
        type: String,
        required: true,
        trim: true
    },
    email: {
        type: String,
        required: true,
        trim: true,
        unique: true
    },
    born_year: {
        type: Number,
        trim: true,
        required: true
    },
    password: {
        type: String,
        trim: true,
        required: true,
        select: false
    },
    role: {
        type: String,
        default: databaseTablesEnum.USER,
        enum: Object.values(databaseTablesEnum)
    },
    lastLoginDate: {
        type: Date,
        default: Date.now
    },
    cart: {
        type: Array,
        default: []
    },
    offer: [{
        user: {
            type: mongoose.Schema.ObjectId,
            ref: 'User',
            required: true,
        },
        name: {
            type: String,
            required: true
        },
        date: {
            type: String,
            required: true
        },
        time: {
            type: String,
            required: true
        },
        goal: {
            type: String,
            required: true
        },
        phone_number: {
            type: String,
            required: true
        },
        sex: {
            type: String,
            required: true
        },
        quantity: {
            type: String,
            required: true
        },
        telegram: {
            type: String,
            required: true
        },
        paid: {
            type: String,
            required: true
        },
        sum: {
            type: String,
            required: true
        },
        img: {},
        creator: {
            type: String,
            required: true
        }
    }],
    avatar: {
    }
}, { timestamps: true });

module.exports = model(USER, userSchema);