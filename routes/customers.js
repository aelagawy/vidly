const express = require('express');
const { Customer, validateCustomer } = require('../models/customer.model');

const router = express.Router();

router.get('/', (req, res) => {
    Customer.find().then((cs) => { 
        if(!cs || cs.length < 1) return res.status(404).send('no customers to display !');
        res.send(cs);
    });
});

router.get('/:id', (req, res) => {
    Customer.findById(req.params.id).then((c) => { 
        if(!c) return res.status(404).send('genre with selected id doesn\'t exist');
        res.send(c);
    });
});

router.post('/', (req, res) => {
    let err = validateCustomer(req.body);
    if(err) return res.status(400).send(err);

    console.log(res.body);
    let c = new Customer({ 
        name: req.body.name,
        phone: req.body.phone,
        isGold: req.body.isGold
     });
    c.save().then((_c) => res.send(_c));
});

router.put('/:id', (req, res) => {
    let c = Customer.findById(req.params.id);
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

router.delete('/:id', (req, res) => {
    let c = Customer.findById(req.params.id);
    if(!c) return res.status(404).send('customer with selected id doesn\'t exist');

    c.remove().then((_c) => res.status(200).send('genre deleted successfully', _c));
});

module.exports = router;