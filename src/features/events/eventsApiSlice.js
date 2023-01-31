import {createEntityAdapter, createSelector} from '@reduxjs/toolkit';
import {apiSlice} from '../../app/api/apiSlice';

const eventsAdapter = createEntityAdapter({
    sortComparer: (a, b) => a.title.localeCompare(b.title),
});

const initialState = eventsAdapter.getInitialState();

export const eventsApiSlice = apiSlice.injectEndpoints({
    endpoints: (builder) => ({
        getEvents: builder.query({
            query: () => '/events',
            keepUnusedDataFor: 900,
            transformResponse: (responseData) => {
                return eventsAdapter.setAll(initialState, responseData);
            },
            providesTags: (result, error, arg) => [
                {type: 'Event', id: 'LIST'},
                ...result.ids.map((id) => ({type: 'Event', id})),
            ],
        }),
        addNewEvent: builder.mutation({
            query: (initialEvent) => ({
                url: '/events',
                method: 'POST',
                body: {...initialEvent},
            }),
            invalidatesTags: [{type: 'Event', id: 'LIST'}],
        }),
        updateEvent: builder.mutation({
            query: (initialEvent) => ({
                url: `/events/${initialEvent.id}`,
                method: 'PUT',
                body: {...initialEvent},
            }),
            invalidatesTags: (result, error, arg) => [
                {type: 'Event', id: arg.id},
            ],
        }),
        deleteEvent: builder.mutation({
            query: ({id}) => ({
                url: `/events/${id}`,
                method: 'DELETE',
                body: {id},
            }),
            invalidatesTags: (result, error, arg) => [
                {type: 'Event', id: arg.id},
            ],
        }),
    }),
});

// Api hooks
export const {
    useGetEventsQuery,
    useAddNewEventMutation,
    useUpdateEventMutation,
    useDeleteEventMutation,
} = eventsApiSlice;

// Selectors
export const selectEventsResult =
    eventsApiSlice.endpoints.getEvents.select();

const selectEventsData = createSelector(
    selectEventsResult,
    (subResult) => subResult.data,
);

// Get Selectors
export const {
    selectAll: selectAllEvents,
    selectById: selectEventById,
    selectIds: selectEventIds,
} = eventsAdapter.getSelectors(
    (state) => selectEventsData(state) ?? initialState,
);
