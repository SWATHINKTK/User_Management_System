// Login Validation Admin & User

// Username validation 
function usernameValidate(data){
    const username = data.value;
    const userSection = document.getElementById('validateUsername');
    const userRegx = /^[a-zA-Z0-9._][^\/'":;,#$%&*()_=+]{3,}@[a-zA-Z]{3,}[.]{1}[a-zA-Z.]{2,}/ ;


    if( username == ''){
        userSection.innerHTML = "*Email is required."
    }else if(!(userRegx.test(username))){
        userSection.innerHTML = "*Please enter a valid email address."
    }
    else{
        userSection.innerHTML = '';
    }
}

// password Validation
function passwordValidate(data){
    const password = data.value;
    console.log(password.length)
    const userSection = document.getElementById('validatePassword');
    // const passRegex = /^[987]{1,}[^\/'":;,#$%&*()_=+a-zA-z][0-9]{9}/


    if( password == ''){
        userSection.innerHTML = "*Please enter a password"
    }else if(password.length < 4){
        userSection.innerHTML = "*The password you provided must have at least 6 characters"


    }
    else{
        userSection.innerHTML = '';
    }
}


// Profile Validation
function profileValidate(){
    
    const profile = document.getElementById('profile').value;

    
    if(profile == ''){
        document.getElementById('validate').innerHTML = 'Please attach a profile'
    }else{
        document.getElementById('validate').innerHTML = ''
    }

    

    

}


// Name validation First & Last
function nameValidate()
{
    const firstname = document.getElementById('firstname').value;
    const lastname = document.getElementById('lastname').value;
    if(firstname == ''){

        document.getElementById('first').innerHTML = 'Enter the field';

    }else if(lastname == ''){
        
        document.getElementById('last').innerHTML = 'Enter the field';

    }
    else{
        document.getElementById('first').innerHTML = ''
        document.getElementById('last').innerHTML = ''
    }
}


// PhoneNumber Validation 
function phnvalidation(){
    const phone = document.getElementById('phone').value;
    const phnRegex = /^[6-9]\d{9}$/;

    // console.log(typeof phone,phone.length)

    if(phone == ''){
        document.getElementById('phn').innerHTML = 'Phone number is required .';

    }else if(!(phnRegex.test(phone))){
        document.getElementById('phn').innerHTML = 'must have Proper format';

    }else{
        document.getElementById('phn').innerHTML = '';

    }
}




// Registeration Password Validation 
function regPassvalidate(){
    const password = document.getElementById('password').value;
    const confirm_password = document.getElementById('passwordconfirm').value;
    console.log(password)
    console.log(confirm_password)
    console.log(confirm_password == password)

    if(password == '' || password.length < 6){
        document.getElementById('passwordvalidate').innerHTML = 'Enter the field length must have 6+';
    }else{
        document.getElementById('passwordvalidate').innerHTML = '';
    }
    
    if(!(password == confirm_password)){
        document.getElementById('confirmvalidate').innerHTML = 'Password do not match';
    }else{
        document.getElementById('confirmvalidate').innerHTML = '';

    }


}







// function Validate(){
//     const username = document.getElementById('username').value;
//     const password = document.getElementById('password').value;
//     const userSection = document.getElementById('validateUser');

//     UserValidation
//     if( username == ''){
//         userSection.innerHTML = "*enter this field"
//     }
// }