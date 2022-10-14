import Notiflix from 'notiflix';
const refSearchForm = document.querySelector('#search-form');
const refGallery = document.querySelector('.gallery');

refSearchForm.addEventListener('submit', handleSubmit);

function handleSubmit(event) {
  event.preventDefault();
  const inputElements = event.currentTarget.elements;
  let searchInput = inputElements.searchQuery.value;
  if (searchInput === '') {
    Notiflix.Notify.info('Please enter some search data');
    return;
  }
  fetchPictures(searchInput);
}

function fetchPictures(searchInput) {
  fetch(
    `https://pixabay.com/api/?key=30577922-67600fce07e41f9eca16e67a5&q=${searchInput}&image_type=photo&orientation=horizontal&safesearch=true`
  )
    .then(response => {
      return response.json();
    })
    .then(data => {
      console.log(data);
      refGallery.innerHTML = '';
      const markupList = data.hits
        .map(
          picture =>
            `<div class="photo-card">
              <div class="photo">
                <img src="${picture.webformatURL}" alt="${picture.tags}" loading="lazy" />
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
            </div>`
        )
        .join('');
      refGallery.innerHTML = markupList;
    })
    .catch(error => {
      Notiflix.Notify.failure('Sorry, something is wrong. Please try again.');
    });
}
