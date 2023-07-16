const {emailActionEnum} = require("../config");

module.exports = {
    [emailActionEnum.CREATE]: {
        templateName: 'create',
        subject: 'Привіт ти створив акаунт'
    },
    [emailActionEnum.FORGOT]: {
        templateName: 'forgot',
        subject: 'Зміни свій пароль'
    },
}