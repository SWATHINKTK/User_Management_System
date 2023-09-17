const express = require('express');
const path = require('path');
const multer = require('multer');
const session = require('express-session');
const user_route = express();


const userControl = require('../controller/userControl');
const config = require('../config/config');
const auth = require('../middleware/auth');

// router configurations and Static file accessing
user_route.use(express.static(path.join(__dirname,'../public/userImages')));
user_route.use(express.urlencoded({extended:true}));
user_route.set('view engine','ejs');


// middleware for session
user_route.use(session({
    secret:config.sessionSecret,
    resave:false,
    saveUninitialized:false
}));


// multer is used to upload file 
const storage = multer.diskStorage({
    destination:(req,file,cb) => {
        cb(null,path.join(__dirname,'../public/userImages'));
    },
    filename:(req,file,cb) => {
        const name = Date.now()+'-'+file.originalname;
        cb(null,name)
    }
});
const upload = multer({storage:storage})

// routing
user_route.get('/register',auth.isLogout,userControl.loadRegister);
user_route.post('/register',upload.single('profile'),userControl.userRegister);
user_route.get('/',auth.isLogout,userControl.loadUser);
user_route.get('/login',auth.isLogout,userControl.loadUser);
user_route.post('/login',userControl.verifyLogin);
user_route.get('/home',auth.isLogin,userControl.loadHome);
user_route.post('/logout',auth.isLogin,userControl.userLogout)



module.exports = user_route;