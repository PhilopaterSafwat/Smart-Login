var signupName = document.querySelector('#signupName');
var signupEmail = document.querySelector('#signupEmail');
var signupPassword = document.querySelector('#signupPassword');
var SignUp = document.querySelector('.Sign-Up');
var signinEmail = document.querySelector('#signinEmail');
var signinPassword = document.querySelector('#signinPassword');
var Login = document.querySelector('.Login');
var exist = document.querySelector('.exist');
var Success = document.querySelector('.Success');
var username = document.querySelector('#username');
var gallry = document.querySelector('.gallry')
var nameCheck = document.querySelector('.nameCheck')
var mailCheack = document.querySelector('.mailCheack')
var passCheck = document.querySelector('.passCheck')
var incorrect = document.querySelector('.incorrect')
var users = [];
var options = document.querySelector("#mySelect")
var option = "pizza";
var rgx = {
    name: /[A-Z][a-z]{2,10}/,
    email: /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/,
    pass: /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[a-zA-Z]).{5,}$/gm,
};

async function pizaaRes() {
    var response = await fetch(`https://forkify-api.herokuapp.com/api/search?q=${option}`);
    var pizza = await response.json();
    var recipes = pizza.recipes;
    display(recipes)
}
if (options !== null) {
    options.addEventListener("change", () => {
        option = options.value;
        pizaaRes();
    })
}

pizaaRes();


function display(list) {
    var container = "";
    for (let i = 0; i < 12; i++) {
        container += `<div class="col-lg-4">
        <figure class="position-relative">
            <div class="img">
                <img src="${list[i].image_url}" class="w-100 h-100 object-fit-cover">
            </div>
            <figcaption>
                <h2>${list[i].title}</h2>
                <p>Lorem ipsum dolor sit</p>
            </figcaption>
        </figure>
    </div>`
    }
    if (gallry !== null) {
        gallry.innerHTML = container;
    }
}



if (localStorage.getItem('users') !== null) {
    users = JSON.parse(localStorage.getItem('users'))
}
if (localStorage.getItem('username') !== null) {
    if (username != null) {
        username.innerHTML = `Welcome ${localStorage.getItem('username')}`
    }
}



/*Sing UP Steps*/
if (SignUp !== null) {
    SignUp.addEventListener("click", function () {
        if (signupName.value == "" || signupEmail.value == "" || signupPassword.value == "") {
            exist.innerHTML = 'All inputs is required'
        }
        if (rgx.name.test(signupName.value) && rgx.email.test(signupEmail.value) && rgx.name.test(signupPassword.value)) {
            add();
        }
    })
    checkAllInputs();
}
function add() {
    var emailExsit = false;
    for (let i = 0; i < users.length; i++) {
        if (signupEmail.value === users[i].email) {
            emailExsit = true;
            break;
        }
    }
    if (signupName.value !="" || signupEmail.value != "" || signupPassword.value != "") {
        if (emailExsit == false) {
            var newUser = {
                name: signupName.value,
                email: signupEmail.value,
                pass: signupPassword.value
            }
            users.push(newUser)
            localStorage.setItem('users', JSON.stringify(users))
            Success.classList.replace('d-none', 'd-block')
            if (exist.innerHTML != "") {
                exist.innerHTML = "";
            }
        }
        else {
            exist.innerHTML = 'email already exists'
            Success.classList.replace('d-block', 'd-none')
        }
    }
}
function checkAllInputs() {
    signupName.addEventListener('keyup', () => {
        if (rgx.name.test(signupName.value)) {
            if (signupName.classList.contains('is-invalid')) {
                signupName.classList.remove('is-invalid')
            }
            signupName.classList.add('is-valid')
            nameCheck.classList.add('text-success')
        }
        else {
            signupName.classList.remove('is-valid')
            signupName.classList.add('is-invalid')
            nameCheck.classList.remove('text-success')
        }
    })
    signupEmail.addEventListener('keyup', () => {
        if (rgx.email.test(signupEmail.value)) {
            if (signupEmail.classList.contains('is-invalid')) {
                signupEmail.classList.remove('is-invalid')
            }
            signupEmail.classList.add('is-valid')
            mailCheack.classList.add('text-success')
        }
        else {
            signupEmail.classList.remove('is-valid')
            signupEmail.classList.add('is-invalid')
            mailCheack.classList.remove('text-success')
        }
    })
    signupPassword.addEventListener('keyup', () => {
        if (rgx.pass.test(signupPassword.value)) {
            if (signupPassword.classList.contains('is-invalid')) {
                signupPassword.classList.remove('is-invalid')
            }
            signupPassword.classList.add('is-valid')
            passCheck.classList.add('text-success')

        }
        else {
            signupPassword.classList.remove('is-valid')
            signupPassword.classList.add('is-invalid')
            passCheck.classList.remove('text-success')
        }
    })
}


/*Login Steps*/
if (Login != null) {
    Login.addEventListener("click", function () {
        if (signinEmail.value == "" || signinPassword.value == "") {
            exist.innerHTML = 'All inputs is required'
        }
        else {
            for (let i = 0; i < users.length; i++) {
                if (signinEmail.value == users[i].email && signinPassword.value == users[i].pass) {
                    localStorage.setItem('username', users[i].name)
                    window.location.href = "wellcome.html";
                    break;
                }
                else {
                    incorrect.classList.replace("d-none", "d-block")
                    if (exist.innerHTML != "") {
                        exist.innerHTML = "";
                    }
                }
            }
        }
    })
}
/*LogOut Steps*/
function logout() {
    localStorage.removeItem('username')
}


