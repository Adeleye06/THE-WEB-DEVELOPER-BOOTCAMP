const express = require('express');
const router = express.Router();
const catchAsync = require('../utilities/catchAsync');
const passport = require("passport");
const { storeReturnTo } = require('../middleware');
const users = require('../controllers/users');


//this route renders the register form for a user
router.get('/register', users.renderRegister);

//this route does the actual logic for registering a user
router.post('/register', catchAsync(users.register));

//this route renders the login form
router.get('/login', users.renderLogin);

//this route does the actual login logic
router.post('/login', storeReturnTo, passport.authenticate('local', {failureFlash: true, failureRedirect: '/login'}), users.login);

//this route is what handles the logouts of users
router.get('/logout', users.logout);

module.exports = router;