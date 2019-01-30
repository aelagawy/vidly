const express = require('express');
const { Genre, validate } = require('../models/genre.model');
const auth = require('../middleware/auth');
const admin = require('../middleware/admin');

const router = express.Router();

router.get('/', async (req, res) => {
    throw new Error('generic error');
    const genres = await Genre.find().sort('name');
    if(!genres || genres.length < 1) return res.status(404).send('no genres to display !');

    res.send(genres);
});

router.get('/:id', async (req, res) => {
    const g = await Genre.findById(req.params.id);
    if(!g) return res.status(404).send('genre with selected id doesn\'t exist');

    res.send(g);
});

router.post('/', auth, async (req, res) => {
    const err = validate(req.body);
    if(err) return res.status(400).send(err);

    const g = new Genre({ name: req.body.name });
    await g.save();

    res.send(g);
});

router.put('/:id', async (req, res) => {
    const g = await Genre.findById(req.params.id);
    if(!g) return res.status(404).send('genre with selected id doesn\'t exist');

    const err = validate(req.body);
    if(err) return res.status(400).send(err);

    g.name = req.body.name;
    g.save(function(err, updatedG){
        if(err) return res.status(500).send('db update error !');
        res.send(updatedG);
    })
});

router.delete('/:id', [auth, admin], async (req, res) => {
    const g = await Genre.findById(req.params.id);
    if(!g) return res.status(404).send('genre with selected id doesn\'t exist');

    await g.remove();
    res.send('genre deleted successfully');
});

module.exports = router;