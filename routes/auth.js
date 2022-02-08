const express = require("express");
const bcrypt = require('bcryptjs');
const User = require("../models/User");
const fetchUser = require("../middleware/fetchUser");
const { body, validationResult } = require('express-validator');
const dotenv = require('dotenv');
const jwt = require('jsonwebtoken');
const jwtSecret = process.env.JWT_SECRET
const router = express.Router();
dotenv.config();


// Route: 1 Create a User using Post "/api/auth/register" - { No login required }
router.post('/register', [
   body('name', "UserName Must be atleast 3 characters long").isLength({ min: 3 }),
   body('email', "Invalid email").isEmail(),
   body('password', "password must be at least 5 chars long").isLength({ min: 5 }),
], async (req, res) => {
   let success = false;

   // Check error by using validationResult
   const errors = validationResult(req);
   if (!errors.isEmpty()) {
      return res.status(400).json({ success, errors: "Invelid Credentials" });
   }
   const { email, password } = req.body;
   try {
      // Check if user already exists or Not

      let user = await User.findOne({ email });
      if (user) {
         return res.status(400).json({ success, errors: "User already exists" });
      }

      const salt = await bcrypt.genSalt(10);
      const hashedpassword = await bcrypt.hash(password, salt);

      // Create a new user
      user = await User.create({
         name: req.body.name,
         email: req.body.email,
         password: hashedpassword
      })


      // Create and assign a token  
      const payload = { user: { id: user.id } }

      const token = jwt.sign(payload, jwtSecret)

      success = true;
      res.json({ success, token, user });
   } catch (error) {
      res.status(500).send("Server Error in registering user");
   }
})


// Route: 2 LogIn a User using Post "/api/auth/login" - { No login required }
router.post('/login', [
   body('email', "Invalid email").isEmail(),
   body('password').exists(),
], async (req, res) => {

   let success = false;

   // Check error by using validationResult
   const errors = validationResult(req);
   if (!errors.isEmpty()) {
      return res.status(400).json({ success, errors: errors.array() });
   }

   const { email, password } = req.body;
   try {
      // Check if user already exist of  not
      let user = await User.findOne({ email });
      if (!user) {
         return res.status(400).json({ success, errors: "Invalid Credentials" });
      }

      // Check if password is correct
      const passMatch = await bcrypt.compare(password, user.password)
      if (!passMatch) {
         return res.status(400).json({ success, errors: "Invalid Credentials" });
      }


      const payload = { user: { id: user.id } }
      const token = jwt.sign(payload, jwtSecret);

      success = true;
      res.json({ success, token, user });
   } catch (error) {
      res.status(500).send("Server Error");
   }

})



// Route: 3 Taking User Details  using Post "/api/auth/profile" - { Login required }
router.post('/profile', fetchUser, async (req, res) => {
   try {

      // const user = await fetchuser(req.user.id);
      const user = await User.findById(req.user.id).select('-password');
      res.json(user);

   } catch (error) {
      res.status(500).send("Server Error in fetching user");
   }
})


module.exports = router;