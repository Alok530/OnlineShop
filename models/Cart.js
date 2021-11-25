const mongoose = require('mongoose');
const { Schema } = mongoose;

const CartSchema = new Schema({   
    user:{  //for store the id of the user it is diffrent from id of notes it is original id crossponding to user regestration
        type:mongoose.Schema.Types.ObjectId,
        ref:'EcartUser',
    },
    ID:{
        type: Number,
        required: true,
    },
    name:{
        type: String,
        required: true,
    },
    image:{
        type: String,
        required: true,        
    },    
    ratting:{
        type: Number,
        required: true,
    },
    price:{
        type: Number,
        required: true,
    },        
});

// now we need to create a Collection here: student is Collection name 
const addToCart = new mongoose.model("addToCart", CartSchema);

module.exports = addToCart;