const router = require('express').Router();

const { userController, cartController, alcoController } = require('../controllers');

router.get('/', userController.getAllUsers);
router.get('/:user_id', userController.getUserById);

router.post('/', userController.createUser);
router.post('/cart', cartController.addToCart);
router.post('/offer/:user_id', alcoController.addToOffer);

router.patch('/:user_id', userController.updateUser);

router.delete('/cart/remove/:user_id/:pub_id', cartController.removeFromCart);
router.delete('/offer/remove/:user_id/:item_id', alcoController.removeFromOffer);
router.delete('/:user_id', userController.deleteUser);


module.exports = router;