const Joi = require('joi');
const { PASSWORD_REGEX, EMAIL_REGEX } = require('../config/constants');

const passwordSchema = Joi.string().regex(PASSWORD_REGEX).required();
const emailSchema = Joi.string().regex(EMAIL_REGEX).required();

const loginUserValidator = Joi.object({
    email: emailSchema,
    password: passwordSchema
});

const passwordValidator = Joi.object({
    password: passwordSchema
});

const emailValidator = Joi.object({
    email: emailSchema
});

module.exports = { loginUserValidator, passwordValidator, emailValidator };