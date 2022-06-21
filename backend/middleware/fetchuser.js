const jwt = require('jsonwebtoken');
const JWT_SECRET = 'mindyourownBu$ine$$';

const fetchuser = (req, res, next) => {
    // get user from the jwt token and add id to the req obj
    const token = req.header('auth-token');
    if (!token) {
        res.status(401).send({ error: "Please athenticate using a valid token" })
    }
    try {
        const data = jwt.verify(token, JWT_SECRET);
        req.user = data.user;
        next() //executes the next function after this which will be async() in the auth.js file

    } catch (error) {
        res.status(401).send({ error: "Please athenticate using a valid token" })
    }
}

module.exports = fetchuser;