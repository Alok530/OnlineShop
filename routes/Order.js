const express = require('express')
const router = express.Router();
const fetchuser = require('../middleware/fetchuser');

const order = require('../models/Order');

// Router 1
router.post('/order',fetchuser, async (req, res) => {
    let success = true;
    console.log('enter into order',req.userUniqueKey);
    try {               
        const orderItem = await order.create({
            user: req.userUniqueKey,
            name: req.body.name,
            mobile: req.body.mobile,
            pincode: req.body.pincode,
            state: req.body.state,
            address: req.body.address,
            items: req.body.items,
        })               

        console.log(`${orderItem} order successfully`);
        res.status(200).json({ "success": success, "message": 'Congratulations your Order placed successfully',"details":orderItem });
    } catch (error) {
        console.log(error);
        res.status(500).send({ "success": !success, "message": 'Some error occur', "error": error });
    }
},
);


// Router 2 :- fetch all user's order
router.post('/fetchallorder', fetchuser ,async (req, res) => {
    try {               
        const MyAllorder = await order.find({user: req.userUniqueKey})
        console.log(MyAllorder);
        res.status(200).json(MyAllorder);
    } catch (error) {
        console.log(error);
        res.status(500).send(error);
    }
},
);

module.exports = router;