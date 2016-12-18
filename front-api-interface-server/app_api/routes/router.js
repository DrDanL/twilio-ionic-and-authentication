var express = require('express');
var router = express.Router();
var passport = require('passport');

//Model schema for users
var users = require('../controllers/users');

//Authenticate user login request
router.post('/authenticate', users.authUser);

//Register user
router.post('/user', users.userCreate);

//Verify SMS code
router.post('/user/:id/verify', users.verify);

//Get user account details (secured)
router.get('/users', passport.authenticate('jwt', { session: false}), users.getUser);

//We export the router and make it usable by the front-end app.
module.exports = router;
