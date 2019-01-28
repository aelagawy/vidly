const express = require('express');
const { Customer, validateCustomer } = require('../models/customer.model');

const router = express.Router();

router.get('/', async (req, res) => {
    const cs = await Customer.find();
    if(!cs || cs.length < 1) return res.status(404).send('no customers to display !');
    res.send(cs);
});

router.get('/:id', async (req, res) => {
    const c = await Customer.findById(req.params.id); 
    if(!c) return res.status(404).send('genre with selected id doesn\'t exist');
    res.send(c);
});

router.post('/', (req, res) => {
    let err = validateCustomer(req.body);
    if(err) return res.status(400).send(err);

    let c = new Customer({ 
        name: req.body.name,
        phone: req.body.phone,
        isGold: req.body.isGold
     });
    c.save().then((_c) => res.send(_c));
});

router.put('/:id', async (req, res) => {
    let c = await Customer.findById(req.params.id);
    if(!c) return res.status(404).send('customer with selected id doesn\'t exist');

    let err = validateCustomer(req.body);
    if(err) return res.status(400).send(err);

    c.updateOne({ 
        name: req.body.name,
        phone: req.body.phone,
        isGold: req.body.isGold
    })
    .then((_c) => res.send(_c));
});

router.delete('/:id', async (req, res) => {
    let c = await Customer.findById(req.params.id);
    if(!c) return res.status(404).send('customer with selected id doesn\'t exist');

    c.remove().then(() => res.status(200).send('genre deleted successfully'));
});

module.exports = router;