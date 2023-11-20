const express = require('express');
const router  = express.Router();
const rootController = require('../controllers/rootController');

router.route('/')
      .get(rootController.root);

module.exports = router;
