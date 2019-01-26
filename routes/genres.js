const express = require('express');
const { Genre, validateGenre } = require('../models/genre.model');

const router = express.Router();

router.get('/', (req, res) => {
    Genre.find().then((genres) => { 
        if(!genres || genres.length < 1) return res.status(404).send('no genres to display !');
        res.send(genres);
    });
});

router.get('/:id', (req, res) => {
    Genre.findById(req.params.id).then((genre) => { 
        if(!genre) return res.status(404).send('genre with selected id doesn\'t exist');
        res.send(genre);
    });
});

router.post('/', (req, res) => {
    let error = validateGenre(req.body);
    if(error) return res.status(400).send(error);

    let genre = new Genre({ name: req.body.name });
    genre.save().then((g) => res.send(g));
});

router.put('/:id', (req, res) => {
    let genre = Genre.findById(req.params.id);
    if(!genre) return res.status(404).send('genre with selected id doesn\'t exist');

    let error = validateGenre(req.body);
    if(error) return res.status(400).send(error);

    genre.update({ name: req.body.name })
    .then((g) => res.send(g));
});

router.delete('/:id', (req, res) => {
    let genre = Genre.findById(req.params.id);
    if(!genre) return res.status(404).send('genre with selected id doesn\'t exist');

    genre.remove().then((g) => res.status(200).send('genre deleted successfully'));
});

module.exports = router;