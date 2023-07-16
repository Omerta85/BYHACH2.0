const { Pub } = require('../database');
const ErrorHandler = require('../errors/ErrorHandler');

module.exports = {
    isPubNotPresent: (req, res, next) => {
        try {
            const { pub } = req;

            if (!pub) {
                throw new ErrorHandler(404, 'ErrorPage from isUserNotPresent');
            }
            next();
        } catch (e) {
            next(e);
        }
    },

    getPubByDynamicParam: (paramName, searchIn = 'body', dbField = paramName) => async (req, res, next) => {
        try {
            const value = req[searchIn][paramName];

            const pub = await Pub.findOne({ [dbField]: value }).lean();

            req.pub = pub;

            next();
        } catch (e) {
            next(e);
        }
    }
};