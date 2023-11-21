const express = require('express');
const router  = express.Router();
const mealsController = require('../controllers/mealsController');

router.route('/')
      .get(   mealsController.listMeals )
      .post(  mealsController.createMeal)
      .put(   mealsController.updateMeal)
      .delete(mealsController.deleteMeal);

router.route('/:id')
      .get(mealsController.getMeal);

module.exports = router;