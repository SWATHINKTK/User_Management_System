const userdetils = require('../models/userModel');
const bcrypt = require('bcrypt');
const nodemailer = require('nodemailer');


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


// Send Verification 
const sendVerification = async(name ,email, user_id) => {
    try {
        console.log('verification');
        const transporter = nodemailer.createTransport({
            host:'smtp.gmail.com',
            port:587,
            secure:false,
            require:true,
            auth:{
                user:'swathinktk10@gmail.com',
                pass:'qkxm daqx mbkn czzx'
            }
        });

        const mailOptions = {
            from:'swathinktk10@gmail.com',
            to:email,
            subject:'For Verification Mail',
            html:'<p>Welcome '+name+', <br> Please Verify Your Account &nbsp; <a href="http://127.0.0.1:5000/verify?id='+user_id+'">Verify</a></p>'
        }
           
        transporter.sendMail(mailOptions, (error, info) => {
            if(error)
                console.log(error.message);
            else
                console.log("Email has been Sented",info.response);
        })

    } catch (error) {
        console.log(error.message);
    }
}

const verify = async(req,res) =>{
    try {
       await userdetils.updateOne({_id:req.query.id},{$set:{is_verified:1}});
       res.send("<h1>Your Account is Verifed </h1><a href='http://127.0.0.1:5000/'>Go to Login</a>");
       console.log('<H1>Your Account is Verified </h1>');
    } catch (error) {
        console.log(error.message);
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


// User Registration Post Request 
const userRegister = async(req,res) => {
    try{
        const dataBody = req.body;
        for( key in dataBody)
        {
            if(dataBody[key] == null || dataBody[key] == '')
            {
                res.render('userRegistration',{title:'register',text:"text-danger",message:"Enter All Field",Symbol:10071});
            }
        }
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
            if(userdata){
                const name = `${userRegisterdata.firstname} ${userRegisterdata.lastname}`
                sendVerification(name, userRegisterdata.email ,userRegisterdata._id);
                console.log("User Registraction Sucessful....")
                res.render('userRegistration',{title:'register',text:"text-success",message:"Registration succesful Please Check Your Mail And Verify", Symbol:9989, check:'sucess'});
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
        if(!(req.query.result))
        {
            res.render('userLogin',{title:'login'});
        }else if(req.query.data){
            res.render('UserLogin',{title:'login',text:'text-danger',Symbol:10071,message:req.query.data,result:'failed'});     

        }else{
            res.render('UserLogin',{title:'login',text:'text-danger',Symbol:10071,message:'Login Only Valid User',result:'failed'});     
        }
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
        
        
        if(userData && userData.is_admin == 0){
            if(userData.is_verified == 0){
                res.redirect('/?result=1&data=Please Verify Email');
                  
            }

            const passwordMatch = await bcrypt.compare(password,userData.password);
            if(passwordMatch)
            {
                req.session.user_id = userData._id;
                console.log(`${userData.firstname} ${userData.lastname} is Logged in`);
                res.redirect('/home');
                res.end();
            }else{
                res.redirect('/?result=1');
                // res.render('UserLogin',{title:'login',text:'text-danger',Symbol:10071,message:'Login Only Valid User',result:'failed'});     
            }
        }else{
            res.redirect('/?result=1');
            // res.render('userLogin',{title:'login',text:'text-danger',Symbol:10071,message:'Login Only Valid User',result:'failed'});
        }
    }catch(error){
        console.log(error.message);
    }
}



// Home page loading 
const loadHome = async(req,res) =>{
    try{
        const userdata = await userdetils.findOne({_id:req.session.user_id});
        const name = `${userdata.firstname} ${userdata.lastname}`.toUpperCase();
        res.render('userHome',{title:'home', image:userdata.profile, name:name, email:userdata.email, phone:userdata.phone});
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
    verify
}
