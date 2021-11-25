const express = require('express')
const app = express();

const port = process.env.PORT || 5000;

var cors = require('cors');      // it is nessecary to use when we are fetching data from another localhost on another localhost
app.use(cors());   // use for fetching data from another port 

const connectToMongo = require('./db/connection');

app.use(express.json());

// Available routes 
app.use('/api/user',require('./routes/User'));
app.use('/api/cart',require('./routes/Cart'));
app.use('/api/placeorder',require('./routes/Order'));

// sterp 3
if(process.env.NODE_ENV == 'pruduction'){
    app.use(express.static('client/build'));
}

app.listen(port, () => {
    console.log(`Example app listening at http://localhost:${port}`)
})