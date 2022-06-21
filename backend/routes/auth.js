const express = require("express");
const router = express.Router()   // A router is a JavaScript object that maps URLs to functions

// Details validation function from the express website
const { body, validationResult } = require('express-validator');
const User = require(`../models/User`)
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const JWT_SECRET = 'mindyourownBu$ine$$';
const fetchuser=require('../middleware/fetchuser');


// ROUTE 1: Create a User using: POST "/api/auth/createuser". No login required
router.post('/createuser', [

    body('name', 'Enter a valid name').isLength({ min: 3 }),
    body('email', 'Enter a valid email').isEmail(),
    body('password', 'Password must be atleast 5 characters').isLength({ min: 5 })

], async (req, res) => {

    // If there are errors return bad request and error
    const errors = validationResult(req);  // validationResult(req) extracts the validation errors from a request
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }

    // Check whether the user with this email exists already
    try {
        let user = await User.findOne({ email: req.body.email })
        if (user) {
            return res.status(400).json({ error: "Sorry a user with this email already exists" })
        }
        const salt = await bcrypt.genSalt(10);
        const secPass = await bcrypt.hash(req.body.password, salt)

        user = await User.create({
            name: req.body.name,
            email: req.body.email,
            password: secPass,
        })
        const data={
            user:{
                id: user.id
            }
        }
        const authToken= jwt.sign(data, JWT_SECRET);

        //   .then(user => res.json(user))
        //   .catch(err=>{console.log(err)
        //     res.json({error: "Please enter a valid email"})})

        res.json({authToken})
    }
    catch ( error ) {
        console.error(error.message);
        res.status(500).send("Some error occured"); 
    }

})

// ROUTE 2: Authenticate a user. POST "/api/auth/login". No login required

router.post('/login', [

    body('email', 'Enter a valid email').isEmail(),
    body('password', 'Password cannot be blank').exists(),//checks if your input is blank or not

], async (req, res) => {

    // If there are errors return bad request and error
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }

    const {email, password}=req.body; //email and password from the body
    try {

        let user= await User.findOne({email})
        if(!user){
            return res.status(400).json({ error: "Please login with correct credentials" })
        }
        const passwordCompare= await bcrypt.compare(password, user.password);//user.password is the password stored in the db
        if(!passwordCompare){
            return res.status(400).json({ error: "Please login with correct credentials" })
        }
        const data={
            user:{
                id:user.id
            }
        }
        const authToken= jwt.sign(data, JWT_SECRET);
        res.json({authToken})
    } catch (error) {
        console.error(error.message);
        res.status(500).send("Internal Server Error"); 
    }
})

// ROUTE 3: get user details: POST "/api/auth/getuser". Login required
// fetchuser is middleware. Used wherever you feel login is required
router.post('/getuser',fetchuser, async (req, res) => {
    try {
        userId=req.user.id;
        const user = await User.findById(userId).select("-password")//-password lets the user fetch all details except the password
        if(!user){
            return res.status(400).json({ error: "Please login with correct credentials" })
        }
        res.send({user})
    } catch (error) {
        console.error(error.message);
        res.status(500).send("Internal Server Error"); 
    }
})
module.exports = router