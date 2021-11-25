const jwt = require('jsonwebtoken');
const jwt_secretekey = 'iamagoodboyiamsecondyearstudentatiiitkalyani.ac.inwestbengal';

const fetchuser = (req, res, next) => {
    // get the user from the jwt token and add id to req object
    const token = req.header('auth-token');
    if (!token) {
        res.status(401).send({ success:false, error: "Please authenticate using a valid token" });
    }

    try {
        const data = jwt.verify(token, jwt_secretekey);  // it will return object having two element 1st unique key that you give during jenerating token and 2nd some key (not require)
        // console.log('data hai ye',data);        
        // console.log(data.user);
        
        req.userUniqueKey = data.user.id;  // NOTE:- uniqueKey is not same as seceret key both are diffrent thing 
        // here uniqueKey is name of the object which we passed during generation of token and id is key and value pair
        next();
    } catch (error) {
        console.log('fetchuser ka error hai',error);
        res.status(401).send({ success: false, message: "Please authenticate using a valid token" });
    }
};

module.exports = fetchuser;