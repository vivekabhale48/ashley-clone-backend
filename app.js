const express = require('express');
const app = express();
const mongoose = require('mongoose');
const homeRoute = require('./src/Routes/HomePageRoutes');
const middleHomeRoute = require('./src/Routes/MiddleHomePageRoute');
const fileUpload = require('express-fileupload');
const cors = require('cors');

// Middleware
app.use(cors()); // Enable Cross-Origin Resource Sharing
app.use(express.json()); // Parse JSON request bodies
app.use(fileUpload({ useTempFiles: true })); // Handle file uploads

// Routes
app.use('/', homeRoute); // Use the routes defined in HomePageRoutes.js
app.use('/',middleHomeRoute);
// Error Handling Middleware
app.use((err, req, res, next) => {
    console.error(err);
    res.status(500).json({ error: 'Internal server error' });
});

// Connect to MongoDB
mongoose.connect('mongodb+srv://Swordsman48:Swordsman48@ashleyclone.yfprtnd.mongodb.net/?retryWrites=true&w=majority')
    .then(() => {
        console.log('Connected to the Database');
    })
    .catch((e) => {
        console.log('Error occurred', e);
    });

// Start the server
const port = 3000;
app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});
