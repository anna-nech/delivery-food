'use strict';

const buttonAuth = document.querySelector('.button-auth');
const buttonOut = document.querySelector('.button-out');
const modalAuth = document.querySelector('.modal-auth');
const closeAuth = document.querySelector('.close-auth');
const logInForm = document.querySelector('#logInForm');
const loginInput = document.querySelector('#login');
const userName = document.querySelector('.user-name');
const cardsRestaurants = document.querySelector('.cards-restaurants');


function openModalAuth() {
    modalAuth.classList.add('is-open');
    loginInput.style.border = "1px solid #ccc";
    disableScroll();
}

function closeModalAuth() {
    modalAuth.classList.remove('is-open');
     enableScroll();  
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

loginInput.addEventListener('input', () => {
    loginInput.style.border = "1px solid #ccc";
});

modalAuth.addEventListener('click', (event) => {
    if (event.target.classList.contains('modal-auth')) {
        closeModalAuth();
        enableScroll();
    }
});

function disableScroll() {
    document.body.dbScrollY = window.scrollY;

    document.body.style.cssText = `
        position: fixed;
        top: -${window.scrollY}px;
        left: 0;
        width: 100%;
        overflow: hidden;
        height: 100vh;
    `;
}

function enableScroll() {
    document.body.style.cssText = '';
    window.scroll({ top: document.body.dbScrollY });
}

function createRestaurantCard(data) {
  const card = document.createElement('a');
  card.className = 'card card-restaurant';
  card.href = 'restaurant.html';

  card.insertAdjacentHTML('beforeend', `
    <img src="${data.image}" alt="image" class="card-image">
    <div class="card-text">
      <div class="card-heading">
        <h3 class="card-title">${data.name}</h3>
        <span class="card-tag tag">${data.time}</span>
      </div>
      <div class="card-info">
        <div class="rating">${data.rating}</div>
        <div class="price">від ${data.price} ₴</div>
        <div class="category">${data.category}</div>
      </div>
    </div>
  `);

  cardsRestaurants.insertAdjacentElement('beforeend', card);
}

function renderRestaurants() {
  cardsRestaurants.textContent = '';
  restaurantsData.forEach(createRestaurantCard);
}

renderRestaurants();

cardsRestaurants.addEventListener('click', function (event) {
  const restaurant = event.target.closest('.card-restaurant');
  if (!restaurant) return;

  const user = localStorage.getItem('user');

  if (!user) {
    event.preventDefault(); 
    openModalAuth();
  }
});

buttonAuth.addEventListener('click', openModalAuth);
closeAuth.addEventListener('click', closeModalAuth);
logInForm.addEventListener('submit', login);
buttonOut.addEventListener('click', logout);

checkAuth();
