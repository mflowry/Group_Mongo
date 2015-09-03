
// grab the things we need
var mongoose = require('mongoose');
var schema = mongoose.Schema;

// create a Mongoose Schema
var assignmentSchema = new schema({
    name: { type: String, required: true },
    assignment_name: { type: String, required: true },
    score:  Number,
    date_completed: Date
});





// the schema is USELESS until we create a model using it
var Assignment = mongoose.model('Assignment', assignmentSchema);

// makes the model available to the node application
module.exports = Assignment;