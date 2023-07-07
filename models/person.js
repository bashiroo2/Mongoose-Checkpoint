const mongoose = require('mongoose');

// Create the Person Schema
const personSchema = new mongoose.Schema({
  name: { type: String, required: true },
  age: { type: Number },
  favoriteFoods: [{ type: String }],
});

// Create the Person Model
const Person = mongoose.model('Person', personSchema);

// Export the model
module.exports = Person;
