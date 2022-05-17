if (localStorage.getItem('search')) {
  console.info(localStorage.getItem('search'));
} else {
  localStorage.setItem('search', 'Search Query');
}
