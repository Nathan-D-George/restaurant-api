const Meal = require('../models/meal');

const createMeal = async (req, res) => {
  if (!req?.body?.name || !req?.body?.price || !req?.body?.size) {
    return res.status(400).json({ 'missing': 'all meal parameters are required' });
  }
  const mealAlreadyExists = await Meal.findOne({ name: req.body.name });
  if (mealAlreadyExists){
    return res.status(409).json({ 'conflict': 'meal with given name already exists.' });
  }
  try {
    const meal = await Meal.create({
        name:  req.body.name,
        price: req.body.price,
        size:  req.body.size
      }
    );
    res.status(201).json({ 'success': `meal ${meal.name} successfully created` }); 
  } catch (error) {
    console.log(error);
  } 
}

const updateMeal = async (req, res) => {
  if (!req?.body?.id) {
    return res.status(400).json({ 'missing': 'no meal id was provided' });
  }
  const meal = await Meal.findById( req.body.id );
  if (!meal) {
    return res.status(404).json({ 'not found': 'no meal with matching id was found' });
  }
  try{
    if (req.body.name)  { meal.name = req.body.name }
    if (req.body.price) { meal.price = req.body.price }
    if (req.body.size)  { meal.size = req.body.size }
    meal.save();
    res.status(200).json({ 'success': 'meal successfully updated' });
  } catch (error) {
    console.log(error);
  }
}

const deleteMeal = async (req, res) => {
  if (!req?.body?.id) {
    return res.status(400).json({ 'missing': 'a meal id must be provided' });
  }
  
  const meal = await Meal.findById( req.body.id );
  if (!meal) {
    return res.status(404).json({ 'not found': 'no user found macthing given id' });
  }

  try {
    await meal.deleteOne();
    res.send(200).json({ 'success': 'the meal was deleted' });
  } catch (error) {
    console.log(error);
    res.sendStatus(500);
  }
}

const listMeals = async (req, res) => {
  try {
    const meals = await Meal.find();
    if (!meals) {
      return res.status(404).json({ 'not found': 'no meals were found' });
    }
    res.status(200).json( meals );
  } catch (error) {
    console.log(error);  
    res.sendStatus(500); 
  }
}

const getMeal = async (req, res) => {
  if (!req?.params?.id) {
    return res.status(400).json({ 'missing': 'id must be provided' });
  }

  try {
    const meal = await Meal.findById( req.params.id );
    if (!meal) {
      return res.status(404).json({ 'not found': 'no meal found' });
    }
    res.status(200).json( meal );
  } catch (error) {
    console.log(error);
    res.sendStatus(500);
  }
}

const searchMeal = async (req, res) => {
  const meal = await Meal.find( req.query );
  try {
    if (!meal) {
      return res.status(400).json({ 'not found': 'no meal found using given parameters' });
    }
    res.status(200).json(meal);
  } catch (error) {
    console.log(error);
    res.status(400).json({ 'error': error });
  }
}

module.exports = { 
  createMeal, updateMeal, deleteMeal, listMeals, getMeal, searchMeal
};
