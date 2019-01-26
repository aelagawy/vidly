const mongoose = require('mongoose');
const Joi = require('joi');

const customerSchema = mongoose.Schema({
    name: {
       type: String,
       required: true
    },
    phone: {
        type: Number,
        required: true
    },
    isGold: {
        type: Boolean,
        default: false
    }
});

const Customer = mongoose.model('Customer', customerSchema);

function validateCustomer(c){
    const schema = Joi.object().keys({
        name: Joi.string().min(3).required(),
        phone: Joi.number().required(),
        isGold: Joi.boolean().default(false)
    });

    const { error } = Joi.validate(c, schema);
    return error ? error.details[0].message : null;
}

module.exports.Customer = Customer;
module.exports.validateCustomer = validateCustomer;