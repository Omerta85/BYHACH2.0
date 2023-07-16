const Joi = require('joi');
const { PASSWORD_REGEX, EMAIL_REGEX, CURRENT_YEAR } = require('../config/constants');
const userRoleEnum = require('../config/database-tables.enum');

const createUserValidator = Joi.object({
    name: Joi
        .string()
        .alphanum()
        .min(2)
        .max(30)
        .trim()
        .required(),
    password: Joi.string().regex(PASSWORD_REGEX).required(),
    email: Joi.string().regex(EMAIL_REGEX).required(),
    born_year: Joi.number().min(CURRENT_YEAR - 120).max(CURRENT_YEAR - 10).required(),
    role: Joi.string().allow(...Object.values(userRoleEnum))
});

const updateUserValidator = Joi.object({
    name: Joi.string().alphanum().min(2).max(30),
    email: Joi.string().regex(EMAIL_REGEX),
    born_year: Joi.number().min(CURRENT_YEAR - 120).max(CURRENT_YEAR - 10)
});

module.exports = { createUserValidator, updateUserValidator };