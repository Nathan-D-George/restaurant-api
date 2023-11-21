const User = require('../models/user');

const getUser = async (req, res) => {}

const listUsers = async (req, res) => {}

const createUser = async (req, res) => {
  if (!req?.body?.username || !req?.body?.email || !req?.body?.password ){
    return res.status(400).json({ 'missing': 'all user parameters must be provided' });
  }
  const userAlreadyExists = await User.findOne({ username: req.body.username });
  if (userAlreadyExists) {
    return res.status(409).json({ 'conflict': 'username is not available, must be unqiue' });
  }
  try {
    const user = User.create({
      username: req.body.username,
      email: req.body.email,
      password: req.body.password
    });
    res.status(201).json({ 'success': `successfully created user ${user.username}` });
  } catch (eror) {
    console.log(error);
    res.sendStatus(400);
  }
}

const updateUser = async (req, res) => {
  if (!req?.body?.id) {
    return res.status(400).json({ 'missing': 'no user id provided' });
  }
  const user = await User.findById( req.body.id );
  if (!user) {
    return res.status(404).json({ 'not found': 'no user with matching id was found' });
  }
  try {
    if (req?.body?.username) { user.username = req.body.username; }
    if (req?.body?.email)    { user.email    = req.body.email; }
    if (req?.body?.password) { user.password = req.body.password; }
    const result = user.save();
    console.log(result);
    res.status(200).json({ 'success': 'user successfully updated' });
  } catch (error) {
    console.log(error);
    res.sendStatus(500);
  }
}

const deleteUser = async (req, res) => {
  if (!req?.body?.id) {
    return res.status(400).json({ 'missing': 'user id must be provided' });
  }
  
  const user = await User.findById( req.body.id );
  if (!user) {
    return res.status(404).json({ 'not found': 'no user with matching id has been found!' });
  }
  try {
    const result = await user.deleteOne();
  } catch (error) {
    console.log(error);
    res.sendStatus(500);
  }
}

module.exports = {
  getUser, listUsers, createUser, updateUser, deleteUser
}