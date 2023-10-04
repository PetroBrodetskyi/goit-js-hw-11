import axios from 'axios';
import SimpleLightbox from 'simplelightbox';
import 'simplelightbox/dist/simple-lightbox.min.css';
import { Notify } from 'notiflix/build/notiflix-notify-aio';

const apiKey = '39760992-bd564f72a97718cc10783b18b';
const perPage = 40;
let page = 1;
let searchTerm = '';
const searchForm = document.getElementById('search-form');
const searchInput = document.getElementById('search-input');
const gallery = document.getElementById('gallery');
const titleElement = document.querySelector(".title");

let isFirstSearch = true;
let isLoading = false;
let hasMoreImages = true;
let endOfResultsNotified = false;
let isFetching = false;

function renderGallery(images) {
  const galleryHtml = images.map(({ webformatURL, largeImageURL, likes, views, comments, downloads, tags }) => `
    <div class="container">
      <div class="photo-card">
        <a href="${largeImageURL}" class="image-link">
          <img src="${webformatURL}" alt="${tags}" loading="lazy" />
        </a>
        <div class="info animal-statistic">
          <p><b>Likes:</b> ${likes}</p>
          <p><b>Views:</b> ${views}</p>
          <p><b>Comments:</b> ${comments}</p>
          <p><b>Downloads:</b> ${downloads}</p>
        </div>
      </div>
    </div>
  `).join('');

  gallery.innerHTML += galleryHtml;

  const lightbox = new SimpleLightbox('.image-link');
  lightbox.refresh();
}

async function fetchImages() {
  try {
    if (isLoading || !hasMoreImages || searchTerm === '') {
      return;
    }

    isLoading = true;
    isFetching = true;

    const response = await axios.get('https://pixabay.com/api/', {
      params: {
        key: apiKey,
        q: searchTerm,
        image_type: 'photo',
        orientation: 'horizontal',
        safesearch: true,
        page,
        per_page: perPage,
      },
    });

    if (searchTerm === '') {
      return;
    };

    const data = response.data;

    if (data.hits.length === 0) {
      Notify.failure("Sorry, there are no images matching your search query. Please try again.", {
        position: 'center-bottom',
        timeout: 3000,
        width: '320px',
        fontSize: '18px'
      });

    } else {
      if (isFirstSearch) {
        Notify.success(`Hooray! We found ${data.totalHits} images.`, {
          position: 'center-bottom',
          timeout: 3000,
          width: '320px',
          fontSize: '18px'
        });
        isFirstSearch = false;
      }

      renderGallery(data.hits);
      page++;

      if (page > Math.ceil(data.totalHits / perPage)) {
        if (!endOfResultsNotified) {
          Notify.info("You've reached the end of search results.", {
            position: 'center-bottom',
            timeout: 5000,
            width: '320px',
            fontSize: '18px'
          });
          endOfResultsNotified = true;
        }
        hasMoreImages = false;
      }
    };
  } catch (error) {
    console.error('Error:', error);
  } finally {
    isLoading = false;
    isFetching = false;
  }
}

function checkScroll() {
  const { scrollTop, clientHeight, scrollHeight } = document.documentElement;

  if (!isFetching && scrollTop + clientHeight >= scrollHeight - 200) {
    fetchImages();
  }
  
}

searchForm.addEventListener('submit', (event) => {
  event.preventDefault();
  searchTerm = searchInput.value.trim();

  if (searchTerm === '') {
    Notify.failure('Please enter a search term', {
      position: 'center-bottom',
      timeout: 3000,
      width: '320px',
      fontSize: '18px'
    });
  } else {
    gallery.innerHTML = '';
    isFirstSearch = true;
    page = 1;
    hasMoreImages = true;
    endOfResultsNotified = false;
    fetchImages();
  }
});

window.addEventListener('scroll', checkScroll);

titleElement.style.cursor = "pointer";
titleElement.addEventListener("click", () => {
  location.reload();
});
