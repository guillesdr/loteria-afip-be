// Load modules
const database = require('../database/database');

// Get all tasks from database
const getTasks = (callback) => {
  sql = `SELECT * FROM Tasks`;
  database.appDatabase.all(sql, [], (error, rows) => {
    if (error) {
      callback(error);
    }
    callback(rows);
  });
};

// Create new task
const createTask = (task, status, callback) => {
  const sql = `INSERT INTO Tasks (Task, Status) VALUES (?, ?)`;
  database.appDatabase.run(sql, [task, status], (error, row) => {
    if (error) {
      callback(error.message);
    }
    const successMessage = "The task was entered successfully."
    callback(successMessage);
  });
};

// Get task
const getTask = (id, callback) => {
  const sql = `SELECT * FROM Tasks WHERE Task_Id = ?`;
  database.appDatabase.get(sql, [id], (error, row) => {
    if (error) {
      callback(error.message);
    }
    callback (row);
  });
};

// Delete task  
const deleteTask = (id, callback) => {
  const sql = `DELETE FROM Tasks WHERE Task_Id = ?`;
  database.appDatabase.run(sql, [id], (error, row) => {
    if (error) {
      callback(error.message);
    }
    const successMessage = "The task was successfully deleted."
    callback(successMessage);
  });
};

// Update task  
const updateTask = (task, status, id, callback) => {
  let sql = `UPDATE Tasks SET Task = ?, Status = ? WHERE Task_ID = ?`;
  database.appDatabase.run(sql, [task, status, id], (error, row) => {
    if (error) {
      callback(error.message);
    }
    const successMessage = "The task was successfully updated."
    callback(successMessage);
  });
};

// Export models
module.exports = {
  getTasks,
  createTask,
  getTask,
  deleteTask,
  updateTask
};


