const express = require('express');
const { Genre, validateGenre } = require('../models/genre.model');
const auth = require('../middleware/auth');
const admin = require('../middleware/isAdmin');

const router = express.Router();

router.get('/', async (req, res) => {
    const gs = await Genre.find();
    if(!gs || gs.length < 1) return res.status(404).send('no genres to display !');
    res.send(gs);
});

router.get('/:id', async (req, res) => {
    const g = await Genre.findById(req.params.id);
    if(!g) return res.status(404).send('genre with selected id doesn\'t exist');
    res.send(g);
});

router.post('/', auth, (req, res) => {
    let err = validateGenre(req.body);
    if(err) return res.status(400).send(err);

    let g = new Genre({ name: req.body.name });
    g.save().then((_g) => res.send(_g));
});

router.put('/:id', async (req, res) => {
    let g = await Genre.findById(req.params.id);
    if(!g) return res.status(404).send('genre with selected id doesn\'t exist');

    let err = validateGenre(req.body);
    if(err) return res.status(400).send(err);

    g.updateOne({ name: req.body.name })
    .then((_g) => res.send(_g));
});

router.delete('/:id', [auth, admin], async (req, res) => {
    let g = await Genre.findById(req.params.id);
    if(!g) return res.status(404).send('genre with selected id doesn\'t exist');

    g.remove().then(() => res.status(200).send('genre deleted successfully'));
});

module.exports = router;