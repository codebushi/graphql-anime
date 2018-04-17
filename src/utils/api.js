import axios from 'axios';

export const api = {
  getAnime: async function(payload) {
    try {
      const response = await axios.post('https://graphql.anilist.co', payload);
      return response.data.data;
    } catch (error) {
      throw new Error(error);
    }
  }
};
