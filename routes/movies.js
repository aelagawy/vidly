const express = require('express');
const { Movie, validateMovie } = require('../models/movie.model');

const router = express.Router();

router.get('/', (req, res) => {
    Movie.find().then((ms) => { 
        if(!ms || ms.length < 1) return res.status(404).send('no movies to display !');
        res.send(ms);
    });
});

router.get('/:id', (req, res) => {
    Movie.findById(req.params.id).then((m) => { 
        if(!m) return res.status(404).send('movie with selected id doesn\'t exist');
        res.send(m);
    });
});

router.post('/', (req, res) => {
    let e = validateMovie(req.body);
    if(e) return res.status(400).send(e);

    let m = new Movie({ 
        title: req.body.title,
        genre: req.body.genre,
        numberInStock: req.body.numberInStock,
        dailyRentalRate: req.body.dailyRentalRate
    });
    m.save().then((_m) => res.send(_m));
});

router.put('/:id', (req, res) => {
    let m = Movie.findById(req.params.id);
    if(!m) return res.status(404).send('movie with selected id doesn\'t exist');

    let err = validateMovie(req.body);
    if(err) return res.status(400).send(err);

    m.updateOne({ 
        title: req.body.title,
        genre: req.body.genre,
        numberInStock: req.body.numberInStock,
        dailyRentalRate: req.body.dailyRentalRate
    })
    .then((g) => res.send(g));
});

router.delete('/:id', (req, res) => {
    let m = Movie.findById(req.params.id);
    if(!m) return res.status(404).send('movie with selected id doesn\'t exist');

    m.remove().then((_m) => res.status(200).send('movie deleted successfully',_m));
});

module.exports = router;