const router = require('express').Router();

const { pubController } = require('../controllers');
const { fileMiddleware, pubMiddleware } = require('../middlewares');

router.get('/', pubController.getAllSortedPubs);
router.get('/search', pubController.getAllSortedPubs);
router.get('/:pub_id', pubController.getPubById);
router.get('/reviews/:pub_id', pubController.getReviews);
router.get('/news/:pub_id', pubController.getNews);

router.post('/',
    fileMiddleware.checkAvatar,
    pubController.createPub);
router.post('/reviews', pubController.createReview);
router.post('/news/:pub_id/:user_id', pubController.createNews);

router.patch('/:pub_id', pubController.updatePub);

router.delete('/:pub_id',
    pubMiddleware.getPubByDynamicParam('pub_id', 'params', '_id'),
    pubMiddleware.isPubNotPresent,
    pubController.deletePub);
router.delete('/reviews/:pub_id/:review_id', pubController.deleteReview);
router.delete('/news/:pub_id/:news_id', pubController.deleteNews);

module.exports = router;