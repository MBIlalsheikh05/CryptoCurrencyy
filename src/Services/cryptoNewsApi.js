import { createApi } from '@reduxjs/toolkit/query/react';
import axios from 'axios';
const axiosBaseQuery = ({ baseUrl } = { baseUrl: '' }) =>
  async ({ url, method, data, params }) => {
    try {
      const result = await axios({
        url: baseUrl + url,
        method: method || 'GET',
        data,
        params,
        headers: {
          'x-rapidapi-key': 'f78d5cc1c3msh27679750f30f821p179a65jsn792e0aaa00ed',
          'x-rapidapi-host': 'real-time-news-data.p.rapidapi.com'
        }
      });
      return { data: result.data };
    } catch (error) {
      return {
        error: {
          status: error.response?.status,
          data: error.response?.data || error.message,
        },
      };
    }
  };

// Redux Toolkit API with new endpoint
export const cryptoNewsApi = createApi({
  reducerPath: 'cryptoNewsApi',
  baseQuery: axiosBaseQuery({ baseUrl: 'https://real-time-news-data.p.rapidapi.com' }),
  endpoints: (builder) => ({
    getCryptoNews: builder.query({
      query: ({  count = 5 }) => ({
        url: '/topic-news-by-section',
        params: {
          topic: 'football', // Changed to 'cryptocurrency' to fetch the correct topic
          section: 'CAQiW0NCQVNQZ29JTDIwdk1EZGpNWFlTQW1WdUdnSlZVeUlQQ0FRYUN3b0pMMjB2TURKdFpqRnVLaGtLRndvVFIwRkVSMFZVWDFORlExUkpUMDVmVGtGTlJTQUJLQUEqKggAKiYICiIgQ0JBU0Vnb0lMMjB2TURkak1YWVNBbVZ1R2dKVlV5Z0FQAVAB',
          limit: count, // Control the number of articles
          country: 'US', // Set country if needed
          lang: 'en', // Set language to English
        },
      }),
    }),
  }),
});

export const { useGetCryptoNewsQuery } = cryptoNewsApi;
