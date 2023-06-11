import axios from 'axios';

const API_KEY = '35569629-68d598aa8a27ce1f99985e42c';
axios.defaults.baseURL = 'https://pixabay.com/api';

export const getImages = async (searchQuery, page) => {
  const params = {
    key: API_KEY,
    q: searchQuery,
    image_type: 'photo',
    orientation: 'horizontal',
    safesearch: true,
    per_page: 12,
    page: page,
  };

  const response = await axios.get('/', { params });
  return response.data;
};

// const API_KEY = '35569629-68d598aa8a27ce1f99985e42c';
// const BASE_URL = 'https://pixabay.com/api/';

// export const getImages = (searchQuery, page, perPage) => {
//   const response = axios
//     .get(
//       `${BASE_URL}?q=${searchQuery}&page=${page}&key=${API_KEY}&per_page=${perPage}`
//     )
//     .then(({ data }) => data);
//   return response;
// };
