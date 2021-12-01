const express = require('express')
const router = express.Router();

const order = require('../models/Order');

// Router 1
router.post('/order', async (req, res) => {
    let success = true;
    try {               
        const user = await order.create({
            name: req.body.name,
            mobile: req.body.mobile,
            pincode: req.body.pincode,
            state: req.body.state,
            address: req.body.address,
            items: req.body.items,
        })               

        // console.log(`${user} order successfully`);
        res.status(200).json({ "success": success, "message": 'Congratulations your Order placed successfully',"details":user });
    } catch (error) {
        console.log(error);
        res.status(500).send({ "success": !success, "message": 'Some error occur', "error": error });
    }
},
);

module.exports = router;