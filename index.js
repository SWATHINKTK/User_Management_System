const express = require('express');
const mongoose = require('mongoose');
const app = express();

// mongoose to connect database
mongoose.connect('mongodb://127.0.0.1:27017')
    .then(() => console.log("connection established"))
    .catch((err) => console.log('connecation rejected',err.message))

// Hostname & Port Value Setting
const port = process.env.PORT || 5000;
const hostname = '127.0.0.1';

// user router
const user_route = require('./routers/userRouter');
app.use('/',user_route);



app.listen(port, () => {
    console.log(`Server is running at http://${hostname}:${port}/`)
})