const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const bodyParser = require('body-parser');
const authRoutes = require('./routes/auth');
const discussionRoutes = require('./routes/discussions'); // Import the discussions routes
require('dotenv').config();


const app = express();
const PORT = 5001;

app.use(cors());
app.use(bodyParser.json());

mongoose.connect('mongodb://localhost:27017/discussion_board', {
    useNewUrlParser: true,
    useUnifiedTopology: true,
});

const db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', () => {
    console.log('Connected to the database');
});

// Define routes here

app.get('/', (req, res) => {
    console.log('GET /');
    res.send('Server up and running');
    
})

app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});

// Imported routes
app.use('/api', authRoutes);
app.use('/api/discussions', discussionRoutes); // Use the discussions routes

