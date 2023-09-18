const userdetils = require('../models/userModel');
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



// view Register Page 
const loadRegister = async(req,res)=>{
    try{
        res.render('userRegistration',{title:'register'});
    }
    catch(err){
        console.log("Error details entering",err.message);
    }
}


// User Registration Post Request 9888
const userRegister = async(req,res) => {
    try{
        const securepassword = await encryptPassword(req.body.password)
        const userRegisterdata = new userdetils({
            firstname : req.body.firstname,
            lastname : req.body.lastname,
            email : req.body.email,
            phone : req.body.phone,
            profile : req.file.filename,
            password : securepassword,
            is_admin : 0
        })

        // checking the email is exicted or not
        const matchedemail = await userdetils.findOne({email:req.body.email});
        if(matchedemail){

            res.render('UserRegistration',{title:'register',text:"text-danger",message:"Existing email",Symbol:10071});

        }else{

            const userdata = await userRegisterdata.save();
            console.log("User Registraction Sucessful....")
            if(userdata){
                res.render('userRegistration',{title:'register',text:"text-success",message:"Registration succesful", Symbol:9989});
            }
            else{
                res.render('userRegistration',{title:'register',text:"text-danger",message:"Registration Field",Symbol:10071});
            }
        }
    }catch(err){
        console.log("Error details entering",err.message);
    }
}


// user login page loading
const loadUser = async (req,res) => {
    try {
        res.render('userLogin',{title:'login'});
    } catch (error) {
        console.log(error.message);
    }
}

// user login verification
const verifyLogin = async(req,res) => {
    try{
        const username = req.body.username;
        const password = req.body.password;

        const userData = await userdetils.findOne({email:username});
        
        if(userData){
            const passwordMatch = await bcrypt.compare(password,userData.password);
            if(passwordMatch)
            {
                req.session.user_id = userData._id;
                console.log(`${userData.firstname} ${userData.lastname} is Logged in`);
                res.redirect('/home');
                res.end();
            }else{
                res.render('UserLogin',{title:'login',text:'text-danger',Symbol:10071,message:'Login Only Valid User'});     
            }
        }else{
            res.render('userLogin',{title:'login',text:'text-danger',Symbol:10071,message:'Login Only Valid User'});
        }
    }catch(error){
        console.log(error.message);
    }
}

// Home page loading 
const loadHome = async(req,res) =>{
    try{
        const userdata = await userdetils.findOne({_id:req.session.user_id});
        console.log(userdata);
        res.render('userHome',{title:'home',image:userdata.profile,name:`${userdata.firstname} ${userdata.lastname}`,email:userdata.email,phone:userdata.phone});
    }catch(error){
        console.log(error.message);
    }
}


// user Logout
const userLogout = async(req,res) => {
    try{
        req.session.destroy();
        res.redirect('/');
        console.log("User Logout Sucessfuly")
    }catch(error){
        console.log(error.message);
    }
}

// exporting module
module.exports = {
    loadRegister,
    userRegister,
    loadUser,
    verifyLogin,
    loadHome,
    userLogout,
}