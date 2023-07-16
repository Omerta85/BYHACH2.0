const { Schema, model } = require('mongoose');
const mongoose = require('mongoose');
const { PUB } = require('../config/database-tables.enum');
const geocoder = require('../utils/geocoder.util');

const pubSchema = new Schema({
    name: {
        type: String,
        required: true,
        trim: true
    },
    address: {
        type: String,
        required: true,
        trim: true
    },
    contact: {
        type: String,
        required: true,
        trim: true
    },
    tags: {
        type: [String],
        required: true
    },
    order: {
        type: Number,
        required: true,
        trim: true
    },
    description: {
        type: String,
        required: true,
        trim: true
    },
    schedule: {
        type: String,
        required: true,
        trim: true
    },
    category: {
        type: String,
        required: true
    },
    createdBy: {
        type: String,
        required: true
    },
    avatar: {},
    isActivated: {
        type: Boolean,
        default: false
    },
    ratings: {
        type: Number,
        default: 0,
    },
    reviews: [{
        user: {
            type: mongoose.Schema.ObjectId,
            ref: 'User',
            required: true,
        },
        name: {
            type: String,
            required: true,
        },
        rating: {
            type: Number,
            required: true,
        },
        comment: {
            type: String,
            required: true,
        },
    }],
    numOfReviews: {
        type: Number,
        default: 0,
    },
    news: [{
        user: {
            type: mongoose.Schema.ObjectId,
            ref: 'User',
            required: true,
        },
        name: {
            type: String,
            required: true,
        },
        category: {
            type: String,
            required: true
        },
        title: {
            type: String,
            required: true
        },
        text: {
            type: String,
            required: true,
        },
        avatar: {}
    }],
    numOfNews: {
        type: Number,
        default: 0,
    },
    location: {
        coordinates: {
            type: [Number],
            index: '2dsphere'
        },
        formattedAddress: String
    }

}, { timestamps: true });

pubSchema.pre('save', async function(next) {
    const loc = await geocoder.geocode(this.address);
    this.location = {
        coordinates: [
            loc[0].latitude,
            loc[0].longitude
        ],
        formattedAddress: loc[0].formattedAddress
    };

    next();
});

module.exports = model(PUB, pubSchema);