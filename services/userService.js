const asyncHandler = require('express-async-handler');
const bcrypt = require('bcryptjs');
const ApiError = require('../utlis/apiError');

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
exports.updateUser = asyncHandler(async (req, res, next) => {
  const document = await User.findByIdAndUpdate(
    req.params.id,
    {
      name: req.body.name,
      slug: req.body.slug,
      email: req.body.email,
      phone: req.body.phone,
      profileImg: req.body.profileImg,
      role: req.body.role,
    },
    {
      new: true,
    }
  );
  if (!document) {
    return next(new ApiError(`No document for this id ${req.params.id}`, 404));
  }
  res.status(200).json({ data: document });
});

exports.changeUserPassword = asyncHandler(async (req, res, next) => {
  const document = await User.findByIdAndUpdate(
    req.params.id,
    {
      password: await bcrypt.hash(req.body.password, 12),
    },
    {
      new: true,
    }
  );
  if (!document) {
    return next(new ApiError(`No document for this id ${req.params.id}`, 404));
  }
  res.status(200).json({ data: document });
});

// @des delete specific user by Id
// @route DELETE /api/v1/users/:id
// @access Private
exports.deleteUser = factory.deleteOne(User);
