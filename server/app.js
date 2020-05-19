const express = require('express');
const app = express();
const router = express.Router();
const bodyParser = require("body-parser");
const mongoose = require('mongoose');
var cors = require('cors');
app.use(cors());
const chalk = require('chalk');
const dotenv = require("dotenv");
dotenv.config();
const path = require('path')

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

//Route imports
const userRoute = require('./routes/userRoutes');
app.use('/user', userRoute)

//Load the Landing page for the form
app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, '../client/index.html'))
})

// Connect to Database
mongoose.connect('mongodb://localhost:27017/Feedback', {
        useCreateIndex: true,
        useNewUrlParser: true
    },
    () => {
        console.log(chalk.green.bold('Connected to MongoDB'))
    })

//Listen to Server
const port = process.env.PORT || 8000
app.listen(port, () => {
    console.log(chalk.bold.yellow.bgBlack('\nServer is up on port ', port))
})