'use strict';

const buttonAuth = document.querySelector('.button-auth');
const buttonOut = document.querySelector('.button-out');
const modalAuth = document.querySelector('.modal-auth');
const closeAuth = document.querySelector('.close-auth');
const logInForm = document.querySelector('#logInForm');
const loginInput = document.querySelector('#login');
const userName = document.querySelector('.user-name');

function openModalAuth() {
    modalAuth.classList.add('is-open');
    loginInput.style.border = "1px solid #ccc";
}

function closeModalAuth() {
    modalAuth.classList.remove('is-open');
}

function login(event) {
    event.preventDefault();

    const login = loginInput.value.trim();

    if (!login) {
        loginInput.style.border = "2px solid red";
        loginInput.placeholder = "Введіть логін!";
        return;
    }

    localStorage.setItem('user', login);

    userName.textContent = login;
    userName.style.display = 'inline';

    buttonAuth.style.display = 'none';
    buttonOut.style.display = 'block';

    closeModalAuth();
    logInForm.reset();
}

function logout() {
    localStorage.removeItem('user');

    userName.textContent = '';
    userName.style.display = 'none';

    buttonAuth.style.display = 'block';
    buttonOut.style.display = 'none';
}

function checkAuth() {
    const user = localStorage.getItem('user');

    if (user) {
        userName.textContent = user;
        userName.style.display = 'inline';

        buttonAuth.style.display = 'none';
        buttonOut.style.display = 'block';
    } else {
        buttonAuth.style.display = 'block';
        buttonOut.style.display = 'none';
    }
}

buttonAuth.addEventListener('click', openModalAuth);
closeAuth.addEventListener('click', closeModalAuth);
logInForm.addEventListener('submit', login);
buttonOut.addEventListener('click', logout);

checkAuth();
