const express = require('express');
const user_route = express();

const userControl = require('../controller/userControl')

// router configurations
user_route.use(express.urlencoded({extended:true}));
user_route.set('view engine','ejs');

user_route.get('/register',userControl.loadRegister)

user_route.post('/register',userControl.userRegister)

module.exports = user_route;