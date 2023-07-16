const { User } = require('../database');
const { hash } = require('../services/password.service');

module.exports = (async () => {
    const user = await User.findOne();

    if (!user) {
        const defaultAdmin = {
            name: 'Admin',
            email: 'admin@email.com',
            role: 'admin',
            born_year: 1998,
            password: await hash('12345')
        };

        await User.create(defaultAdmin);
    }
});