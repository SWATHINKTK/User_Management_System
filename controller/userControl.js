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
        res.render('registration');
    }
    catch(err){
        console.log("Error details entering",err.message);
    }
}


// User Registration Post Request 
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
        const userdata = await userRegisterdata.save();
        console.log("User Registraction Sucessful....")
        if(userdata){
            res.render('registration',{title:'register',text:"text-success",message:"Registration succesful", Symbol:9989});
        }
        else{
            res.render('registration',{title:'register',text:"text-danger",message:"Registration Field",Symbol:10071});
        }
    }catch(err){
        console.log("Error details entering",err.message);
    }
}


// exporting module
module.exports = {
    loadRegister,
    userRegister
}