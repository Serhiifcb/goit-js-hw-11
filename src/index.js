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
      // if (data.length > 10) {
      //   Notiflix.Notify.info(
      //     'Too many matches found. Please enter a more specific name.'
      //   );
      //   return;
      // }
      // if (data.length === 1) {
      //   const markupInfo = `
      //     <div class="flag-and-name">
      //     <img src="${data[0].flags.svg}" class="flag">
      //     <div class="country-item">${data[0].name}</div>
      //     </div>
      //     <div class="country-item"><p class="item-name">Capital: </p>${data[0].capital}</div>
      //     <div class="country-item"><p class="item-name">Population: </p>${data[0].population}</div>
      //     `;
      //   let markupLanguage = '';
      //   if (data[0].languages.length === 1) {
      //     markupLanguage = `
      //       <div class="country-item">
      //         <p class="item-name">Languages: </p>${data[0].languages[0].name}
      //       </div>
      //       `;
      //     refInfo.innerHTML = markupInfo + markupLanguage;
      //   } else {
      //     markupLanguage = `
      //       <div class="country-item">
      //         <p class="item-name">Languages: </p>${data[0].languages[0].name}
      //       `;
      //     for (let k = 1; k < data[0].languages.length; k++) {
      //       markupLanguage = markupLanguage + ', ' + data[0].languages[k].name;
      //     }
      //     refInfo.innerHTML = markupInfo + markupLanguage + `</div>`;
      //   }
      // } else {
      //   const markupList = data
      //     .map(
      //       country =>
      //         `<li class="list-item"><img src="${country.flags.svg}" class="flag-list">${country.name}</li>`
      //     )
      //     .join('');
      //   refList.innerHTML = markupList;
      // }
    })
    .catch(error => {
      Notiflix.Notify.failure('Sorry, something is wrong. Please try again.');
    });
}
