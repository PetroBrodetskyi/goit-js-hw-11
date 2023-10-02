import axios from 'axios';
import SimpleLightbox from 'simplelightbox';
import { Notify } from 'notiflix/build/notiflix-notify-aio';

const apiKey = '39760992-bd564f72a97718cc10783b18b';
const perPage = 40;
let page = 1;
let searchTerm = '';

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
      Notify.failure("Sorry, there are no images matching your search query. Please try again.", {
        position: 'center-bottom',
        timeout: 3000,
        width: '320px',
        fontSize: '18px'
      });
    } else {
      renderGallery(data.hits);
      page++;
    }
  } catch (error) {
    console.error('Error:', error);
  }
}


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
export { fetchImages, renderGallery };