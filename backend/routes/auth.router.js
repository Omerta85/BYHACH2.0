const router = require('express').Router();

const { userController, authController } = require('../controllers');

const { authMiddleware, userMiddleware, fileMiddleware } = require('../middlewares');
// const { userValidator } = require('../validators');

router.post('/login',
    // authMiddleware.validateLoginUser,
    userMiddleware.getUserByDynamicParam('email'),
    authMiddleware.lastLoginationUser,
    userMiddleware.isUserNotPresent,
    authController.loginUser);

router.post('/register',
    // userMiddleware.validateUserBody(userValidator.createUserValidator),
    fileMiddleware.checkAvatar,
    userMiddleware.getUserByDynamicParam('email'),
    // userMiddleware.isUserPresent,
    userController.createUser);

router.post('/logout',
    authMiddleware.validateAccessToken,
    authController.logoutUser);

router.post('/refresh',
    authMiddleware.validateRefreshToken,
    authController.refresh);

router.post('/forgot',
    // userMiddleware.validateEmail,
    userMiddleware.getUserByDynamicParam('email'),
    userMiddleware.isUserNotPresent,
    authController.forgotPassword);

router.post('/reset',
    // userMiddleware.validateNewPassword,
    authMiddleware.validateActionToken,
    authController.changePassword);

// router.post('/root',
//     authMiddleware.validateAccessToken,
//     userMiddleware.checkUserRole(['admin']),
//     userController.);

module.exports = router;