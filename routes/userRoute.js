const express = require('express');
const {
  getUsers,
  createUser,
  getUser,
  updateUser,
  deleteUser,
  changeUserPassword,
} = require('../services/userService');

const {
  createUserValidator,
  getUserValidator,
  deleteUserValidator,
  changeUserPasswordValidator,
} = require('../utlis/validators/userValidator');

const router = express.Router();
router.put(
  '/changePassword/:id',
  changeUserPasswordValidator,
  changeUserPassword
);

router.route('/').get(getUsers).post(createUserValidator, createUser);
router
  .route('/:id')
  .get(getUserValidator, getUser)
  .put(getUserValidator, updateUser)
  .delete(deleteUserValidator, deleteUser);

module.exports = router;
