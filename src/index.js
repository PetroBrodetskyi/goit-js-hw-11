import axios from 'axios';
import SimpleLightbox from 'simplelightbox';
import 'simplelightbox/dist/simple-lightbox.min.css';

const apiKey = '39760992-bd564f72a97718cc10783b18b';
const perPage = 40;
let page = 1;
let searchTerm = '';
const searchForm = document.getElementById('search-form');
const searchInput = document.getElementById('search-input');
const gallery = document.getElementById('gallery');
const titleElement = document.querySelector(".title");


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

    const data = response.data;

    if (data.hits.length === 0) {
      alert('No images found. Please try again.');
    } else {
      renderGallery(data.hits);
      page++;
    }
  } catch (error) {
    console.error('Error:', error);
  }
}

function checkScroll() {
  const { scrollTop, clientHeight, scrollHeight } = document.documentElement;
  
  if (scrollTop + clientHeight >= scrollHeight - 200) {
    fetchImages();
  }
}

searchForm.addEventListener('submit', (event) => {
  event.preventDefault();
  searchTerm = searchInput.value.trim();
  page = 1;
  gallery.innerHTML = '';
  fetchImages();
});

window.addEventListener('scroll', checkScroll);

titleElement.style.cursor = "pointer";
titleElement.addEventListener("click", () => {
  location.reload();
});