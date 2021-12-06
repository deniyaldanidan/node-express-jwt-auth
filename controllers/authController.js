const User = require("../models/User");
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt')

// handle erorrs
const handleErrors = (err)=>{
    // console.log(err.message, err.code);
    // console.log(err)
    let error = {email: '', password: ''};

    // validation error
    if (err.message.includes('user validation failed')){
        Object.values(err.errors).forEach(({path, message})=>{
            error[path] = message
        })
    }

    if (err.code === 11000) {
        error.email = "Email is already registered try logging in"
    }

    return {errors: error}
}

const maxAge = 1000*60*60*24*1

const createToken = (id)=>{
    return jwt.sign({id}, process.env.SECRET_TOKEN, {
        expiresIn: maxAge
    })
}


module.exports.signup_get = (req, res)=>{
    res.render("signup")
}

module.exports.signup_post = async(req, res)=>{
    const {email, password} = req.body;
    
    try {
        const user = await User.create({email, password})
        const token = createToken(user._id)
        console.log(`token was created ${token}`);
        res.cookie('jwt', token, {maxAge: maxAge, httpOnly: true})
        res.status(201).json({user: user._id})
    } catch (error) {
        
        res.status(400).json(handleErrors(error))
    }
}

module.exports.login_get = (req, res)=>{
    res.render('login')
}

module.exports.login_post = async(req, res)=>{
    const {email, password} = req.body
    if (!email || !password) {
        return res.status(400).json({error: "Both Email and password fields must be filled out"})
    }

    const curr_user = await User.findOne({email: email}).exec()
    // console.log(curr_user)
    if (!curr_user) {
        return res.status(400).json({error: "User not found try signin"})
    }

    const match = await bcrypt.compare(password, curr_user.password)
    // console.log(match)

    if (!match) {
        return res.status(400).json({error: "Password is incorrect"})
    }

    const token = createToken(curr_user._id)
    res.cookie('jwt', token, {maxAge: maxAge, httpOnly:true})
    console.log("New User is logged in")
    res.status(200).json({success: "login is successfull"})
}

module.exports.logout_get = async(req, res)=>{
    res.cookie("jwt", "", {maxAge: 1});
    res.redirect("/")
}