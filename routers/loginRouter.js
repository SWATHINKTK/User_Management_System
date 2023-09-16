const express = require('express');
const LoginControl = require('../controller/LoginControl');
const loginRouter = express();

// Setting Configurations
loginRouter.set('view engine','ejs');
loginRouter.set(express.urlencoded({extended:true}));

// Login Controller to Pass
loginRouter.get('/',LoginControl.loadUser);

module.exports = loginRouter;