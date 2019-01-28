const express = require('express');
const { Movie, validateMovie } = require('../models/movie.model');
const { Genre } = require('../models/genre.model');

const router = express.Router();

router.get('/', async (req, res) => {
    const ms = await Movie.find();
    if(!ms || ms.length < 1) return res.status(404).send('no movies to display !');
    res.send(ms);
});

router.get('/:id', async (req, res) => {
    const m = await Movie.findById(req.params.id);
    if(!m) return res.status(404).send('movie with selected id doesn\'t exist');
    res.send(m);
});

router.post('/', async (req, res) => {
    const e = validateMovie(req.body);
    if(e) return res.status(400).send(e);

    const g = await Genre.findById(req.body.genreId);
    if(!g) return res.status(404).send('genre doesn\'t exist');

    let m = new Movie({ 
        title: req.body.title,
        genre: {
            _id: g._id,
            name: g.name
        },
        numberInStock: req.body.numberInStock,
        dailyRentalRate: req.body.dailyRentalRate
    });
    m.save().then((_m) => res.send(_m));
});

router.put('/:id', async (req, res) => {
    let m = await Movie.findById(req.params.id);
    if(!m) return res.status(404).send('movie with selected id doesn\'t exist');

    let err = validateMovie(req.body);
    if(err) return res.status(400).send(err);

    const g = await Genre.findById(req.body.genreId);
    if(!g) return res.status(404).send('genre doesn\'t exist');

    m.updateOne({ 
        title: req.body.title,
        genre: {
            _id: g._id,
            name: g.name
        },
        numberInStock: req.body.numberInStock,
        dailyRentalRate: req.body.dailyRentalRate
    })
    .then((_m) => res.send(_m));
});

router.delete('/:id', async (req, res) => {
    let m = await Movie.findById(req.params.id);
    if(!m) return res.status(404).send('movie with selected id doesn\'t exist');

    m.remove().then(() => res.status(200).send('movie deleted successfully'));
});

module.exports = router;