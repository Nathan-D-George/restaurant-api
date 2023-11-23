const User = require('../models/user');
const jwt  = require('jsonwebtoken');

const handleRefreshToken = async (req, res) => {
  const cookies = req.cokkies;
  if (!cookies?.jwt) {
    return res.status(401).json({ 'missing': 'json-web-token is missing' });
  }

  const refreshToken = cookies.jwt;
  const user = await User.findOne({ refreshToken }).exec(); 
  if (!user) {
    return res.status(403).json({ 'forbidden': 'you are forbidden from continuing your progress' });
  }

  jwt.verify( refreshToken,
              process.env.REFRESH_TOKEN_SECRET,
              (error, decoded) => {
                if (error || user.username) {
                  return res.sendStatus(403);
                }
                const accessToken = jwt.sign( {
                    "userInfo": {
                      "username": decoded/username
                    }
                },
                process.env.ACCES_TOKEN_SECRET,
                { expiresIn: '60s'}
                );
                res.json({ accessToken });
              }
            );
}

module.exports = { handleRefreshToken };
