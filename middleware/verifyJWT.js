const jwt = require('jsonwebtoken');
require('dotenv').config();

const verifyJWT = async (req, res, next) => {

  const authHeader = req.headers.authorization || req.headers.Authorization;

  const token = authHeader.split(' ')[1];

  try {
    const user = jwt.verify(
      token, 
      process.env.ACCESS_TOKEN_SECRET, 
      (error, decoded) => {
        if (error) {
          res.clearCookie("jwt");
          return res.redirect("/about");
        }

        req.user = decoded.UserInfo;
        next();
      }
    );
  } catch (error) {
    console.log(error);
    res.clearCookie("jwt");
    return res.redirect("/about");
  }
}

module.exports = verifyJWT;