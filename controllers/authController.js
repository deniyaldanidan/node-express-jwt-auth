const User = require("../models/User");

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

    return error
}


module.exports.signup_get = (req, res)=>{
    res.render("signup")
}

module.exports.signup_post = async(req, res)=>{
    const {email, password} = req.body;
    
    try {
        const user = await User.create({email, password})
        res.status(201).json(user)
    } catch (error) {
        
        res.status(400).json(handleErrors(error))
    }
}

module.exports.login_get = (req, res)=>{
    res.render('login')
}

module.exports.login_post = async(req, res)=>{
    console.log(req.body)
    res.send("login is successful")
}

