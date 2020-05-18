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

//Route imports
const userRoute = require('./routes/userRoutes');


app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));


app.get('/', (req, res) => {
    res.send({
        statusCode: 200,
        payload: {
            msg: "The Backend is healthy and running",
        },
    }).status(200)
})

app.use('/user', userRoute)

// Database
mongoose.connect('mongodb://localhost:27017/timeDB', { useNewUrlParser: true, useUnifiedTopology: true }, () => {
    // eslint-disable-next-line no-console
    console.log('Connected to DB')
})
mongoose.set('useCreateIndex', true)
mongoose.set('useFindAndModify', false)



const port = process.env.PORT || 8000
app.listen(port, () => {
    console.log('Server is up on port ', port)
})