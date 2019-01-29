const express = require('express');
const { Movie, validate } = require('../models/movie.model');
const { Genre } = require('../models/genre.model');

const router = express.Router();

router.get('/', async (req, res) => {
    const movies = await Movie.find().sort('name');
    if(!movies || movies.length < 1) return res.status(404).send('no movies to display !');

    res.send(movies);
});

router.get('/:id', async (req, res) => {
    const m = await Movie.findById(req.params.id);
    if(!m) return res.status(404).send('movie with selected id doesn\'t exist');

    res.send(m);
});

router.post('/', async (req, res) => {
    const err = validate(req.body);
    if(err) return res.status(400).send(err);

    const g = await Genre.findById(req.body.genreId);
    if(!g) return res.status(404).send('genre doesn\'t exist');

    const m = new Movie({ 
        title: req.body.title,
        genre: {
            _id: g._id,
            name: g.name
        },
        numberInStock: req.body.numberInStock,
        dailyRentalRate: req.body.dailyRentalRate
    });
    await m.save();

    res.send(m);
});

router.put('/:id', async (req, res) => {
    const m = await Movie.findById(req.params.id);
    if(!m) return res.status(404).send('movie with selected id doesn\'t exist');

    const err = validate(req.body);
    if(err) return res.status(400).send(err);

    const g = await Genre.findById(req.body.genreId);
    if(!g) return res.status(404).send('genre doesn\'t exist');

    await m.updateOne({ 
        title: req.body.title,
        genre: {
            _id: g._id,
            name: g.name
        },
        numberInStock: req.body.numberInStock,
        dailyRentalRate: req.body.dailyRentalRate
    });
   
    res.send(m);
});

router.delete('/:id', async (req, res) => {
    const m = await Movie.findById(req.params.id);
    if(!m) return res.status(404).send('movie with selected id doesn\'t exist');

    await m.remove();
    res.send('movie deleted successfully');
});

module.exports = router;