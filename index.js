const mongoose = require('mongoose');
require('dotenv').config();

const uri = process.env.MONGO_URI;

mongoose.connect(uri, {
  serverApi: { version: '1', strict: true, deprecationErrors: true },
})
.then(() => console.log("Connected to MongoDB via Mongoose"))
.catch(err => console.error(err));

const Recipe = require('./models/recipe');

async function createRecipe() {
  const DefaultRecipe = new Recipe({
    title: "Classic Tomato Soup",
    description: "A simple and delicious homemade tomato soup.",
    ingredients: ["Tomatoes", "Onion", "Garlic", "Vegetable Broth", "Olive Oil"],
    instructions: "1. Sauté onions and garlic. 2. Add tomatoes and broth. 3. Simmer and blend.",
    prepTimeInMinutes: 30
  });

  try {
    
    const result = await DefaultRecipe.save();
    console.log(`Inserted document with _id: ${result._id}`);

  } 
  catch (e) {
    console.error("Error inserting document:", e);
  }
}

async function findAllRecipes() {
  try {

    const recipes = await Recipe.find();

    console.log('All recipes:', recipes);

  } 
  catch (err) {
    console.error('Error retrieving recipes:', err);
  }
}

async function findRecipeByTitle(title) {
  try {
    
    const recipe = await Recipe.findOne({ title: title });

    if (recipe) {
      console.log('Recipe found:', recipe);
    } 
    else {
      console.log(`No recipe found with title "${title}"`);
    }
  } 
  catch (err) {
    console.error('Error finding recipe:', err);
  }
}

async function updateRecipeDescription(title, newDescription) {

  try {

    const updatedRecipe = await Recipe.findOneAndUpdate(
      { title: title },
      { $set: { description: newDescription } },
      { new: true }
    );

    console.log('Updated recipe:', updatedRecipe);

  } 
  catch (err) {
    console.error('Error updating recipe', err);
  }
}

async function deleteRecipe(title) {

  try {

    const deletedRecipe = await Recipe.findOneAndDelete({ title: title });

    if (deletedRecipe) {
      console.log(title + " successfully deleted!");
    } 
    else {
      console.log(title + " has not been deleted!");
    }
  } 
  catch (err) {
    console.error(err);
  }
}

async function run() {

  try {

    await createRecipe();
    await findAllRecipes();
    await findRecipeByTitle("Classic Tomato Soup");
    await updateRecipeDescription("Classic Tomato Soup", "This description was updated from the index.js code!");
    await deleteRecipe("Classic Tomato Soup");

  } 
  catch (err) {
    console.error(err);
  } 
  finally {
    mongoose.connection.close();
  }
}

run();
