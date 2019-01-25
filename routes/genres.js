const express = require('express');
const Joi = require('joi');

const router = express.Router();

let genres = [
    { id:1, name: 'Drama' },
    { id:2, name: 'Action' },
    { id:3, name: 'Horror' },
];

router.get('/', (req, res) => {
    if(!genres || genres.length < 1) return res.status(404).send('no genres to display !');
    res.send(genres);
});

router.get('/:id', (req, res) => {
    let genre = genres.find(g => g.id == parseInt(req.params.id));
    if(!genre) return res.status(404).send('genre with selected id doesn\'t exist');
    res.send(genre);
});

router.post('/', (req, res) => {
    let error = validateGenre(req.body);
    if(error) return res.status(400).send(error);

    let genre = {
        id: genres.length + 1,
        name: req.body.name
    };
    genres.push(genre);
    res.send(genre);
});

router.put('/:id', (req, res) => {
    let genre = genres.find(g => g.id == parseInt(req.params.id));
    if(!genre) return res.status(404).send('genre with selected id doesn\'t exist');

    let error = validateGenre(req.body);
    if(error) return res.status(400).send(error);

    genre.name = req.body.name;
    res.send(genre);
});

router.delete('/:id', (req, res) => {
    let genreIndex = genres.findIndex(g => g.id == parseInt(req.params.id));
    if(genreIndex < 0) return res.status(404).send('genre with selected id doesn\'t exist');

    genres.splice(genreIndex, 1);

    res.status(200).send('genre deleted successfully');
});

function validateGenre(genre){
    const schema = Joi.object().keys({
        name: Joi.string().min(3).required()
    });

    const { error } = Joi.validate(genre, schema);
    return error ? error.details[0].message : null;
}

module.exports = router;