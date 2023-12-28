
var nameSignUp = document.getElementById('nameSignUp');
var email =  document.getElementById('email');
var password = document.getElementById('password');
var popUpShow = document.querySelector('#popupReg');
var popUpInner = document.querySelector('#popupReg p');
var usersList = JSON.parse(localStorage.getItem('users')) || [];
var userData = JSON.parse(localStorage.getItem('users')) || [];
var userName = document.querySelectorAll('.userName');
var logoutbutton = document.getElementById('logOut')
var loading = document.getElementById('loading')
var ol = document.querySelector('ol')
function signUp(){
    var users = {
        name: nameSignUp.value ,
        email:email.value,
        password:password.value,
    }
    var nameIsValid = validatelogin(nameSignUp.value, 'name');
    var emailIsValid = validatelogin(email.value, 'email');
    var passwordIsValid = validatelogin(password.value, 'password');

    var existingUser = usersList.find(users => users.email === email.value);
    if (nameIsValid && emailIsValid && passwordIsValid ){
        if (existingUser){
            popUpShow.classList.add('d-flex' )
        }else{
            usersList.push(users);
            localStorage.setItem('users' , JSON.stringify(usersList));
            popUpInner.innerHTML = ` مبروك انت دلوقتي سجلت في السيستم .. هنحولك 
            دلوقتي تسجل دخولك
            <i class="fa-regular fa-address-card"></i>`
            
            popUpShow.classList.add('d-flex' )
            loading.style.display = 'block';
            setTimeout(() => {
                window.location.href = "../../index.html";
            }, 2000);}
            }else{
        popUpInner.innerHTML = `     Name , Mail Or Password is not valid, Please follow the rules below :
        
        <ol class="rules list-unstyled m-0">
            <li>
            <i class="fa-regular fa-circle-right p-2"></i> name must
            contain at least 3 characters
            </li>
            <li>
            <i class="fa-regular fa-circle-right p-2"></i>E-Mail must be a
            valid Like . Example@mail.com
            </li>
            <i class="fa-regular fa-circle-right p-2"></i>Password Must be contain a 6 Num and " S , C " characters Like . 123456Aa
            </li>
        </ol>`;
        popUpShow.classList.add('d-flex' )
    }
}

function closePopUp(){
    popUpShow.classList.remove('d-flex' )
}

function clearForm(){
    nameSignUp.value = '';
    email.value = '';
    password.value = '';
}

function login(){
    var emailIsValid = validatelogin(email.value, 'email');
    var passwordIsValid = validatelogin(password.value, 'password');
    var checkAccount = usersList.find(users => users.email === email.value && users.password === password.value);
    if (emailIsValid && passwordIsValid) {
        if (checkAccount){
            localStorage.setItem('userData', JSON.stringify(checkAccount));
            loading.style.display = 'block';
            popUpInner.innerHTML = ` معلوماتك كلها صح دلوقتي هنحولك للداشبورد الخاصه بنا 
            <i class="fa-regular fa-address-card"></i>
            <p class='text-center'>جاري التحميل ....</p>`
            
            popUpShow.classList.add('d-flex' )
            setTimeout(() => {
                window.open("welcome.html" , "_self");
            }, 2000);
        }else{
            ol.classList.remove('d-none')
            popUpShow.classList.add('d-flex')
        }
    }else{
        ol.classList.remove('d-none')
        popUpShow.classList.add('d-flex' )
        
    }
}
document.addEventListener('DOMContentLoaded', function() {
    var userData = JSON.parse(localStorage.getItem('userData'));
    if (userData) {

        userName.forEach(function(element) {
            element.textContent = userData.name;
        });
    }
});
function logout() {
    window.open('index.html' , '_self')
    clearForm()
}
function validatelogin(value, field) {
    var regexName = /[a-zA-Z^\w]{3,}$/;
    var regexEmail = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    var regexPassword = /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{8,}$/;

    var isValid = false;

    switch (field) {
        case 'name':
            isValid = regexName.test(value);
            if (isValid) {
                document.getElementById('nameSignUp').classList.replace('is-invalid', 'is-valid');
            } else {
                document.getElementById('nameSignUp').classList.add('is-invalid');
            }
            break;
        case 'email':
            isValid = regexEmail.test(value);
            if (isValid) {
                document.getElementById('email').classList.replace('is-invalid', 'is-valid');
            } else {
                document.getElementById('email').classList.add('is-invalid');
            }
            break;
        case 'password':
            isValid = regexPassword.test(value);
            if (isValid) {
                document.getElementById('password').classList.replace('is-invalid', 'is-valid');
            } else {
                document.getElementById('password').classList.add('is-invalid');
            }
            break;
        default:
            break;
    }

    return isValid;
}
