const User = require('../models/userModel');
const factory = require('./handlerFactory');

// @des Get list of users
// @route GET /api/v1/users
// @access Private
exports.getUsers = factory.getAll(User);

// @des Get specific user by Id
// @route GET /api/v1/users/:id
// @access Public
exports.getUser = factory.getOne(User);

// @des Create user
// @route POST /api/v1/users
// @access Private
exports.createUser = factory.createOne(User);

// @des update specific user by Id
// @route PUT /api/v1/users/:id
// @access Private
exports.updateUser = factory.updateOne(User);

// @des delete specific user by Id
// @route DELETE /api/v1/users/:id
// @access Private
exports.deleteUser = factory.deleteOne(User);
