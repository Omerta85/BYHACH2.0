const jwt = require('jsonwebtoken');
const util = require('util');
const { ACTION_SECRET_KEY, ACCESS_SECRET_KEY, REFRESH_SECRET_KEY } = require('../config/variables');
const {
    ACTION_TIME, ACCESS_TIME, REFRESH_TIME, ACCESS, REFRESH, ACTION
} = require('../config/constants');
const ErrorHandler = require('../errors/ErrorHandler');

const verifyPromise = util.promisify(jwt.verify);

module.exports = {
    generateActionToken: () => {
        const action_token = jwt.sign({}, ACTION_SECRET_KEY, { expiresIn: ACTION_TIME });

        return {
            action_token
        };
    },

    generateTokenPair: () => {
        const access_token = jwt.sign({}, ACCESS_SECRET_KEY, { expiresIn: ACCESS_TIME });
        const refresh_token = jwt.sign({}, REFRESH_SECRET_KEY, { expiresIn: REFRESH_TIME });

        return {
            access_token,
            refresh_token
        };
    },

    verifyToken: async (token, tokenType = ACCESS) => {
        try {
            let secret = '';
            if (tokenType === ACCESS) {
                secret = ACCESS_SECRET_KEY;
            } else if (tokenType === REFRESH) {
                secret = REFRESH_SECRET_KEY;
            } else if (tokenType === ACTION) {
                secret = ACTION_SECRET_KEY;
            }

            await verifyPromise(token, secret);
        } catch (e) {
            throw new ErrorHandler(401, 'token is validate');
        }
    }
};