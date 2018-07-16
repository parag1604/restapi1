// app/models/todo.js
// load the things we need
var mongoose = require('mongoose');

// define the schema for our user model
var todoSchema = mongoose.Schema({

    todoFor: String,
    heading: String,
    mainContent: String,
    
});

// create the model for users and expose it to our app
module.exports = mongoose.model('Todo', todoSchema);
