const { passwordService, s3Service, emailService } = require('../services');
const { User } = require('../database');
const { USERS } = require('../config/constants');
const { emailActionEnum } = require('../config');
const { userUtil } = require('../utils');
const { hash } = require('../services/password.service');

module.exports = {
    getAllUsers: async (req, res, next) => {
        try {
            const users = await User.find().lean();

            const allUsers = await User.findOne().lean();

            if (!allUsers) {
                const defaultAdmin = {
                    name: 'Admin',
                    email: 'admin@email.com',
                    role: 'admin',
                    born_year: 1998,
                    password: await hash('12345')
                };

                await User.create(defaultAdmin);
            }

            res.status(200).json(users);
        } catch (e) {
            next(e);
        }
    },

    createUser: async (req, res, next) => {
        try {
            const { password, name, email } = req.body;

            const hashedPassword = await passwordService.hash(password);

            let createdUser = await User.create({ ...req.body, password: hashedPassword });

            if (req.files && req.files.avatar) {
                const s3Response = await s3Service.uploadFile(req.files.avatar, USERS, createdUser._id);
                createdUser = await User.findByIdAndUpdate(
                    createdUser._id,
                    { avatar: s3Response.Location },
                    { new: true }
                );
            }

            await emailService.sendMail(
                email,
                emailActionEnum.CREATE,
                { userName: name }
            );

            const userToReturn = userUtil.userNormalizator(createdUser.toObject());
            res.status(201).json(userToReturn);
        } catch (e) {
            next(e);
        }
    },

    getUserById: async (req, res, next) => {
        try {
            const { user_id } = req.params;

            const returnUser = await User.findById(user_id).select('-password').lean();

            res.json(returnUser);
        } catch (e) {
            next(e);
        }
    },

    updateUser: async (req, res, next) => {
        try {
            const {
                body: { name, born_year, email },
                params: { user_id }
            } = req;

            const avatarUser = await User.findById({ _id: user_id });

            const newUser = await User.findByIdAndUpdate(
                { _id: user_id },
                { name, born_year, email },
                { new: true }
            );

            if (req.files && req.files.avatar) {
                if (avatarUser.avatar) {
                    await s3Service.deleteFile(avatarUser.avatar);
                }

                const s3Response = await s3Service.uploadFile(req.files.avatar, USERS, user_id);
                await User.findByIdAndUpdate(
                    user_id,
                    { avatar: s3Response.Location },
                    { new: true }
                );
            }

            res.status(201).json(newUser);
        } catch (e) {
            next(e);
        }
    },

    getUsersBySearch: async (req, res, next) => {
        try {
            const { searchQuery } = req.query;

            const name = new RegExp(searchQuery, 'i');

            const users = await User.find({ $or: [{ name }] });

            res.json({ data: users });
        } catch (e) {
            next(e);
        }
    },

    deleteUser: async (req, res, next) => {
        try {
            const {
                params: { user_id }
            } = req;

            const user = User.findById(user_id);

            if (user.avatar) {
                await s3Service.deleteFile(user.avatar);
            }

            await User.deleteOne({ _id: user_id });

            res.status('deleted');
        } catch (e) {
            next(e);
        }
    }
};