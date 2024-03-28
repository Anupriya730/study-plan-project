// Importing required modules
const express = require('express');
const path = require('path');
const mongoose = require('mongoose');
const User = require("./models/user");
const Questionnaire = require("./models/questionnaire");
const bcrypt = require('bcrypt');
const app = express();


app.use(express.json());
app.use(express.urlencoded({extended: true}));
app.use(express.static(path.join(__dirname, 'public')));

// Connect to the MongoDB server
mongoose.connect('mongodb+srv://anupriya7996:eLSPjxnwvWwe73SG@cluster0.5vnmcrj.mongodb.net/study-plans?retryWrites=true&w=majority&appName=Cluster0')
    .then(() => console.log('MongoDB Connected...'))
    .catch(err => console.log(err));


app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'public', 'index.html'));
});


app.post('/signup-form', (req, res) => {

    const newUser = new User(req.body);

    User.findOne({email: newUser.email}).exec()
        .then(existingUser => {
            if (existingUser) {
                // User found
                console.error('Error Registering User');
                return res.status(409).json({message: 'User already exists'});
            } else {
                bcrypt.genSalt(10, (err, salt) => {
                    if (err) {
                        console.error('Error generating salt:', err);
                        return;
                    }
                    bcrypt.hash(newUser.password, salt, (err, hash) => {
                        if (err) {
                            console.error('Error hashing password:', err);
                            return;
                        }
                        newUser.password = hash; // Set the hashed password
                        newUser.save()
                            .then(() => {
                                console.log('User saved successfully!');
                                return res.status(201).json({message: 'user registered successfully'});
                            })
                            .catch((err) => {
                                console.error('Error saving user:', err);
                            });
                    });
                });
            }
        })
        .catch(err => {
            // Error handling
            console.error('Error finding user by email:', err);
            res.status(500).json({message: 'Internal Server Error'});
        });

});

app.post('/sign-in', async (req, res) => {
    const {username, password} = req.body;
    try {
        const user = await User.findOne({email: username});
        if (!user) {
            // User not found
            return res.status(404).json({message: 'Incorrect username or password'});
        }
        // Compare the provided password with the stored password
        const isPasswordValid = await user.comparePassword(password);
        if (!isPasswordValid) {
            // Incorrect password
            return res.status(401).json({message: 'Incorrect username or password'});
        }
        // user auth successful
        console.log('user auth successful');
        return res.status(200).json({message: 'user auth successful', email: username});
    } catch (error) {
        console.error('Error during login:', error);
        res.status(500).json({message: 'Internal server error'});
    }
});

app.post('/questionnaire-form', async (req, res) => {

    console.log(req.body);

    try {

        // Create a new questionnaire document
        const existingQuestionnaire = await  Questionnaire.findOne({ email: req.body.email });
        if (existingQuestionnaire) {
            // Save it to the database
            existingQuestionnaire.set(req.body);
            await existingQuestionnaire.save();

            return res.status(200).json({message: 'Form submitted successfully!', email: req.body.email});
        }
        else
        {
            const newQuestionnaire = new Questionnaire(req.body);
            await newQuestionnaire.save();
            return res.status(201).json({ message: 'Form submitted successfully!', email: req.body.email });
        }

    } catch (error) {
        console.error('Error saving form data:', error);
        res.status(500).json({error: 'Internal server error'});
    }

});

app.post('/payment', (req, res) => {
    res.sendFile(path.join(__dirname, 'public', 'thankyou.html'));
});

// Start the server
const port = process.env.PORT || 3000;
app.listen(port, () => console.log(`Server is running on port ${port}`));
