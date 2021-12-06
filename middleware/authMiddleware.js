const jwt = require('jsonwebtoken');
const User = require('../models/User');

const requireAuth = (req, res, next)=>{
    if (!req.cookies.jwt) {
        return res.redirect("/login")
    }

    jwt.verify(
        req.cookies.jwt, process.env.SECRET_TOKEN, (err, decoded)=>{
            if (err) {
                console.log(err);
                return res.redirect("/login")
            }
            console.log(decoded)
            next()
        }
    )
}

const checkUser = (req, res, next)=>{
    if (!req.cookies.jwt) {
        res.locals.curr_email = null
        return next()
    }

    jwt.verify(
        req.cookies.jwt, process.env.SECRET_TOKEN, async (err, decoded)=>{
            if (err) {
                console.log(err);
                res.locals.curr_email = null
                return next()
            }
            let curr_user = await User.findById(decoded.id);
            res.locals.curr_email = curr_user.email
            next()
        }
    )
}

module.exports = {requireAuth, checkUser}