const express = require('express');
const router = express.Router();
const employeeController = require('../controllers/employeeController');

// Routes with image upload support
router.post('/', employeeController.uploadImage, employeeController.createEmployee);
router.put('/:id', employeeController.uploadImage, employeeController.updateEmployee);

// Routes without file upload
router.get('/', employeeController.getEmployees);
router.get('/:id', employeeController.getEmployeeById);
router.delete('/:id', employeeController.deleteEmployee);

module.exports = router;
