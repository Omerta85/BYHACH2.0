const { PASSWORD } = require('../config/constants');

module.exports = {
    userNormalizator: (userToNormalize) => {
        const fieldsToRemove = [
            PASSWORD,
            '_v'
        ];

        fieldsToRemove.forEach((field) => {
            delete userToNormalize[field];
        });

        return userToNormalize;
    }
};