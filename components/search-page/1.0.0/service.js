let searchButton = document.getElementById('searchbutton');
let searchTerm = document.getElementById('searchterm');

searchButton.addEventListener('click', function () {
  if (searchTerm != '') {
    localStorage.setItem('search', searchTerm.value);
  } else {
    localStorage.setItem('search');
  }

  window.location.href = 'plp.html';
});
