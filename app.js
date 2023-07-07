const express = require("express");
const mongoose = require("mongoose");
require("dotenv").config();

const app = express();
const port = 3000;

// Connect to MongoDB using the provided URI from .env
mongoose
  .connect(process.env.MONGO_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => console.log("conected to db"));

// Import the Person model
const Person = require("./models/person");

// Middleware to parse JSON requests
app.use(express.json());

// Route for creating and saving a new person
app.post("/create-person", async(req, res) => {
  try{
    const { name, age, favoriteFoods } = req.body;

    const person = new Person({
      name,
      age,
      favoriteFoods,
    });
  
   await person.save();
   res.status(201).json({msg:"person created",person:person})
  }
  catch(err){
    res.status(500).json({msg:"Something went wrong"})
  }
  
});

// Route for creating many people at once
app.post("/create-many", (req, res) => {
  const arrayOfPeople = req.body; // An array of objects containing name, age, and favoriteFoods

  Person.create(arrayOfPeople, function (err, people) {
    if (err) {
      console.error(err);
      res.status(500).json({ error: "Error creating people" });
    } else {
      console.log("People created:", people);
      res.status(201).json({ message: "People created successfully", people });
    }
  });
});

// Route for finding all people with a given name
app.get("/find-by-name/:name", (req, res) => {
  const nameToSearch = req.params.name;

  Person.find({ name: nameToSearch }, function (err, people) {
    if (err) {
      console.error(err);
      res.status(500).json({ error: "Error finding people" });
    } else {
      console.log("People with name", nameToSearch + ":", people);
      res.status(200).json(people);
    }
  });
});

// Route for finding one person with a certain food in their favorites
app.get("/find-by-food/:food", (req, res) => {
  const foodToSearch = req.params.food;

  Person.findOne({ favoriteFoods: foodToSearch }, function (err, person) {
    if (err) {
      console.error(err);
      res.status(500).json({ error: "Error finding person" });
    } else {
      console.log("Person with favorite food", foodToSearch + ":", person);
      res.status(200).json(person);
    }
  });
});

// Route for finding a person by _id
app.get("/find-by-id/:personId", (req, res) => {
  const personIdToSearch = req.params.personId;

  Person.findById(personIdToSearch, function (err, person) {
    if (err) {
      console.error(err);
      res.status(500).json({ error: "Error finding person" });
    } else {
      console.log("Person with ID", personIdToSearch + ":", person);
      res.status(200).json(person);
    }
  });
});

// Route for updating a person's favoriteFoods by _id
app.patch("/add-food/:personId", (req, res) => {
  const personIdToUpdate = req.params.personId;
  const newFood = req.body.newFood;

  Person.findById(personIdToUpdate, function (err, person) {
    if (err) {
      console.error(err);
      res.status(500).json({ error: "Error updating person" });
    } else {
      person.favoriteFoods.push(newFood);
      person.save(function (err, updatedPerson) {
        if (err) {
          console.error(err);
          res.status(500).json({ error: "Error updating person" });
        } else {
          console.log("Updated person:", updatedPerson);
          res.status(200).json(updatedPerson);
        }
      });
    }
  });
});

// Route for updating a person's age by name
app.patch("/update-age/:personName", (req, res) => {
  const personNameToUpdate = req.params.personName;
  const newAge = req.body.newAge;

  Person.findOneAndUpdate(
    { name: personNameToUpdate },
    { age: newAge },
    { new: true },
    function (err, updatedPerson) {
      if (err) {
        console.error(err);
        res.status(500).json({ error: "Error updating person" });
      } else {
        console.log("Updated person:", updatedPerson);
        res.status(200).json(updatedPerson);
      }
    }
  );
});

// Route for deleting a person by _id
app.delete("/delete-by-id/:personId", (req, res) => {
  const personIdToDelete = req.params.personId;

  Person.findByIdAndRemove(personIdToDelete, function (err, deletedPerson) {
    if (err) {
      console.error(err);
      res.status(500).json({ error: "Error deleting person" });
    } else {
      console.log("Deleted person:", deletedPerson);
      res.status(200).json(deletedPerson);
    }
  });
});

// Route for deleting all people with a specific name
app.delete("/delete-by-name/:name", (req, res) => {
  const nameToDelete = req.params.name;

  Person.remove({ name: nameToDelete }, function (err, result) {
    if (err) {
      console.error(err);
      res.status(500).json({ error: "Error deleting people" });
    } else {
      console.log("Number of people deleted:", result.deletedCount);
      res
        .status(200)
        .json({
          message: "People deleted successfully",
          deletedCount: result.deletedCount,
        });
    }
  });
});

// Route for finding people who like burritos, sorted by name, with limited fields
app.get("/burrito-lovers", (req, res) => {
  Person.find({ favoriteFoods: "Burritos" })
    .sort({ name: 1 })
    .limit(2)
    .select("-age")
    .exec(function (err, data) {
      if (err) {
        console.error(err);
        res.status(500).json({ error: "Error finding people" });
      } else {
        console.log("People who like burritos:", data);
        res.status(200).json(data);
      }
    });
});

// Start the server
app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});
