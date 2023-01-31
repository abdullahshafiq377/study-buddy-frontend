import {createEntityAdapter, createSelector} from '@reduxjs/toolkit';
import {apiSlice} from '../../app/api/apiSlice';

const noticesAdapter = createEntityAdapter({
    sortComparer: (a, b) => a.title.localeCompare(b.title),
});

const initialState = noticesAdapter.getInitialState();

export const noticesApiSlice = apiSlice.injectEndpoints({
    endpoints: (builder) => ({
        getNotices: builder.query({
            query: () => '/notices',
            keepUnusedDataFor: 900,
            transformResponse: (responseData) => {
                return noticesAdapter.setAll(initialState, responseData);
            },
            providesTags: (result, error, arg) => [
                {type: 'Notice', id: 'LIST'},
                ...result.ids.map((id) => ({type: 'Notice', id})),
            ],
        }),
        addNewNotice: builder.mutation({
            query: (initialNotice) => ({
                url: '/notices',
                method: 'POST',
                body: {...initialNotice},
            }),
            invalidatesTags: [{type: 'Notice', id: 'LIST'}],
        }),
        updateNotice: builder.mutation({
            query: (initialNotice) => ({
                url: `/notices/${initialNotice.id}`,
                method: 'PUT',
                body: {...initialNotice},
            }),
            invalidatesTags: (result, error, arg) => [
                {type: 'Notice', id: arg.id},
            ],
        }),
        deleteNotice: builder.mutation({
            query: ({id}) => ({
                url: `/notices/${id}`,
                method: 'DELETE',
                body: {id},
            }),
            invalidatesTags: (result, error, arg) => [
                {type: 'Notice', id: arg.id},
            ],
        }),
    }),
});

// Api hooks
export const {
    useGetNoticesQuery,
    useAddNewNoticeMutation,
    useUpdateNoticeMutation,
    useDeleteNoticeMutation,
} = noticesApiSlice;

// Selectors
export const selectNoticesResult =
    noticesApiSlice.endpoints.getNotices.select();

const selectNoticesData = createSelector(
    selectNoticesResult,
    (subResult) => subResult.data,
);

// Get Selectors
export const {
    selectAll: selectAllNotices,
    selectById: selectNoticeById,
    selectIds: selectNoticeIds,
} = noticesAdapter.getSelectors(
    (state) => selectNoticesData(state) ?? initialState,
);
