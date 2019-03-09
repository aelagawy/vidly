//@ts-check
const express = require('express');
const _ = require('lodash');
const bcrypt = require('bcryptjs');
const { User, validateAuth } = require('../models/user.model');

const router = express.Router();

router.post('/', async (req, res) => {
    const err = validateAuth(req.body);
    if(err) return res.status(400).send(err);

    const u = await User.findOne({ email: req.body.email });
    if(!u) return res.status(400).send('Invalid email or password.');

    const validPassword = await bcrypt.compare(req.body.password, u.password);
    if(!validPassword) return res.status(400).send('Invalid email or password.');

    res.header('x-auth-token', u.generateAuthToken()).send(true); // redirect
});

module.exports = router;