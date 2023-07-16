const ErrorHandler = require('../errors/ErrorHandler');
const { jwtService } = require('../services');
const { ACCESS, ACTION, REFRESH } = require('../config/constants');
const { USER } = require('../config/database-tables.enum');
const { authValidator } = require('../validators');
const { User, OAuth } = require('../database');

module.exports = {
    validateAccessToken: async (req, res, next) => {
        try {
            const access_token = req.get('Authorization');

            if (!access_token) {
                throw new ErrorHandler(401, 'No token');
            }

            await jwtService.verifyToken(access_token, ACCESS);

            const tokenFromDB = await OAuth.findOne({ access_token }).populate(USER);

            if (!tokenFromDB) {
                throw new ErrorHandler(401, 'Invalid token');
            }
            req.user = tokenFromDB.user;

            next();
        } catch (e) {
            next(e);
        }
    },

    validateActionToken: async (req, res, next) => {
        try {
            const { action_token } = req.body;
            // const action_token = req.get('Authorization');

            if (!action_token) {
                throw new ErrorHandler(401, 'No token');
            }

            await jwtService.verifyToken(action_token, ACTION);

            const tokenFromDB = await OAuth.findOne({ action_token }).populate(USER);

            if (!tokenFromDB) {
                throw new ErrorHandler(401, 'Invalid token');
            }
            req.user = tokenFromDB.user;

            next();
        } catch (e) {
            next(e);
        }
    },

    validateRefreshToken: async (req, res, next) => {
        try {
            const refresh_token = req.get('Authorization');

            if (!refresh_token) {
                throw new ErrorHandler(401, 'No token');
            }

            await jwtService.verifyToken(refresh_token, REFRESH);

            const tokenFromDB = await OAuth.findOne({ refresh_token }).populate(USER);

            if (!tokenFromDB) {
                throw new ErrorHandler(401, 'Invalid token');
            }
            req.user = tokenFromDB.user;

            next();
        } catch (e) {
            next(e);
        }
    },

    validateLoginUser: (req, res, next) => {
        try {
            const { error } = authValidator.loginUserValidator.validate(req.body);

            if (error) {
                throw new ErrorHandler(400, error.details[0].message);
            }

            next();
        } catch (e) {
            next(e);
        }
    },

    lastLoginationUser: async (req, res, next) => {
        try {
            const { user } = req;
            await User.findByIdAndUpdate(
                { _id: user._id },
                { lastLoginDate: new Date() },
                { new: true }
            );

            next();
        } catch (e) {
            next(e);
        }
    }
};