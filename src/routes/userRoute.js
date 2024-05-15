const express = require('express')
const router = express.Router()
const auth = require('../middleware/auth')

const userController = require('../controllers/userController');

router.get('/user', userController.getUser);
router.post('/user', userController.create);
router.get('/user/:id', userController.details);
router.delete('/user/:id', userController.delete);
router.put('/user/:id', userController.update);
router.post('/login', userController.validaLogin);
// router.post('/token', userController.userToken);

module.exports = router;
