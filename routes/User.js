const express = require('express')
const router = express.Router();
var jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');

const dotenv = require('dotenv');
dotenv.config({ path: '../dotenv' });
const jwt_secretekey = process.env.SECRETEKEY;

const fetchuser = require('../middleware/fetchuser');

const User = require('../models/User');
const feedback = require('../models/Feedback');

// Router 1
router.post('/login', async (req, res) => {
    let success = true;
    try {
        const fetchUser = await User.findOne({ mobile: req.body.mobile });
        if (!fetchUser) {
            return res.status(400).json({ "success": !success, "message": 'You are not registered' });
        }
        
        const result = await bcrypt.compare(req.body.password, fetchUser.password);

        if (result) {
            const data = {
                user: {
                    id: fetchUser.id
                }
            }
            const jwtoken = jwt.sign(data, jwt_secretekey);
            
            return res.status(200).json({ "success": success, "message": `You are login successfully`, jwtoken });
        } else {            
            return res.status(400).send({ "success": !success, "message": 'Invalid login credentials' });
        }
    } catch (error) {
        return res.status(400).send({ "success": !success, "message": 'Some internal error hai' });
    }
})

// Router 2
router.post('/regester', async (req, res) => {
    let success = true;
    try {
        let findUser = await User.findOne({ mobile: req.body.mobile });
        if (findUser) {
            return res.status(400).json({ "success": !success, "message": 'Sorry this mobile number is already registered' });
        }
        const salt = await bcrypt.genSalt(10);
        const hashPassword = await bcrypt.hash(req.body.password, salt);

        const user = await User.create({
            name: req.body.name,
            mobile: req.body.mobile,
            gender: req.body.gender,
            password: hashPassword,
        })

        const data = {
            user: {
                id: user.id
            }
        }
        const jwtoken = jwt.sign(data, jwt_secretekey);

        return res.status(200).json({ "success": success, "message": 'You are registered successfully', jwtoken });
    } catch (error) {
        return res.status(500).send({ "success": !success, "message": 'Server error occur', "err": error });
    }
},
);

// Router 3 
router.post('/fetchUser', fetchuser, async (req, res) => {
    try {
        let userId = req.userUniqueKey;
        const user = await User.findById(userId).select("-password");
        res.status(200).send(user);
    } catch (error) {
        return res.status(500).send({'success':false,'message':"Some error occur"});
    }
},
);

// feedback
router.post('/feedback', async (req, res) => {
    try {
        const respons = await feedback.create({
            name: req.body.name,
            message: req.body.message,
        });
        if (respons)
            res.status(200).json({ success: true, message: 'Thanks for your valuable feedback' });
    } catch (error) {
        console.log(error);
        res.status(400).json({ success: false, message: 'Your feedback not submited' });
    }
})

// Update account
router.put('/updateAccount', fetchuser, async (req, res) => {
    console.log('backend call for update');
    try {
        let userId = req.userUniqueKey;
        const { name, mobile, gender } = req.body;
        
        const cheakMobNoexist = await User.findOne({mobile:mobile});
        if(cheakMobNoexist  && cheakMobNoexist._id != userId)        
        {
            return res.status(400).json({ success: false, message: 'Mobile number is already registered, Try other'});
        }        
        
        // creating a new object of user
        const toBeUpdate = {
            "name":name,
            "mobile":mobile,
            "gender":gender,
        };
        const response = await User.findByIdAndUpdate(userId, { $set: toBeUpdate }, { new: true });
        res.status(200).json({ success: true, message: 'Your account updated successfully' });
    }
    catch (error) {
        res.status(500).json({ success: false, message: 'Some internal error occur' });
    }
})



module.exports = router;