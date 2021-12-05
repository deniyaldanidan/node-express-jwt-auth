const express = require('express');
const router = express.Router();
const {
    signup_get,
    signup_post,
    login_get,
    login_post
} = require('../controllers/authController')

router.route('/signup')
    .get(signup_get)
    .post(signup_post)

router.route('/login')
    .get(login_get)
    .post(login_post)

router.get('/logout')

module.exports = router;