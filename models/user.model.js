const mongoose = require('mongoose');
const Joi = require('joi');
const PasswordComplexity = require('joi-password-complexity');
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

const _userSchema = new mongoose.Schema({
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

_userSchema.methods.genAuthToken = function(){
    return jwt.sign({ _id: this._id, isAdmin: this.isAdmin }, config.get('jwtPrivateKey'));
}

module.exports.User = mongoose.model('User', _userSchema);

module.exports.validate = (user) => {
    const schema = Joi.object().keys({
        name: Joi.string().min(5).max(50).required(),
        email: Joi.string().min(5).max(255).required().email(),
        password: Joi.string().required(),
        isAdmin: Joi.boolean()
    });

    let { error } = Joi.validate(user, schema);
    if(!error)
        Joi.validate(u.password, new PasswordComplexity(complexityOptions), (err, value) => {
            error = err;
        });
    return error ? error.details[0].message : null;
}
module.exports.validateAuth = (user) => {
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

// Information Expert Principle