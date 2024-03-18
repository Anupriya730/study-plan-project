// Importing required modules
const express = require('express');
const path = require('path');
const mongoose = require('mongoose');
const User = require("./models/user");
const app = express();


app.use(express.json());

// Connect to the MongoDB server
mongoose.connect('mongodb+srv://palanisamyhariprakash:GFF7yP9qv7DNY68l@cluster0.qohkooz.mongodb.net/study-plans?retryWrites=true&w=majority')
    .then(() => console.log('MongoDB Connected...'))
    .catch(err => console.log(err));

// Serve static files from the "public" directory
app.use(express.static(path.join(__dirname, 'public')));

// A sample route
app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'public', 'index.html'));
});

// Parse URL-encoded bodies (as sent by HTML forms)
app.use(express.urlencoded({ extended: true }));

// Handle form submission
app.post('/submit-form', (req, res) => {

    const newUser = new User(req.body);

    newUser.save()
        .then(() => {
            console.log('User saved successfully!');
        })
        .catch((err) => {
            console.error('Error saving user:', err);
        });
});

// Start the server
const port = process.env.PORT || 3000;
app.listen(port, () => console.log(`Server is running on port ${port}`));
