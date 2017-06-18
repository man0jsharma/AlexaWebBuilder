var Alexa = require('alexa-sdk');
const https = require('https');
const definitions = require('./definitions.json');
const responses = require('./responses.json');
var express = require("express")
var router = express.Router();
var bodyParser = require('body-parser');
var app = express();
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
var mongoose = require('mongoose');
const GenerateForm = require('../models/generateform');

const keyFromSlot = slot => key => key.toUpperCase() === slot.toUpperCase();
var app = express();

//Mongo db connaction

//Connect to MongoDB





const handlers = {
    'LaunchRequest': function () {
        this.emit(':ask', responses.LaunchRequest.ask, responses.LaunchRequest.reprompt);
    },
    'AMAZON.HelpIntent': function () {
        this.emit(':ask', responses["AMAZON.HelpIntent"].ask, responses["AMAZON.HelpIntent"].reprompt);
    },
    'AMAZON.StopIntent': function () {
        this.emit(':tell', responses["AMAZON.StopIntent"].tell);
    },
    'AMAZON.CancelIntent': function () {
        this.emit('AMAZON.StopIntent');
    },
    'SessionEndedRequest': function () {
        this.emit('AMAZON.StopIntent');
    },
    'Unhandled': function () {
        this.emit('AMAZON.HelpIntent');
    },
    'GetDefinition': function () {
        console.log("here 1");
        mongoose.Promise = global.Promise;
        //mongoose.connect('mongodb://localhost:27017/contactlist');

        //mongoURI = 'mongodb://localhost:27017/contactlist';
        // MONGOLAB_URI = "mongodb://<admin>:<admin>@ds153710.mlab.com:53710/admin-mercer"
        mongoose.connect('mongodb://ashish:ashish@ds027335.mlab.com:27335/angelhack');


        //On Connection Success
        mongoose.connection.on('connected', () => {
            console.log('Connected to database mongodb @ 27017');
        });

        //On Connection Errors
        mongoose.connection.on('error', (err) => {
            if (err) {
                console.log('Error connecting to database mongodb' + err);
            }
        });
        var slot = this.event.request.intent.slots.Term.value;
        if (slot) {
            var term = Object.keys(definitions).find(keyFromSlot(slot));
            console.log("here 2");
            var obj = {
                showSignIn: false,
                showSignUp: false,
                showPills: true
            };
            console.log("here 3");
            const definition = definitions[term];
            if (definition) {
                var newGenerateForm = new GenerateForm({
                    showSignIn: obj.showSignIn,
                    showSignUp: obj.showSignUp,
                    showPills: obj.showPills,
                });
                console.log("here 4");
                newGenerateForm.save((err, generateform) => {
                    if (err) {
                        console.log("here 5");
                        //res.json({ msg: 'Failed to add contact' + err });
                    }
                    else {
                        console.log("here 6");
                        //res.json({ msg: 'Success' });
                    }
                });

                this.emit(":tell", "Done form has been added");
            } else {
                this.emit(":tell", "I'm sorry, I don't know the definition of " + slot + ". Please try again.");
            }
        } else {
            this.emit(":ask", "You need to provide a term. " + responses["AMAZON.HelpIntent"].reprompt, responses["AMAZON.HelpIntent"].reprompt);
        }

    }
};

exports.handler = function (event, context, callback) {
    var alexa = Alexa.handler(event, context);
    alexa.registerHandlers(handlers);
    alexa.execute();
};

//post signin data
