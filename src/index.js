import Notiflix from 'notiflix';
import SimpleLightbox from 'simplelightbox';
import 'simplelightbox/dist/simple-lightbox.min.css';
import { getPictures } from './js/getPictures';

const axios = require('axios').default;

const refSearchForm = document.querySelector('#search-form');
const refGallery = document.querySelector('.gallery');
const refLoadMore = document.querySelector('.load-more');
let page;
const perPage = 40;
let searchInput;
let totalShown;

refSearchForm.addEventListener('submit', handleSubmit);
refLoadMore.addEventListener('click', loadMore);

function handleSubmit(event) {
  refLoadMore.classList.add('visually-hidden');
  totalShown = 0;
  page = 1;
  event.preventDefault();
  const inputElements = event.currentTarget.elements;
  searchInput = inputElements.searchQuery.value;
  if (searchInput === '') {
    Notiflix.Notify.info('Please enter some search data');
    return;
  }
  refGallery.innerHTML = '';
  markupPictures(searchInput);
}

function markupPictures(searchInput) {
  getPictures(searchInput, page, perPage)
    .then(data => {
      if (data.totalHits === 0) {
        Notiflix.Notify.info(
          'Sorry, there are no images matching your search query. Please try again.'
        );
        return;
      }

      totalShown += data.hits.length;

      const markupList = data.hits
        .map(
          picture =>
            `
            <div class="photo-card">
              <div class="photo">
                <a href="${picture.largeImageURL}">
                <img src="${picture.webformatURL}" alt="${picture.tags}" loading="lazy" />
                </a>
              </div>
              <div class="info">
                <p class="info-item">
                  <b>Likes</b>
                  <span>${picture.likes}</span>
                </p>
                <p class="info-item">
                  <b>Views</b>
                  <span>${picture.views}</span>
                </p>
                <p class="info-item">
                  <b>Comments</b>
                  <span>${picture.comments}</span>
                </p>
                <p class="info-item">
                  <b>Downloads</b>
                  <span>${picture.downloads}</span>
                </p>
              </div>
            </div>
            `
        )
        .join('');
      refGallery.insertAdjacentHTML('beforeend', markupList);
      let lightbox = new SimpleLightbox('.gallery a');
      if (totalShown === data.totalHits) {
        refLoadMore.classList.add('visually-hidden');
        Notiflix.Notify.info(
          "We're sorry, but you've reached the end of search results."
        );
      } else {
        refLoadMore.classList.remove('visually-hidden');
      }
      if (page === 1) {
        Notiflix.Notify.info(`Hooray! We found ${data.totalHits} images.`);
      }
    })
    .catch(error => {
      console.log('Error of fetchpictures');
      console.log(error);
      Notiflix.Notify.failure('Sorry, something is wrong. Please try again.');
    });
}

function loadMore() {
  page += 1;
  markupPictures(searchInput);
}
