const mongoose = require('mongoose');
const dotenv = require('dotenv');

dotenv.config({path:'./config.env'});
const mongoURL = process.env.DATABASE;

mongoose.connect(mongoURL, {
    useNewUrlParser: true,
    useUnifiedTopology: true,    
}).then(() => {
    console.log(`connection succesfull`);
}).catch((err) => {
    console.log(`No connection ${err}`);
});