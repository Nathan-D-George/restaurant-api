const express = require('express');
const router  = express.Router();
const userController = require('../controllers/usersController');

router.route('/')
      .get(   usersControllers.listUsers)
      .post(  usersControllers.createUser)
      .put(   usersControllers.updateUser)
      .delete(usersControllers.deleteUser);

router.route('/:id')
      .get(usersController.getUser);

module.exports = router;