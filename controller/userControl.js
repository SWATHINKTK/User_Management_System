const userdetils = require('../models/userModel');

const loadRegister = async(req,res)=>{
    try{
        res.render('registration');
    }
    catch(err){
        console.log("Error details entering",err.message);
    }
}

const userRegister = async(req,res) => {
    try{
        console.log(req.body)
        res.send("hello")
        const userRegisterdata = {
            firstname : req.body.firstname,
            lastname : req.body.lastname,
            email : req.body.email,
            phone : req.body.phone,
            image : req.file.filename,
            password : req.body.password,
            is_admin : 0
        }
        const userdata = await userregisterdata.save();
        res.send(userdata);
        
    }catch(err){
        console.log("Error details entering",err.message);
    }
}
module.exports = {
    loadRegister,
    userRegister
}