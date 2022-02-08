const jwt = require('jsonwebtoken');
const { body, validationResult } = require('express-validator');
const jwtSecret = process.env.JWT_SECRET;




const fetchUser = (req, res, next) => {
   // Check error by using validationResult
   const errors = validationResult(req);
   if (!errors.isEmpty()) {
      return res.status(401).json({ errors: errors.array() });
   }

   try {
      const token = req.header("Authorization");
      if (!token) { return res.status(401).json({ errors: "UnAuthorized Access" }); }

      const decode = jwt.verify(token, jwtSecret);
      // console.log(decode)
      req.user = decode.user
      next();
   } catch (error) {
      console.error(error);
      res.status(500).json({
         status: 'failed',
         message: error.message
      });
   }
}
module.exports = fetchUser;