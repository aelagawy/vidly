const express = require('express');
const { Customer, validate } = require('../models/customer.model');

const router = express.Router();

router.get('/', async (req, res) => {
    const customer = await Customer.find().sort('name');
    if(!customer || customer.length < 1) return res.status(404).send('no customers to display !');

    res.send(customer);
});

router.get('/:id', async (req, res) => {
    const c = await Customer.findById(req.params.id); 
    if(!c) return res.status(404).send('genre with selected id doesn\'t exist');

    res.send(c);
});

router.post('/', async (req, res) => {
    const err = validate(req.body);
    if(err) return res.status(400).send(err);

    const c = new Customer({ 
        name: req.body.name,
        phone: req.body.phone,
        isGold: req.body.isGold
     });
    await c.save();
    
    res.send(c);
});

router.put('/:id', async (req, res) => {
    const c = await Customer.findById(req.params.id);
    if(!c) return res.status(404).send('customer with selected id doesn\'t exist');

    const err = validate(req.body);
    if(err) return res.status(400).send(err);

    await c.updateOne({ 
        name: req.body.name,
        phone: req.body.phone,
        isGold: req.body.isGold
    });
    
    res.send(c);
});

router.delete('/:id', async (req, res) => {
    let c = await Customer.findById(req.params.id);
    if(!c) return res.status(404).send('customer with selected id doesn\'t exist');

    await c.remove();
    
    res.send('genre deleted successfully');
});

module.exports = router;