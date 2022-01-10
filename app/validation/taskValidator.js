// Load function check
const { check } = require('express-validator');

// Export function validateTask
exports.validateTask = [
  check('Task')
  .isLength({ min:3, max: 30 })
  .withMessage("The task must have between 3 and 30 characters")
];