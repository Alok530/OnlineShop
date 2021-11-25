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
    pincode:{
        type: String,
        required: true,        
    },
    state:{
        type: String,
        required: true,        
    },
    address:{
        type: String,
        required: true,        
    },
    items:{
        type: Object,
        required: true,
    },
});

const Order = new mongoose.model("Order", userSchema);
module.exports = Order;