const loadUser = async (req,res) => {
    try {
        res.render('login');
    } catch (error) {
        console.log(error.message);
    }
}


const verifyLogin = async(req,res) => {
    
}

module.exports = {loadUser};