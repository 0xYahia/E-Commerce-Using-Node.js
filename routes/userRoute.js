const express = require('express');
const {
  getUsers,
  createUser,
  getUser,
  updateUser,
  deleteUser,
} = require('../services/userService');

const {
  createUserValidator,
  getUserValidator,
  deleteUserValidator,
} = require('../utlis/validators/userValidator');

const router = express.Router();

router.route('/').get(getUsers).post(createUserValidator, createUser);
router
  .route('/:id')
  .get(getUserValidator, getUser)
  .put(getUserValidator, updateUser)
  .delete(deleteUserValidator, deleteUser);

module.exports = router;
