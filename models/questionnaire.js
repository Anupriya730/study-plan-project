const mongoose = require('mongoose');
const questionnaireSchema = new mongoose.Schema({
    primary_goal: {
        type: String,
        required: true
    },
    subjects_of_interest: {
        type: Array,
        required: true
    },
    confidence_level: {
        type: String,
        required: true
    },
    learning_style: {
        type: Array,
        required: true
    },
    time_dedication: {
        type: String,
        required: true
    },
    has_deadlines: {
        type: Boolean,
        required: true
    },
    has_prior_experience: {
        type: Boolean,
        required: true
    },
    study_materials: {
        type: Array,
        required: true
    },
    anticipated_challenges: {
        type: Array,
        required: true
    },
    progress_tracking: {
        type: Array,
        required: true
    },
    email: {
        type: String,
        required: true,
        unique: true
    },
    subjects_scores: {
        math: {
            type: Number,
            required: true
        },
        science: {
            type: Number,
            required: true
        },
        english: {
            type: Number,
            required: true
        },
        history: {
            type: Number,
            required: true
        },
        geography: {
            type: Number,
            required: true
        },
        art: {
            type: Number,
            required: true
        }
    }
}, { collection: 'questionnaire' });



const Questionnaire = mongoose.model('Questionnaire', questionnaireSchema);

module.exports = Questionnaire;