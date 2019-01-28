const express = require('express');
const { Rental, validateRental } = require('../models/rental.model');
const Movie = require('../models/movie.model');
const Customer = require('../models/customer.model');

const router = express.Router();

router.get('/', async (req, res) => {
    const rs = await Rental.find();
    if(!rs || rs.length < 1) return res.status(404).send('no rentals to display !');
    res.send(rs);
});

router.post('/', async (req, res) => {
    const err = validateRental(req.body);
    if(err) return res.status(400).send(err);

    let c,m;
    try{
        c = await Customer.findById(req.body.customerId);
        if(!c) return res.status(404).send('customer with selected id doesn\'t exist');

        m = await Movie.findById(req.body.movieId);
        if(!m) return res.status(404).send('movie with selected id doesn\'t exist');
    }
    catch (ex){
        console.log(ex);
        return res.status(500).send(ex);
    }
    

    
    let r = new Rental({ 
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
       },
       dateOut: req.body.dateOut,
       dateReturned: req.body.dateReturned,
       rentalFee: req.body.rentalFee
    });
    r.save().then((_r) => res.send(_r));
});

module.exports = router;