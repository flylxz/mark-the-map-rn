import {createApi, fetchBaseQuery} from '@reduxjs/toolkit/query/react';

export const houseApi = createApi({
  reducerPath: 'houseApi',
  baseQuery: fetchBaseQuery({baseUrl: 'http://10.0.1.50:3000/'}),
  endpoints: builder => ({
    getHouseList: builder.query({
      query: () => 'houses',
    }),
    getHouseById: builder.query({
      query: id => `houses/${id}`,
    }),
  }),
});

export const {useGetHouseListQuery, useGetHouseByIdQuery} = houseApi;
