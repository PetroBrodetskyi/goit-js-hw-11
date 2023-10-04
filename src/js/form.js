const searchForm = document.getElementById('search-form');
const searchInput = document.getElementById('search-input');


searchForm.addEventListener('submit', (event) => {
  event.preventDefault();

  searchInput.value = '';
  searchInput.setAttribute('placeholder', 'Search images...');
});

searchInput.addEventListener('click', () => {
  searchInput.removeAttribute('placeholder');
});

searchInput.addEventListener('blur', () => {
  if (searchInput.value === '') {
    searchInput.setAttribute('placeholder', 'Search images...');
  }
});
