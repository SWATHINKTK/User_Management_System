const express = require('express');
const session = require('express-session');
const path = require('path');
const admin_router = express();

// Local Module Import
const admin_control = require('../controller/adminControl');
const config = require('../config/config');
const auth = require('../middleware/adminAuth');

// Configuration Setting And Session Creatiion
admin_router.set('view engine','ejs');
admin_router.use(express.urlencoded({extended:true}));
admin_router.use(express.static(path.join(__dirname,'../public/userImages')));

admin_router.use(session({
    secret:config.sessionSecret,
    resave:false,
    saveUninitialized:true,
}))




// Routing for the AdminPanel
admin_router.get('/',auth.isAdminLogout,admin_control.loadAdmin);
admin_router.get('/login',auth.isAdminLogout,admin_control.loadAdmin);
admin_router.post('/login',admin_control.adminVerify);
admin_router.get('/home',auth.isAdminLogin,admin_control.loadAdminHome);
admin_router.post('/logout',admin_control.adminLogout);
admin_router.post('/delete',admin_control.userDelete)



admin_router.get('*',(req,res) => {
    res.redirect('/admin');
})

module.exports = admin_router ;

