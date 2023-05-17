import { createEntityAdapter, createSlice } from '@reduxjs/toolkit';

const meetingsAdapter = createEntityAdapter();

const initialState = meetingsAdapter.getInitialState({
	                                                     isUserInMeeting: false,
	                                                     isUserMeetingCreator: false,
	                                                     meetingDetails: null,
	                                                     scheduledMeetings: [],
	                                                     activeMeetings: [],
	                                                     localStream: null,
	                                                     remoteStreams: [],
	                                                     audioOnly: false,
	                                                     screenSharingStream: null,
	                                                     isScreenSharingActive: false,
                                                     });
const meetingsSlice = createSlice({
	                                  name: 'meetings', initialState,
	                                  reducers: {
		                                  setScheduledMeetings: (state, action) => {
			                                  state.scheduledMeetings = action.payload;
		                                  },
		                                  setOpenMeeting: (state, action) => {
			                                  const {isUserInMeeting, isUserMeetingCreator} = action.payload;
			                                  state.isUserInMeeting = isUserInMeeting;
			                                  state.isUserMeetingCreator = isUserMeetingCreator;
		                                  },
		                                  setMeetingDetails: (state, action) => {
			                                  state.meetingDetails = action.payload;
		                                  },
		                                  setActiveMeetings: (state, action) => {
			                                  state.activeMeetings = action.payload;
		                                  },
		                                  setLocalStream: (state, action) => {
			                                  state.localStream = action.payload;
		                                  },
		                                  setRemoteStreams: (state, action) => {
			                                  state.remoteStreams = action.payload;
		                                  },
		                                  setScreenSharingSteam: (state, action) => {
			                                  const {stream} = action.payload;
			                                  state.screenSharingStream = stream || null;
			                                  state.isScreenSharingActive = !!stream;
		                                  },
		                                  
	                                  },
                                  });

export const selectScheduledMeetings = (state) => state.meetings.scheduledMeetings;
export const selectMeetingDetails = (state) => state.meetings.meetingDetails;
export const selectActiveMeetings = (state) => state.meetings.activeMeetings;
export const selectLocalStream = (state) => state.meetings.localStream;
export const selectRemoteStreams = (state) => state.meetings.remoteStreams;
export const selectScreenSharingStream = (state) => state.meetings.screenSharingStream;


export const {
	setOpenMeeting,
	setMeetingDetails,
	setScheduledMeetings,
	setActiveMeetings,
	setLocalStream,
	setRemoteStreams,
	setScreenSharingSteam
} = meetingsSlice.actions;

export default meetingsSlice.reducer;
