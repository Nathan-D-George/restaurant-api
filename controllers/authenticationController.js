const User   = require('../models/user');
const bcrypt = require('bcrypt');
const jwt    = require('jsonwebtoken');

const login = async (req, res) => {
  const { email, password } = req.query;
  if (!email || !password) {
    return res.status(400).json({ 'missing': 'email and password'});
  }
  const existingUser = await User.findOne({ email: email });
  if (!existingUser) {
    return res.status(404).json({ 'not found': 'no user with given email was found' });
  }

  const passwordMatches = await bcrypt(password, existingUser.password);
  if (passwordMatches) {
  
  const accessToken = jwt.sign({
      "UserInfo": { "username": existingUser.username }
    },
    process.env.ACCESS_TOKEN_SECRET,
    { expiresIn: '30m'}
  );

  const refreshToken = jwt.sign({
      "username": existingUser.username
    },
    process.env.REFRESH_TOKEN_SECRET,
    { expiresIn: '1d' }
  );

  existingUser.refrehToken = refreshToken;
  await existingUser.save();

  res.cookie('jwt', refreshToken, { httpOInly: true, secure: true, sameSite: 'None', maxAge: 24*60*60*1000 });
  res.json( accessToken );

  } else {
    res.status(401).json({ 'unauthorized': 'you are not authorized to proceed' });
  }
  
}

module.exports = { login };