const root = async (req, res) => {
  res.json({ 'message': 'root page here' })
}

module.exports = { root };