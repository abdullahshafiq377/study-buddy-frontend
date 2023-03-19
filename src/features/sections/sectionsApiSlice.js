import {createEntityAdapter, createSelector} from '@reduxjs/toolkit';
import {apiSlice} from '../../app/api/apiSlice';
import {postsApiSlice} from "../posts/postsApiSlice";

const sectionsAdapter = createEntityAdapter({
    sortComparer: (a, b) => a.title.localeCompare(b.title),
});

const initialState = sectionsAdapter.getInitialState();

export const sectionsApiSlice = apiSlice.injectEndpoints({
    endpoints: (builder) => ({
        getSections: builder.query({
            query: () => '/sections',
            keepUnusedDataFor: 900,
            transformResponse: (responseData) => {
                return sectionsAdapter.setAll(initialState, responseData);
            },
            providesTags: (result, error, arg) => [
                {type: 'Post', id: 'LIST'},
                ...result.ids.map((id) => ({type: 'Post', id})),
            ],
        }),
        getSectionsByDepartment: builder.query({
            query: (departmentId) => `/sections/${departmentId}`,
            keepUnusedDataFor: 900,
            transformResponse: (responseData) => {
                return sectionsAdapter.setAll(initialState, responseData);
            },
            providesTags: (result, error, arg) => [
                {type: 'Section', id: 'LIST'},
                ...result.ids.map((id) => ({type: 'Section', id})),
            ],
        }),
        addNewSection: builder.mutation({
            query: (initialSection) => ({
                url: '/sections',
                method: 'POST',
                body: {...initialSection},
            }),
            invalidatesTags: [{type: 'Section', id: 'LIST'}],
        }),
        updateSection: builder.mutation({
            query: (initialSection) => ({
                url: `/sections/${initialSection.id}`,
                method: 'PUT',
                body: {...initialSection},
            }),
            invalidatesTags: (result, error, arg) => [
                {type: 'Section', id: arg.id},
            ],
        }),
        deleteSection: builder.mutation({
            query: (id) => ({
                url: `/sections/${id}`,
                method: 'DELETE',
                body: {id},
            }),
            invalidatesTags: (result, error, arg) => [
                {type: 'Section', id: arg.id},
            ],
        }),
    }),
});


export const {
    useGetSectionsByDepartmentQuery,
    useAddNewSectionMutation,
    useUpdateSectionMutation,
    useDeleteSectionMutation,
} = sectionsApiSlice;

// Selectors
export const selectSectionsResult =
    sectionsApiSlice.endpoints.getSections.select();

const selectSectionsData = createSelector(
    selectSectionsResult,
    (subResult) => subResult.data,
);

// Get Selectors
export const {
    selectAll: selectAllSections,
    selectById: selectSectionById,
    selectIds: selectSectionIds,
} = sectionsAdapter.getSelectors(
    (state) => selectSectionsData(state) ?? initialState,
);

