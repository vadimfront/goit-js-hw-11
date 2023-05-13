import axios from 'axios';
import { BASE_URL, API_KEY } from './constants/apiConfig';

export const fetchImages = async (searchQuery, currentPage) => {
  try {
    const params = {
      key: API_KEY,
      q: searchQuery,
      image_type: 'photo',
      orientation: 'horizontal',
      safesearch: true,
      per_page: 40,
      page: currentPage,
    };
    const { data } = await axios.get(BASE_URL, { params });
    return data;
  } catch (error) {
    console.error('Error fetching images:', error);
  }
};
