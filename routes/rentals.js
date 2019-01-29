const express = require('express');
const mongoose = require('mongoose');
const Fawn = require('fawn');
const { Rental, validate } = require('../models/rental.model');
const { Movie } = require('../models/movie.model');
const { Customer } = require('../models/customer.model');

Fawn.init(mongoose); // allow task transaction

const router = express.Router();

router.get('/', async (req, res) => {
    const rentals = await Rental.find().sort('-dateOut');
    if(!rentals || rentals.length < 1) return res.status(404).send('no rentals to display !');

    res.send(rentals);
});

router.post('/', async (req, res) => {
    const err = validate(req.body);
    if(err) return res.status(400).send(err);

    const c = await Customer.findById(req.body.customerId);
    if(!c) return res.status(404).send('customer with selected id doesn\'t exist');

    const m = await Movie.findById(req.body.movieId);
    if(!m) return res.status(404).send('movie with selected id doesn\'t exist');

    if(m.numberInStock == 0) return res.status(400).send('movie not in stock !');

    const r = new Rental({ 
       customer:{
           _id: req.body.customerId,
           name: c.name,
           phone: c.phone,
           isGold: c.isGold
       },
       movie:{
           _id: req.body.movieId,
           title: m.title,
           dailyRentalRate: m.dailyRentalRate
       }
    });
    // r.save().then((_r) => {
    //     m.numberInStock--;
    //     m.save().then(() => res.send(_r))
    // });

    try {
        new Fawn.Task()
        .save('rentals', r)
        .update('movies', {_id: m._id}, {
            $inc: { numberInStock: -1 }
        })
        .run();

        res.send(r);
    } catch (ex) {
        res.status(500).send(ex.message);
    }
});

module.exports = router;