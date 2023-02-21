const express = require('express');
const {
  getUsers,
  createUser,
  getUser,
  updateUser,
  deleteUser,
  changeUserPassword,
  getLoggedUserData,
} = require('../services/userService');

const {
  createUserValidator,
  getUserValidator,
  deleteUserValidator,
  changeUserPasswordValidator,
} = require('../utils/validators/userValidator');

const authService = require('../services/authService');
const { route } = require('./authRoute');

const router = express.Router();
router.put(
  '/changePassword/:id',
  changeUserPasswordValidator,
  changeUserPassword
);

router.get('/getMe', authService.protect, getLoggedUserData, getUser);
router
  .route('/')
  .get(authService.protect, authService.allowedTo('admin', 'manager'), getUsers)
  .post(
    authService.protect,
    authService.allowedTo('admin'),
    createUserValidator,
    createUser
  );
router
  .route('/:id')
  .get(
    authService.protect,
    authService.allowedTo('admin'),
    getUserValidator,
    getUser
  )
  .put(
    authService.protect,
    authService.allowedTo('admin'),
    getUserValidator,
    updateUser
  )
  .delete(
    authService.protect,
    authService.allowedTo('admin'),
    deleteUserValidator,
    deleteUser
  );

module.exports = router;
