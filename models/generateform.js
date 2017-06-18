const mongoose = require('mongoose');

const GenerateFormSchema = mongoose.Schema({
    showSignIn:{
        type: Boolean,
        required: true
    },
    showSignUp:{
        type: Boolean,
        required: true
    },
    showPills:{
        type: Boolean,
        required: true
    },
});


const GenerateForm = module.exports = mongoose.model('GenerateForm', GenerateFormSchema);
