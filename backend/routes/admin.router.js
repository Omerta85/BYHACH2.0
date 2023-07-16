const router = require('express').Router();

const { adminController, userController, pubController } = require('../controllers');

router.get('/pubs', pubController.getAllPubs);
router.get('/pubs/all', adminController.getAllPubs);
router.get('/users', adminController.getUsersByAdmin);
router.get('/pubs/filter', adminController.getNotActivatedPubs);
router.get('/users/search', userController.getUsersBySearch);
router.get('/pubs/search', adminController.getPubsByOnlySearch);

router.patch('/activate/:pub_id', pubController.pubActivated);

module.exports = router;