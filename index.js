const express = require('express');
const mongoose = require('mongoose');
const path = require('path');
const app = express();


// Hostname & Port Value Setting
const port = process.env.PORT || 5000;
const hostname = '127.0.0.1';

// app.use((req, res, next) => {
//     res.setHeader('Cache-Control', 'no-store, must-revalidate'); // No caching allowed
//     next(); // Continue processing the request
//   });
const disableBackButton = (req, res, next) => {
    res.setHeader('Cache-Control', 'no-cache, no-store,must-revalidate');
    res.setHeader('Pragma', 'no-cache');
    res.setHeader('Expires', '1');
    next();
};





// static files adding 
app.use('/css',express.static(path.join(__dirname,'./public/css/style.css')));
app.use('/images',express.static(path.join(__dirname,'./public/Images')));
app.use('/script',express.static(path.join(__dirname,'./public/JavaScript')));



// mongoose to connect database
mongoose.connect('mongodb://127.0.0.1:27017/ums')
    .then(() => console.log("Database Connection Established"))
    .catch((err) => console.log('connecation rejected',err.message))



// User Router
const user_route = require('./routers/userRouter');
app.use('/', disableBackButton, user_route);


// Admin Router
const admin_route = require('./routers/adminRouter');
app.use('/admin', disableBackButton, admin_route);



app.use('*',(req,res)=>{
    res.sendStatus(500);
});

// Server Running Port Setting
app.listen(port, () => {
    console.log(`\nUser Server is Running at http://${hostname}:${port}/`);
    console.log(`\nAdmin Server is Running at http://${hostname}:${port}/admin\n`);
})


