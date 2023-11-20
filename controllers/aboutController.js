const about = async (req, res) => {
  res.status(200).json({ 'mesage': "This is a restaurant company's api" });
}

module.exports = { about };