const EmailTemplates = require('email-templates');
const nodemailer = require('nodemailer');
const path = require('path');
const { constants, variables } = require('../config');
const ErrorHandler = require('../errors/ErrorHandler');
const allTemplate = require('../email-templates');

const templateParser = new EmailTemplates({
    views: {
        root: path.join(process.cwd(), 'email-templates')
    }
});

const transporter = nodemailer.createTransport({
    service: constants.GMAIL,
    auth: {
        user: variables.NO_REPLY_EMAIL,
        pass: variables.NO_REPLY_PASSWORD
    }
});

const sendMail = async (userMail, emailAction, context = {}) => {
    const templateInfo = allTemplate[emailAction];

    if (!templateInfo) {
        throw new ErrorHandler(500, 'Wrong template name');
    }

    const { templateName, subject } = templateInfo;
    context.frontendURL = variables.FRONTEND_URL;

    const html = await templateParser.render(templateName, context);

    return transporter.sendMail({
        from: 'No reply',
        to: userMail,
        subject,
        html
    });
};

module.exports = { sendMail };