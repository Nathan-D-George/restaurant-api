const fs   = require('fs');
const path = require('path');

const root = async (req, res) => {
  try {
    fs.readFile(path.join( __dirname, '..', 'views', 'root.html' ), (err, content) => {
        // res.send({ some: 'json'});
        res.end(content, 'utf-8');
    });
  } catch (error) {
    console.log(error);
    res.sendStatus(500);
  }
  // res.json({ 'message': 'root page here' })
}

module.exports = { root };