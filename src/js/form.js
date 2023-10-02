import { Notify } from 'notiflix/build/notiflix-notify-aio';

const searchForm = document.getElementById('search-form');
const searchInput = document.getElementById('search-input');


searchForm.addEventListener('submit', (event) => {
  event.preventDefault();
  const searchTerm = searchInput.value.trim();
  if (searchTerm === '') 
      Notify.failure('Please enter a search term', {
      position: 'center-bottom',
      timeout: 3000,
      width: '320px',
      fontSize: '18px'
      })
  
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



