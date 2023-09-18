const userDetails = require('../models/userModel');
const bcrypt = require('bcrypt');




// Admin Login Page Load
const loadAdmin = (req,res) => {
    try{
        res.render('adminLogin',{title:'Admin'});
    }catch(error){
        console.log(error.message);
    }
} 

// Admin Login to redirect to Admin Home 
const adminVerify = async(req,res) => {
    try {
        const username = req.body.username;
        const password = req.body.password;
        const admindata = await userDetails.findOne({email:username});

        if(admindata && admindata.is_admin == 1){
            const matchPassword = await bcrypt.compare(password,admindata.password);
            if(matchPassword)
            {
                req.session.admin_id = admindata._id;
                console.log("Admin Logged in");
                return res.redirect('/admin/home');
            }else{

                return res.render('adminLogin',{title:'Admin',text:'text-danger',Symbol:10071,message:'Login Only Valid Admin'}); 
            }      
        }else{
            return res.render('adminLogin',{title:'Admin',text:'text-danger',Symbol:10071,message:'Login Only Valid Admin'});
        }

    } catch (error) {
        console.log(error.message);
    }
}





// Admin Home Window loading
const loadAdminHome = async(req,res) => {
    try {
        console.log("admin Home");
        const userData = await userDetails.find({is_admin:0}).sort({is_verified:-1});
        res.render('adminHome',{title:'AdminHome',users:userData});
            
    } catch (error) {
        console.log(error.message);
    }
}

// Admin Logout 
const adminLogout = (req,res) => {
    try {
        req.session.destroy((er)=>{
            if(er){
                console.log(er)
            }else{
                res.redirect('/admin');
            }
        });
        
    } catch (error) {
        console.log(error.message);
    }
}


// User Delete 
const userDelete = async(req,res) => {
    try {
        const id = req.query.id;
        await userDetails.deleteOne({_id:id});
        res.redirect('/admin/home')
    } catch (error) {
        console.log(error.message)
    }
}



module.exports = {
    loadAdmin,
    adminVerify,
    loadAdminHome,
    adminLogout,
    userDelete
}
