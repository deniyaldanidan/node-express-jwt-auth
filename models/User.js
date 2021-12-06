const mongoose = require('mongoose');
const {isEmail} = require('validator')
const bcrypt = require('bcrypt')

const UserSchema = new mongoose.Schema({
    email: {
        type: String,
        required: [true, 'please enter an email'],
        unique: true,
        lowercase: true,
        validate: [isEmail, 'please enter a valid email']
    },
    password: {
        type: String,
        required: [true, 'please enter an password'],
        minlength: [6, 'password must be atleast 6 characters']
    }
})

// fire a function after doc saved to db
UserSchema.post('save', function(doc, next){
    console.log('new user was created and saved', doc)
    next();
})

// fire a function before doc saved to db
UserSchema.pre('save', async function(next){
    const salt = await bcrypt.genSalt();
    this.password = await bcrypt.hash(this.password, salt)
    next()
})

// Custom function
// UserSchema.statics.login

const User = mongoose.model('user', UserSchema) //collection name will be users
module.exports = User;