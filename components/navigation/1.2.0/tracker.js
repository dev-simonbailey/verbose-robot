let navBar = document.getElementById('navbar');
let navPlp = document.getElementById('nav-plp');
let navAaliyah = document.getElementById('nav-aaliyah');
let navLogin = document.getElementById('nav-login');
let navContact = document.getElementById('nav-contact');
let navSearch = document.getElementById('nav-search');
let navHome = document.getElementById('nav-home');

navBar.addEventListener('mouseover', function () {
  data = {
    item: 'Navbar Enter',
    location: 'navbar',
    action: 'Mouseover',
    id: currentID,
  };
  console.log(data);
});
navBar.addEventListener('mouseout', function () {
  data = {
    item: 'Navbar Leave',
    location: 'navbar',
    action: 'Mouseout',
    id: currentID,
  };
  console.log(data);
});

navPlp.addEventListener('click', function () {
  data = {
    item: 'PLP link',
    location: 'navbar',
    action: 'click',
    id: currentID,
  };
  console.log(data);
  alert('PLP Link -> Check Console');
});

navAaliyah.addEventListener('click', function () {
  data = {
    item: 'Aaliyah link',
    location: 'navbar',
    action: 'click',
    id: currentID,
  };
  console.log(data);
  alert('Aaliyah Link -> Check Console');
});

navLogin.addEventListener('click', function () {
  data = {
    item: 'Login Link',
    location: 'navbar',
    action: 'click',
    id: currentID,
  };
  console.log(data);
  alert('Login Link -> Check Console');
});

navContact.addEventListener('click', function () {
  data = {
    item: 'Contact Link',
    location: 'navbar',
    action: 'click',
    id: currentID,
  };
  console.log(data);
  alert('Contact Link -> Check Console');
});

navSearch.addEventListener('click', function () {
  data = {
    item: 'Search Link',
    location: 'navbar',
    action: 'click',
    id: currentID,
  };
  console.log(data);
  alert('Search Link -> Check Console');
});

navHome.addEventListener('click', function () {
  data = {
    item: 'Home Link',
    location: 'navbar',
    action: 'click',
    id: currentID,
  };
  console.log(data);
  alert('Home Link -> Check Console');
});
