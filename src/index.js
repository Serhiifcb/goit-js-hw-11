import Notiflix from 'notiflix';
import SimpleLightbox from 'simplelightbox';
import 'simplelightbox/dist/simple-lightbox.min.css';
import { getPictures } from './js/getPictures';
import { markupPictures } from './js/markuppictures';

const axios = require('axios').default;
const refSearchForm = document.querySelector('#search-form');
const refGallery = document.querySelector('.gallery');
const refLoadMore = document.querySelector('.load-more');
let page;
const perPage = 40;
let searchInput;
let totalShown;

refSearchForm.addEventListener('submit', searchSubmit);
refLoadMore.addEventListener('click', loadMore);

function searchSubmit(event) {
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
  showPictures(searchInput);
}

function showPictures(searchInput) {
  getPictures(searchInput, page, perPage)
    .then(data => {
      if (data.totalHits === 0) {
        Notiflix.Notify.info(
          'Sorry, there are no images matching your search query. Please try again.'
        );
        return;
      }

      totalShown += data.hits.length;

      refGallery.insertAdjacentHTML('beforeend', markupPictures(data));
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
      console.log(error);
      Notiflix.Notify.failure('Sorry, something is wrong. Please try again.');
    });
}

function loadMore() {
  page += 1;
  showPictures(searchInput);
  lightbox.refresh();
}
