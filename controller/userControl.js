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
        // res.send("hello")
        const userRegisterdata = new userdetils({
            firstname : req.body.firstname,
            lastname : req.body.lastname,
            email : req.body.email,
            phone : req.body.phone,
            profile : req.file.filename,
            password : req.body.password,
            is_admin : 0
        })
        console.log(userRegisterdata)
        const userdata = await userRegisterdata.save();
        res.send(userdata);
        

    }catch(err){
        console.log("Error details entering",err.message);
    }
}
module.exports = {
    loadRegister,
    userRegister
}