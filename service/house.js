import {createApi, fetchBaseQuery} from '@reduxjs/toolkit/query/react';

export const houseApi = createApi({
  reducerPath: 'houseApi',
  baseQuery: fetchBaseQuery({baseUrl: 'http://10.0.1.50:3000/'}),
  tagTypes: ['House'],
  endpoints: build => ({
    getHouseList: build.query({
      query: () => 'houses',
    }),
    getHouseById: build.query({
      query: id => `houses/${id}`,
      providesTags: () => ['House'],
    }),
    updateMarker: build.mutation({
      query({id, body}) {
        return {
          url: `houses/${id}`,
          method: 'PUT',
          body,
        };
      },
      invalidatesTags: ['House'],
    }),
  }),
});

export const {
  useGetHouseListQuery,
  useGetHouseByIdQuery,
  useUpdateMarkerMutation,
} = houseApi;
