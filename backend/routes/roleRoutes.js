const express = require('express');
const router = express.Router();
const roleController = require('../controllers/roleController');

// Role routes
router.get('/get', roleController.getRoles);
router.get('/getbyid/:id', roleController.getRoleById);
router.post('/edit', roleController.createOrUpdateRole);
router.delete('/delete/:id', roleController.deleteRole);

module.exports = router;
