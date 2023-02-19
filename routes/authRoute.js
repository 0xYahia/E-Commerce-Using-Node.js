const express = require('express');

const {
  signupUserValidator,
  loginUserValidator,
} = require('../utlis/validators/authValidator');
const { signup, login } = require('../services/authService');

const router = express.Router();

router.route('/signup').post(signupUserValidator, signup);
router.route('/login').post(loginUserValidator, login);
// signupUserValidator
//   .route('/:id')
//   .get(getUserValidator, getUser)
//   .put(getUserValidator, updateUser)
//   .delete(deleteUserValidator, deleteUser);

module.exports = router;
