const Joi = require('joi');
const PasswordComplexity = require('joi-password-complexity');
const mongoose = require('mongoose');
const jwt = require('jsonwebtoken');
const config = require('config');
 
const complexityOptions = {
  min: 5,
  max: 1024,
  lowerCase: 0,
  upperCase: 0,
  numeric: 0,
  symbol: 0,
  requirementCount: 2,
}

const userSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
        min: 5,
        max: 50
    },
    email:{
        type: String,
        required: true,
        min: 5,
        max: 255,
        unique: true
    },
    password:{
        type: String,
        required: true,
        min: 5,
        max: 1024
    },
    isAdmin: {
        type: Boolean,
        default: false
    }
});

userSchema.methods.generateAuthToken = function(){
    return jwt.sign({ _id: this._id, isAdmin: this.isAdmin }, config.get('jwtPrivateKey'));
}

const User = mongoose.model('User', userSchema);

function validateUser(u){
    const schema = Joi.object().keys({
        name: Joi.string().min(5).max(50).required(),
        email: Joi.string().min(5).max(255).required().email(),
        password: Joi.string().required(),
        isAdmin: Joi.boolean()
    });

    let { error } = Joi.validate(u, schema);
    if(!error)
        Joi.validate(u.password, new PasswordComplexity(complexityOptions), (err, value) => {
            error = err;
        });
    return error ? error.details[0].message : null;
}

function validateAuth(u){
    const schema = Joi.object().keys({
        email: Joi.string().min(5).max(255).required().email(),
        password: Joi.string().required()
    });

    let { error } = Joi.validate(u, schema);
    if(!error)
        Joi.validate(u.password, new PasswordComplexity(complexityOptions), (err, value) => {
            error = err;
        });
    return error ? error.details[0].message : null;
}

module.exports.User = User;
module.exports.validateUser = validateUser;
module.exports.validateAuth = validateAuth;

// Information Expert Principle