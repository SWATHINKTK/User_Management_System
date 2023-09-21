const userDetails = require('../models/userModel');
const bcrypt = require('bcrypt');


// bcrypt is used to encrypting the password
const saltround = 10;
async function encryptPassword(password){
    try{
        const passwordhash = await bcrypt.hash(password,saltround);
        return passwordhash;
    }catch(err){
        console.log(err.message);
    }
}


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
                console.log("Admin Logout")
            }
        });
        
    } catch (error) {
        console.log(error.message);
    }
}




// User Registration form Load 
const loadUserRegistration = async(req,res) => {
    try{
        console.log(req.query.message)
        res.render('adminUserRegistration',{title:"UserRegstration"})
    }
    catch(error){
        console.log(error.message);
    }
}



// User Registration Post Request 
const userRegister = async(req,res) => {
    try{
        obj = req.body;
        console.log(obj)
        for (var key in obj) {
            if (obj[key] == null || obj[key] == '')
                res.render('adminUserRegistration',{title:'register',text:"text-danger",message:"Enter All Field ",Symbol:10071});
                
        }
        console.log(Object.keys(req.body).length)
        console.log(obj);
        const securepassword = await encryptPassword(req.body.password);
        const userRegisterdata = new userDetails({
            firstname : req.body.firstname,
            lastname : req.body.lastname,
            email : req.body.email,
            phone : req.body.phone,
            profile : req.file.filename,
            password : securepassword,
            is_admin : 0
        })

        // checking the email is exicted or not
        const matchedemail = await userDetails.findOne({email:req.body.email});
        if(matchedemail){

            res.render('adminUserRegistration',{title:'register',text:"text-danger",message:"Existing email",Symbol:10071});

        }else{

            const userdata = await userRegisterdata.save();
            console.log("User Registraction Sucessful....")
            if(userdata){
                res.render('adminUserRegistration',{title:'register',text:"text-success",message:"Registration succesful",Symbol:9989,reg_res:'Sucess'});
            }
            else{
                res.render('adminuserRegistration',{title:'register',text:"text-danger",message:"Registration Field",Symbol:10071});
            }
        }
    }catch(err){
        console.log("Error details entering",err.message);
    }
}





// User Delete 
const userDelete = async(req,res) => {
    try {
        const id = req.query.id;
        await userDetails.deleteOne({_id:id});
        res.redirect('/admin/home#viewuser');
    } catch (error) {
        console.log(error.message)
    }
}









// User edit page viewing 
const loadEdit = async(req,res) => {
    try {
        const id = req.query.id;
        const data = await userDetails.findOne({_id:id});
        console.log(data.phone)
        res.render('adminEditUser',{title:"Edit User",firstname:data.firstname,lastname:data.lastname,email:data.email,phone:data.phone, id:id})
    } catch (error) {
        console.log(error.message);
    }
}



// Update the edited Content 
const editContent = async(req,res) => {
    try {
        var x= req.body;
        console.log(Object.keys(x).length)
        const length = Object.keys(x).length;

        if(length == 5){
            await userDetails.updateOne({_id:req.body.id},{$set:{firstname:req.body.firstname, lastname:req.body.lastname, email:req.body.email, phone:req.body.phone}});
            res.redirect('/admin/home#viewuser');
        }else{
            res.render('adminEdituser',{title:'Edit User',text:"text-danger",message:"Fill in All field",Symbol:10071});
        }
    } catch (error) {
        console.log(error.message)
    }
}




// Admin user Search 
const UserSearch = async(req,res) => {
    try {
        let search = req.body.search;
        const regex = new RegExp(`^${search}`, 'i');
        const details = await userDetails.find({firstname:{$regex:regex},is_admin:0});
        // res.render('adminHome',{title:'AdminHome',users:details});
        res.render('adminSearchUser',{users:details});
        console.log(details);
    } catch (error) {
        console.log(error.message);
    }
}





module.exports = {
    loadAdmin,
    adminVerify,
    loadAdminHome,
    adminLogout,
    userDelete,
    userRegister,
    loadUserRegistration,
    loadEdit,
    editContent,
    UserSearch
}

