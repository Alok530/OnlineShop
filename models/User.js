const mongoose = require('mongoose');
const { Schema } = mongoose;

const userSchema = new Schema({
    name:{
        type: String,
        required: true,
    },
    mobile:{
        type: Number,
        required: true,
    },
    password:{
        type: String,
        required: true,        
    },
    gender:{
        type: String,
        required: true,        
    }
});

const EcartUser = new mongoose.model("EcartUser", userSchema);
module.exports = EcartUser;