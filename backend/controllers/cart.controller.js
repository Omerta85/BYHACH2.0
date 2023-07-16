const { User, Pub } = require('../database');

module.exports = {

    addToCart: async (req, res, next) => {
        try {
            const { user_id, pub_id } = req.body;

            const user = await User.findById(user_id);
            const pub = await Pub.findById(pub_id);
            const { cart } = user;

            // eslint-disable-next-line no-unused-expressions
            cart.find(
                (item) => item._id.toString() === pub_id.toString()
            ) ? console.log('Error') : user.cart.push(pub);

            await User.findOneAndUpdate({ _id: user_id }, user, { new: true });

            return res.status(200).json('Added to cart');
        } catch (err) {
            next(err);
        }
    },

    removeFromCart: async (req, res, next) => {
        try {
            const { user_id, pub_id } = req.params;

            const user = await User.findById(user_id);

            const cart = user.cart.filter(
                (rev) => rev._id.toString() !== pub_id.toString()
            );

            const updatedUser = await User.findByIdAndUpdate({ _id: user_id }, { cart }, { new: true });

            res.status(200).json(updatedUser);
        } catch (err) {
            next(err);
        }
    },
};