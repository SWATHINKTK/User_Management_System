const express = require('express');
const path = require('path');
const multer = require('multer');
const user_route = express();

const userControl = require('../controller/userControl')

// router configurations
user_route.use(express.urlencoded({extended:true}));
user_route.set('view engine','ejs');




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
user_route.get('/register',userControl.loadRegister)
user_route.post('/register',upload.single('profile'),userControl.userRegister)

module.exports = user_route;