module.exports = {
    PASSWORD_REGEX: new RegExp(/^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#\\$%\\^&\\*])(?=.{8,120})/),
    EMAIL_REGEX: new RegExp(/^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+\\.[a-zA-Z0-9-.]+$/),
    CURRENT_YEAR: new Date().getFullYear(),
    DB_CONNECT_URL: process.env.DB_CONNECT_URL || 'mongodb://user:password@db:27017/node-js',
    AMAZON_CUT: 'amazonaws.com/',

    ACTION_TIME: '3d',
    ACCESS_TIME: '12h',
    REFRESH_TIME: '31d',
    ACTION: 'action',
    ACCESS: 'access',
    REFRESH: 'refresh',

    PASSWORD: 'password',
    GMAIL: 'gmail',
    USERS: 'users',
    PUBS: 'pubs',

    PHOTO_MAX_SIZE: 5 * 1024 * 1024,
    MIMETYPES: {
        PHOTO: [
            'image/jpeg',
            'image/png',
            'image/jpg'
        ]
    }
};