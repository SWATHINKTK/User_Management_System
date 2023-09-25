const express = require('express');
const session = require('express-session');
const path = require('path');
const multer = require('multer');
const admin_router = express();

// Local Module Import
const admin_control = require('../controller/adminControl');
const config = require('../config/config');
const auth = require('../middleware/adminAuth');

// Configuration Setting And Session Creatiion
admin_router.set('view engine','ejs');
admin_router.use(express.static(path.join(__dirname,'../public/userImages')));
admin_router.use(express.urlencoded({extended:true}));

admin_router.use(session({
    secret:config.sessionSecret,
    resave:false,
    saveUninitialized:true,
}))


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


// Routing for the AdminPanel
admin_router.get('/', auth.isAdminLogout, admin_control.loadAdmin);

admin_router.get('/login', auth.isAdminLogout, admin_control.loadAdmin);

admin_router.post('/login', admin_control.adminVerify);

admin_router.get('/home' , auth.isAdminLogin, admin_control.loadAdminHome);

admin_router.post('/logout',admin_control.adminLogout);

admin_router.post('/delete', auth.isAdminLogin, admin_control.userDelete);

admin_router.get('/register', auth.isAdminLogin, admin_control.loadUserRegistration);

admin_router.post('/register', upload.single('profile'), auth.isAdminLogin, admin_control.userRegister);

admin_router.post('/edit', auth.isAdminLogin, admin_control.loadEdit);

admin_router.post('/editcontent', auth.isAdminLogin, admin_control.editContent);

admin_router.post('/search', auth.isAdminLogin, admin_control.UserSearch);

admin_router.get('/verify', admin_control.verify);

admin_router.post('/forgotpassword',admin_control.forgotpassword);

admin_router.get('*',(req,res) => {
    if(req.session.admin_id){
        res.redirect('/admin/home')
    }else{
        res.redirect('/admin');
    }
})

module.exports = admin_router ;

