const mongoose = require('mongoose');
const {Schema} = mongoose;

const feedbackSchema = new Schema({
    name:{
        type:String,
        required:true,
    },
    message:{
        type:String,
        required:true,
    }
});

const feedback = new mongoose.model('feedback',feedbackSchema);

module.exports = feedback;