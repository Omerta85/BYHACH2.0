const { s3Service, pubService } = require('../services');
const { Pub, User } = require('../database');
const { PUBS } = require('../config/constants');
const { userUtil } = require('../utils');

module.exports = {

    getAllSortedPubs: async (req, res, next) => {
        try {
            const pubs = await pubService.getAll(req.query);

            res.json(pubs);
        } catch (e) {
            next(e);
        }
    },

    getAllPubs: async (req, res, next) => {
        try {
            const { page } = req.query;
            const limit = 12;
            const startIndex = (Number(page) - 1) * limit;
            const total = await Pub.countDocuments({});

            const pubs = await Pub.find().sort({ _id: -1 }).limit(limit).skip(startIndex)
                .lean();

            res.status(200).json({
                data: pubs,
                currentPage: Number(page),
                numberOfPages: Math.ceil(total / limit)
            });
        } catch (e) {
            next(e);
        }
    },

    getPubById: async (req, res, next) => {
        try {
            const { pub_id } = req.params;

            const returnPub = await Pub.findById(pub_id).lean();
            res.json(returnPub);
        } catch (e) {
            next(e);
        }
    },

    createPub: async (req, res, next) => {
        try {
            let createdPub = await Pub.create({ ...req.body });

            if (req.files && req.files.avatar) {
                const s3Response = await s3Service.uploadFile(req.files.avatar, PUBS, createdPub._id);
                createdPub = await Pub.findByIdAndUpdate(
                    createdPub._id,
                    { avatar: s3Response.Location },
                    { new: true }
                );
            }

            const pubToReturn = userUtil.userNormalizator(createdPub.toObject());
            res.status(201).json(pubToReturn);
        } catch (e) {
            next(e);
        }
    },

    updatePub: async (req, res, next) => {
        try {
            const {
                body: {
                    name, address, contact, tags, order, description, schedule
                },
                params: { pub_id }
            } = req;

            const avatarPub = await Pub.findById({ _id: pub_id });

            await Pub.findByIdAndUpdate(
                { _id: pub_id },
                {
                    name, address, contact, tags, order, description, schedule
                },
                { new: true }
            );

            if (req.files && req.files.avatar) {
                if (avatarPub.avatar) {
                    await s3Service.deleteFile(avatarPub.avatar);
                }

                const s3Response = await s3Service.uploadFile(req.files.avatar, PUBS, pub_id);
                await Pub.findByIdAndUpdate(
                    pub_id,
                    { avatar: s3Response.Location },
                    { new: true }
                );
            }

            const pubs = await pubService.getAll(req.query);

            res.status(201).json(pubs);
        } catch (e) {
            next(e);
        }
    },

    deletePub: async (req, res, next) => {
        try {
            const {
                pub,
                params: { pub_id }
            } = req;

            if (pub.avatar) {
                await s3Service.deleteFile(pub.avatar);
            }

            await Pub.deleteOne({ _id: pub_id });

            const pubs = await pubService.getAll(req.query);

            res.json(pubs);
        } catch (e) {
            next(e);
        }
    },

    pubActivated: async (req, res, next) => {
        try {
            const { pub_id } = req.params;

            const pub = await Pub.findById(pub_id);
            pub.isActivated = true;

            const updatedPub = await Pub.findByIdAndUpdate(pub_id, pub, { new: true });

            res.json(updatedPub);
        } catch (e) {
            next(e);
        }
    },

    createReview: async (req, res, next) => {
        try {
            const {
                rating, comment, pub_id, user_id, user_name
            } = req.body;

            const review = {
                user: user_id,
                name: user_name,
                rating: Number(rating),
                comment,
            };

            const pub = await Pub.findById(pub_id);

            const isReviewed = pub.reviews.find(
                (rev) => rev.user.toString() === user_id.toString()
            );

            if (isReviewed) {
                pub.reviews.forEach((rev) => {
                    // eslint-disable-next-line no-unused-expressions,no-sequences
                    if (rev.user.toString() === user_id.toString()) (rev.rating = rating), (rev.comment = comment);
                });
            } else {
                pub.reviews.push(review);
                pub.numOfReviews = pub.reviews.length;
            }

            let avg = 0;

            pub.reviews.forEach((rev) => {
                avg += rev.rating;
            });

            pub.ratings = avg / pub.reviews.length;

            await pub.save({ validateBeforeSave: false });

            res.status(200).json({
                success: true,
            });
        } catch (e) {
            next(e);
        }
    },

    getReviews: async (req, res, next) => {
        try {
            const { pub_id } = req.params;

            const pub = await Pub.findById(pub_id);

            res.status(200).json({
                success: true,
                reviews: pub.reviews,
            });
        } catch (e) {
            next(e);
        }
    },

    deleteReview: async (req, res, next) => {
        try {
            const { pub_id, review_id } = req.params;

            const pub = await Pub.findById(pub_id);

            const reviews = pub.reviews.filter(
                (rev) => rev._id.toString() !== review_id.toString()
            );

            let avg = 0;

            reviews.forEach((rev) => {
                avg += rev.rating;
            });

            let ratings = 0;

            if (reviews.length === 0) {
                ratings = 0;
            } else {
                ratings = avg / reviews.length;
            }

            const numOfReviews = reviews.length;

            await Pub.findByIdAndUpdate(
                pub_id,
                {
                    reviews,
                    ratings,
                    numOfReviews,
                },
                {
                    new: true,
                    runValidators: true,
                    useFindAndModify: false,
                }
            );

            res.status(200).json({
                success: true,
            });
        } catch (e) {
            next(e);
        }
    },

    createNews: async (req, res, next) => {
        try {
            const {
                body: { news_text, news_select, news_title },
                params: { pub_id, user_id }
            } = req;

            const user = await User.findById(user_id);

            const singleNews = {
                user: user_id,
                name: user.name,
                title: news_title,
                text: news_text,
                category: news_select
            };

            const pub = await Pub.findById(pub_id);

            pub.news.push(singleNews);
            pub.numOfNews = pub.news.length;

            const createdNews = pub.news[pub.news.length - 1];

            if (req.files && req.files.avatar) {
                const s3Response = await s3Service.uploadFile(req.files.avatar, PUBS, createdNews._id);

                const objIndex = pub.news.findIndex(((obj) => obj._id === createdNews._id));

                pub.news[objIndex].avatar = s3Response.Location;
            }

            await pub.save({ validateBeforeSave: false });

            res.status(200).json({
                success: true,
            });
        } catch (e) {
            next(e);
        }
    },

    getNews: async (req, res, next) => {
        try {
            const { pub_id } = req.params;

            const pub = await Pub.findById(pub_id);

            res.status(200).json({
                success: true,
                news: pub.news,
            });
        } catch (e) {
            next(e);
        }
    },

    deleteNews: async (req, res, next) => {
        try {
            const { pub_id, news_id } = req.params;

            const pub = await Pub.findById(pub_id);

            const news = pub.news.filter(
                (rev) => {
                    if (rev.avatar) {
                        s3Service.deleteFile(pub.avatar);
                    }

                    return rev._id.toString() !== news_id.toString();
                }
            );

            const numOfNews = news.length;

            const newPub = await Pub.findByIdAndUpdate(
                pub_id,
                {
                    news,
                    numOfNews,
                },
                {
                    new: true,
                    // runValidators: true,
                    useFindAndModify: false,
                }
            );

            res.status(200).json(newPub);
        } catch (e) {
            next(e);
        }
    },
};