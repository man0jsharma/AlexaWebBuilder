const express = require('express');
const router = express.Router();

const Contact = require('../models/contacts');
const fs = require('fs');
const jsonFile = '../contactlist/models/test.json';

//Retrieving contacts
router.get('/contacts', (req, res, next) => {
    Contact.find(function (err, contacts) {
        res.json(contacts);
    })
});

//Adding Contacts
router.post('/contact', (req, res, next) => {
    var newContact = new Contact({
        first_name: req.body.first_name,
        last_name: req.body.last_name,
        phone: req.body.phone
    });

    newContact.save((err, contact) => {
        if (err) {
            res.json({ msg: 'Failed to add contact' + err });
        }
        else {
            res.json({ msg: 'Success' });
        }
    });
});



//Deleting Contacts
router.delete('/contact/:id', (req, res, next) => {
    Contact.remove({ _id: req.params.id }, function (err, result) {
        if (err) {
            res.json(err);
        }
        else {
            res.json(result);
        }
    });
});

//Updating Contacts
router.put('/contact', (req, res, next) => {
    Contact.update({ _id: req.params.id }, function (err, result) {

    })
});

function readJSONFile(filename, callback) {
    fs.readFile(filename, function (err, data) {
        if (err) {
            callback(err);
            return;
        }
        try {
            callback(null, JSON.parse(data));
        } catch (exception) {
            callback(exception);
        }
    });
}

router.get('/alexa', (req, res, next) => {
    readJSONFile(jsonFile, function (err, json) {
        if (err) { throw err; }
        res.json(json);
    });
});

module.exports = router;