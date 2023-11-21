const mongoose = require('mongoose');
const Schema   = mongoose.Schema;

const mealSchema = new Schema ({
    name: {
      type: String,
      required: true
    },
    price: {
      type: Number,
      required: true
    },
    size: {
      type: Number,
      required: true
    }
  }, { 
    versionKey: false
  }
);

module.exports = mongoose.model('Meal', mealSchema);