const { Schema, model } = require('mongoose');
const { USER, OAuthAction } = require('../config/database-tables.enum');

const OAuthSchema = new Schema({
    action_token: {
        type: String,
        required: true
    },
    user: {
        type: Schema.Types.ObjectId,
        required: true,
        ref: USER
    }
}, { timestamps: true });

module.exports = model(OAuthAction, OAuthSchema);