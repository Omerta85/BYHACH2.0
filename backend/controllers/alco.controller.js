const { User } = require('../database');

module.exports = {
    addToOffer: async (req, res, next) => {
        try {
            const {
                name, date, time, goal, phone_number, sex, quantity, telegram, paid, sum
            } = req.body;

            const { user_id } = req.params;

            const user = await User.findById(user_id);

            const offerItem = {
                name,
                date,
                time,
                goal,
                phone_number,
                sex,
                quantity,
                telegram,
                paid,
                sum,
                img: user.avatar,
                creator: user.name
            };

            user.offer.push(offerItem);

            await User.findOneAndUpdate({ _id: user_id }, user, { new: true });

            return res.status(200).json('Added to offer');
        } catch (err) {
            next(err);
        }
    },

    removeFromOffer: async (req, res, next) => {
        try {
            const { user_id, item_id } = req.params;

            const user = await User.findById(user_id);

            const offer = user.offer.filter(
                (rev) => rev._id.toString() !== item_id.toString()
            );

            await User.findByIdAndUpdate({ _id: user_id }, { offer }, { new: true });

            const users = await User.find().lean();

            res.status(200).json(users);
        } catch (err) {
            next(err);
        }
    },
};