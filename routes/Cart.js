const express = require('express');
const fetchuser = require('../middleware/fetchuser');
const router = express.Router();

const User = require('../models/Cart');

// Router 1 
router.post('/fetchAllItems', fetchuser, async (req, res) => {
    try {
        const items = await User.find({ user: req.userUniqueKey });
        // console.log(items, req.body.ID);
        res.status(200).json(items);
    } catch (error) {
        // console.log('getallitems ka error', error);
        res.status(400).send('Some internal error hai');
    }
})

// Router 2 
router.post('/addToCart', fetchuser, async (req, res) => {
    let success = true;
    try {
        console.log('enter to cart');
        const itemToBeAddtoCart = await User.findOne({ ID: req.body.ID, user: req.userUniqueKey });
        if (itemToBeAddtoCart) {
            console.log('phle se hai cart me');
            res.status(200).json({ 'success': !success, message: 'This Item is already in Cart' });
        } else {
            const user = await User.create({
                user: req.userUniqueKey,
                ID: req.body.ID,
                name: req.body.name,
                image: req.body.image,
                price: req.body.price,
                ratting: req.body.ratting,
            })
            res.status(200).json({ "success": success, "message": 'Item added to cart successfully', "items": req.body.ID });
        }
    } catch (error) {
        // console.log('enter into add to cart error');
        // console.log(error);
        res.status(500).send({ "success": !success, "error": 'Some error occur', "err": error });
    }
},
);

// Router 3 
router.delete('/removeItemfun', fetchuser, async (req, res) => {
    try {
        let noteToDelete = await User.findOne({ ID: req.body.ID, user: req.userUniqueKey })

        if (!noteToDelete)
            res.status(400).send({ "Success": false, "message": 'item to delete is not found' });
        else {
            noteToDelete = await User.deleteOne({ ID: req.body.ID, user: req.userUniqueKey });
            res.status(200).json({ "Success": "Note has been deleted", note: noteToDelete });
        }
    }
    catch (error) {
        // console.log(error);
        res.status(500).send({ "message": 'Some error occur', "error": error });
    }
})

// Remove all items
router.delete('/removeAllitems', fetchuser, async (req, res) => {
    try {
        console.log('uniquekey', req.userUniqueKey);
        const removedItems = await User.deleteMany({ user: req.userUniqueKey });
        res.status(200).json({ "message": "All items deleted", 'removedItems': removedItems });
    }
    catch (error) {
        // console.log(error);
        res.status(500).send({ "message": 'Some error occur', "error": error });
    }
})


module.exports = router;