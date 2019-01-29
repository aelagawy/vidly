const express = require('express');
const { User, validateUser } = require('../models/user.model');
const _ = require('lodash');
const bcrypt = require('bcryptjs');
const auth = require('../middleware/auth');

const router = express.Router();

router.get('/me', auth, async(req, res) => {
    let u = await User.findById(req.user._id).select('-password'); // exclude password property
    res.send(u);
});

router.post('/', async (req, res) => {
    let err = validateUser(req.body);
    if(err) return res.status(400).send(err);

    let u = await User.findOne({ email: req.body.email });
    if(u) return res.status(400).send('User already registered.');

    u = new User(_.pick(req.body, ['name', 'email', 'password']));

    const salt = await bcrypt.genSalt(11);
    u.password = await bcrypt.hash(u.password, salt);

    u.save().then(() => {
        res.header('x-auth-token',  u.generateAuthToken()).send(_.pick(u, ['_id', 'name', 'email']));
    });
});

module.exports = router;