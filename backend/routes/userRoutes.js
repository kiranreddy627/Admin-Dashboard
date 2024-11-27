const express = require('express');
const router = express.Router();
const userController = require('../controllers/userController');
const protect = require('../authMiddleware');

const safe = protect.protect
// router.use(safe);
// User routes

router.get('/getUsers', userController.getUsers);
router.get('/getUser/:id', userController.getUserById);
router.post('/createUser', userController.createUser);
router.put('/updateUser/:id', userController.updateUser);
router.delete('/deleteUser/:id', userController.deleteUser);

module.exports = router;
