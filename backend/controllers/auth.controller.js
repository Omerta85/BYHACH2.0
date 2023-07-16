const { passwordService, jwtService, emailService } = require('../services');
const { OAuth, OAuthAction, User } = require('../database');
const { userNormalizator } = require('../utils/user.util');
const { emailActionEnum } = require('../config');

module.exports = {
    loginUser: async (req, res, next) => {
        try {
            const { user, body: { password } } = req;

            await passwordService.compare(user.password, password);

            const tokenPair = jwtService.generateTokenPair();

            await OAuth.create({ ...tokenPair, user: user._id });

            res.json({ ...tokenPair, user: userNormalizator(user) });
        } catch (e) {
            next(e);
        }
    },

    forgotPassword: async (req, res, next) => {
        try {
            const { user, body: { email } } = req;

            const actionToken = jwtService.generateActionToken();

            await emailService.sendMail(
                email,
                emailActionEnum.FORGOT,
                { userName: user.name, actionToken: actionToken.action_token }
            );

            await OAuthAction.create({ ...actionToken, user: user._id });

            res.json({ ...actionToken, user: userNormalizator(user) });
        } catch (e) {
            next(e);
        }
    },

    changePassword: async (req, res, next) => {
        try {
            const { action_token } = req.body;

            const { user: { _id }, body: { password } } = req;

            const hashedPassword = await passwordService.hash(password);
            await User.findByIdAndUpdate({ _id }, { password: hashedPassword });

            await OAuthAction.deleteOne({ action_token });
            await OAuth.deleteMany({ _id });

            res.status(200);
        } catch (e) {
            next(e);
        }
    },

    logoutUser: async (req, res, next) => {
        try {
            const access_token = req.get('Authorization');

            await OAuth.deleteOne({ access_token });

            res.json('User is logout');
        } catch (e) {
            next(e);
        }
    },

    refresh: async (req, res, next) => {
        try {
            const refresh_token = req.get('Authorization');
            const user = req.loginUser;

            await OAuth.deleteOne({ refresh_token });

            const tokenPair = jwtService.generateTokenPair();

            await OAuth.create({ ...tokenPair, user: user._id });

            res.json({ ...tokenPair, user: userNormalizator(user) });
        } catch (e) {
            next(e);
        }
    }

};