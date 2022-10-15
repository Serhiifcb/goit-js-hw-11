const axios = require('axios').default;
export async function getPictures(searchInput, page, perPage) {
  try {
    const response = await axios.get(
      `https://pixabay.com/api/?key=30577922-67600fce07e41f9eca16e67a5&q=${searchInput}&image_type=photo&orientation=horizontal&safesearch=true&page=${page}&per_page=${perPage}`
    );
    return response.data;
  } catch (error) {
    console.log(error);
  }
}
