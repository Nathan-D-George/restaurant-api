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
        name:  req.body.meal,
        price: req.body.price,
        size:  req.body.size
      }
    );
    res.status(200).json({ 'success': 'meal successfully created' }); 
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
    const result = await meal.deleteOne();
    res.send(200).json({ 'success': 'the meal was deleted' });
    console.log(result);
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
  const user = await User.find( req.query );
  if (!user) {
    return res.status(404).json({ 'not found': 'no user found' });
  }
  try {
    res.status(200).json( user );
  } catch (error) {
    console.log(error);
    res.sendStatus(500);
  }
}

module.exports = { 
  createMeal, updateMeal, deleteMeal, listMeals, getMeal
};
