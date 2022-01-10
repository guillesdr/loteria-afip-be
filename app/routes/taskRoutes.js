// Load modules
const express = require('express');
const taskController = require('../controllers/taskControllers');
const taskValidator = require('../validation/taskValidator');

//  Create route handler
const router = express.Router();

// GET Index Page
router.get('/', taskController.index_page_get);
// GET About Page
router.get('/about', taskController.about_page_get);
// GET/POST Create page
router.get('/task/create', taskController.create_page_get);
router.post('/task/create', taskValidator.validateTask, taskController.create_page_post);
// GET/POST Delete Page
router.get('/task/delete/:id', taskController.delete_page_get);
router.post('/task/delete/:id', taskController.delete_page_post);
// GET/POST Update Page
router.get('/task/update/:id', taskController.update_page_get);
router.post('/task/update/:id', taskValidator.validateTask, taskController.update_page_post);

// Export router
module.exports = router;
