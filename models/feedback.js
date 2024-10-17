const mongoose = require('mongoose');

const feedbackSchema = new mongoose.Schema({
    satisfaction: {
        type: Number,
        required: true,
        enum: [1, 2, 3, 4, 5], // Accepts only the values between 1 and 5
        min: 1,
        max: 5
    },
    comments: {
        type: String,
        required: true,
        trim: true, // Removes any extra spaces
        minlength: 1 // Ensures that a meaningful comment is provided
    },
    createdAt: {
        type: Date,
        default: Date.now // Automatically sets the date when the feedback was created
    }
});

// Compile the schema into a model
const Feedback = mongoose.model('Feedback', feedbackSchema);

module.exports = Feedback;
