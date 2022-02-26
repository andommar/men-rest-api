const router = require('express').Router();
const User = require('../models/user');
const bcrypt = require('bcrypt');
const jwt = require ('jsonwebtoken');


const {registerValidation, loginValidation} = require('../validation');


//registration
router.post("/register", async (req, res) => {
    
    //validate user input (name, email, password)
    const {error} = registerValidation(req.body);

    if(error){
        return res.status(400).json({error: error.details[0].message})
    }
    
    //check if email is registered
    const emailExist = await User.findOne({email: req.body.email});

    if(emailExist){
        return res.status(400).json({error: "Email already exists"});
    }

    //hash the password
    const salt = await bcrypt.genSalt(10);
    const password = await bcrypt.hash(req.body.password, salt);

    //const salt = await 
    const userObject = new User({
        name: req.body.name,
        email: req.body.email,
        password
    });

    try {
        const savedUser = await userObject.save(); //saves user data
        res.json({error: null, data: savedUser._id}); //returns no error and id
    } catch (error){
        res.status(400).json({error})
    }

    //create a user object and save in DB
    
})

//login

router.post("/login", async (req, res) => {

    //validate user input (name, email, password)
    const {error} = loginValidation(req.body);

    if(error){
        return res.status(400).json({error: error.details[0].message})
    }
    
    //check if email is registered
    const user = await User.findOne({email: req.body.email});

    if(!user){
        return res.status(400).json({error: "Email is wrong"});
    }

    //user exists - check for password is correct

    const validPassword = await bcrypt.compare(req.body.password, user.password);

    //throw error if password is wrong

    if(!validPassword){
        return res.status(400).json({ error: "Password is wrong"});
    }

    //create authentication token with username and id

    const token = jwt.sign
    (
        //payload
        {
            name: user.name,
            id: user._id

        },
        //TOKEN_SECRET
        process.env.TOKEN_SECRET,
        //EXPIRATION TIME
        { expiresIn: process.env.JWT_EXPIRES_IN},
    )

    //attach auth token to header
    res.header("auth-token", token).json({
        error: null,
        data: { token }
    });
});

module.exports = router;