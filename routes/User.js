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

        console.log(fetchUser);
        const result = await bcrypt.compare(req.body.password, fetchUser.password);

        if (result) {
            const data = {
                user: {
                    id: fetchUser.id
                }
            }
            const jwtoken = jwt.sign(data, jwt_secretekey);

            console.log(`${req.body.mobile} is login successfully`);
            res.status(200).json({ "success": success, "message": `You are login successfully`, jwtoken });
        } else {
            console.log('invalid password');
            res.status(400).send({ "success": !success, "message": 'Invalid login credentials' });
        }
    } catch (error) {
        res.status(400).send({ "success": !success, "message": 'Some internal error hai' });
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

        console.log('enter huaa register me');
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

        res.status(200).json({ "user": req.body.gender, "success": success, "message": 'You are registered successfully', jwtoken });
    } catch (error) {
        console.log(error);
        res.status(500).send({ "success": !success, "error": 'Some error occur', "err": error });
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
        console.log(error);
        res.status(500).send('Some error occur');
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
    try {

        const { name, mobile, gender, password } = req.body;

        // creating a new object of user
        const toBeUpdate = {};
        if (name) { toBeUpdate.name = name }
        if (mobile) { toBeUpdate.mobile = mobile }
        if (gender) { toBeUpdate.gender = gender }
        if (password) {
            const salt = await bcrypt.genSalt(10);
            const hashPassword = await bcrypt.hash(password, salt);
            { toBeUpdate.password = password }
        }


        let userId = req.userUniqueKey;
        const response = await User.findByIdAndUpdate(userId, { $set: toBeUpdate }, { new: true });
        res.status(200).json({ success: true, message: 'Your account updated successfully' });
    }
    catch (error) {
        console.log(error);
        res.status(500).send({ success: false, message: 'Some internal error occur' });
    }
})



module.exports = router;