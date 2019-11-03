
// var uniqueValidator = require('mongoose-unique-validator');
const mongoose=require('mongoose');

const feedback_schema=mongoose.Schema({

    _id: mongoose.Schema.Types.ObjectId,
    userId:String,
    speakRating:Number,
    eyeContactRating:Number,
    solidHandshakeRating:Number,
    bodyLanguageRating:Number,
    relevantRating:Number,
    skillsRating:Number,
    clearRating:Number,
    compellingRating:Number,
    confidentRating:Number,
    connectionRating:Number,
    additionalComments:String
    

});

module.exports=mongoose.model('feedback_model',feedback_schema);