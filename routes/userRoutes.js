const express = require('express');
const router  = express.Router();
const usersController = require('../controllers/usersController');

router.route('/')
      .get(   usersController.listUsers )
      .post(  usersController.createUser)
      .put(   usersController.updateUser)
      .delete(usersController.deleteUser);

router.route('/search')
      .get(usersController.searchUser);
      
router.route('/:id')
      .get(usersController.getUser);

module.exports = router;