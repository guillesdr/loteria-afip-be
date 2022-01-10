// Load modules
const taskModel = require('../models/taskModels');
const { validationResult } = require('express-validator');

// Index page controller
function index_page_get (request, response) {
  taskModel.getTasks((queryResult) => {
    console.log(queryResult);
    response.render('index', { tasks: queryResult });
  });
};

// About page controller
function about_page_get (request, response) {
	response.render('about');
};

// Create task page controllers
// GET
function create_page_get (request, response) {
  response.render('create', { errors: {} });
};
// POST
function create_page_post (request, response) {
  const errors = validationResult(request);
  if (!errors.isEmpty()) {
    return response.render('create', { errors: errors.mapped() });
  }
  const task = request.body.Task;
  const status = 'In progress';
  taskModel.createTask(task, status, (result) => {
    console.log(result);
    response.redirect('/');
  });
};

// Delete task page controllers
// GET
function delete_page_get (request, response) {
  const id = request.params.id;
  taskModel.getTask(id, (result) => {
    console.log(result);
    response.render('delete', { task: result });
  });
};
// POST
function delete_page_post (request, response) {
  const id = request.params.id;
  taskModel.deleteTask(id, () => {
    response.redirect('/');
  });
};

// Update task page controllers
// GET
function update_page_get (request, response) {
  const id = request.params.id;
  taskModel.getTask(id, (result) => {
    response.render('update', { task: result, errors: {} });
  });
};
// POST
function update_page_post (request, response) {
  const errors = validationResult(request);
  if (!errors.isEmpty()) {
    return response.render('update', { task: request.body, errors: errors.mapped() });
  }
  const task = request.body.Task;
  const status = request.body.Status;
  const id = request.params.id;
  taskModel.updateTask(task, status, id, () => {
    response.redirect('/');
  });
};

// Export controllers
module.exports = {
  index_page_get,
  about_page_get,
  create_page_get,
  create_page_post,
  delete_page_get,
  delete_page_post,
  update_page_get,
  update_page_post
};
