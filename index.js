const express = require('express');
const mongoose = require('mongoose');
const path = require('path');
const app = express();

// Hostname & Port Value Setting
const port = process.env.PORT || 5000;
const hostname = '127.0.0.1';

// static files adding 
app.use('/css',express.static(path.join(__dirname,'./public/css/style.css')));


// mongoose to connect database
mongoose.connect('mongodb://127.0.0.1:27017/ums')
    .then(() => console.log("connection established"))
    .catch((err) => console.log('connecation rejected',err.message))



// User Router
const user_route = require('./routers/userRouter');
app.use('/',user_route);

// Admin Router
const admin_route = require('./routers/adminRouter');
app.use('/admin',admin_route);

app.listen(port, () => {
    console.log(`Server is running at http://${hostname}:${port}/`)
})