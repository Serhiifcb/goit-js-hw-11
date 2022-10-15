export function markupPictures(data) {
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
  return markupList;
}
