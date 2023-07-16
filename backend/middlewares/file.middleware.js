const { PHOTO_MAX_SIZE, MIMETYPES } = require('../config/constants');
const ErrorHandler = require('../errors/ErrorHandler');

module.exports = {
    // eslint-disable-next-line require-await
    checkAvatar: async (req, res, next) => {
        try {
            if (!req.files || !req.files.avatar) {
                next();
                return;
            }

            const { size, mimetype } = req.files.avatar;

            if (size > PHOTO_MAX_SIZE) {
                throw new ErrorHandler(400, 'File is too big');
            }

            if (!MIMETYPES.PHOTO.includes(mimetype)) {
                throw new ErrorHandler(400, 'wrong format');
            }

            next();
        } catch (e) {
            next(e);
        }
    }
};