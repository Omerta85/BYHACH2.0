const { authValidator } = require('../validators');
const ErrorHandler = require('../errors/ErrorHandler');
const { User } = require('../database');

module.exports = {
    isUserNotPresent: (req, res, next) => {
        try {
            const { user } = req;

            if (!user) {
                throw new ErrorHandler(404, 'ErrorPage from isUserNotPresent');
            }

            next();
        } catch (e) {
            next(e);
        }
    },

    isUserPresent: (req, res, next) => {
        try {
            const { user } = req;

            if (user) {
                throw new ErrorHandler(409, 'User is already present');
            }
        } catch (e) {
            next(e);
        }
    },

    validateUserBody: (paramName, searchIn = 'body') => (req, res, next) => {
        try {
            const { error } = paramName.validate(req[searchIn]);

            if (error) {
                throw new ErrorHandler(400, 'ErrorPage from validate user body');
            }
            next();
        } catch (e) {
            next(e);
        }
    },

    validateNewPassword: (req, res, next) => {
        try {
            const { error, value } = authValidator.passwordValidator.validate(req.body);

            req.body = value;

            if (error) {
                throw new ErrorHandler(400, error.details[0].message);
            }

            next();
        } catch (e) {
            next(e);
        }
    },

    validateEmail: (req, res, next) => {
        try {
            const { error, value } = authValidator.emailValidator.validate(req.body);

            req.body = value;

            if (error) {
                throw new ErrorHandler(400, error.details[0].message);
            }

            next();
        } catch (e) {
            next(e);
        }
    },

    checkUserRole: (rolesArr = []) => (req, res, next) => {
        try {
            const { user: { role } } = req;

            if (!rolesArr.length) return next();

            if (!rolesArr.includes(role)) throw new ErrorHandler(403, 'error from check role');

            next();
        } catch (e) {
            next(e);
        }
    },

    isUserLogged: (req, res, next) => {
        try {
            const { user, params: { user_id } } = req;

            if (user._id.toString() !== user_id) {
                throw new ErrorHandler(401, 'User is logged');
            }
        } catch (e) {
            next(e);
        }
    },

    getUserByDynamicParam: (paramName, searchIn = 'body', dbField = paramName) => async (req, res, next) => {
        try {
            const value = req[searchIn][paramName];

            const user = await User.findOne({ [dbField]: value }).select('+password').lean();

            req.user = user;

            next();
        } catch (e) {
            next(e);
        }
    }

};