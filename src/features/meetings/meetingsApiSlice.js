import { createEntityAdapter, createSlice } from '@reduxjs/toolkit';

const meetingsAdapter = createEntityAdapter();

const initialState = meetingsAdapter.getInitialState({
	                                                     isUserInMeeting: false,
	                                                     isUserMeetingCreator: false,
	                                                     meetingDetails: null,
	                                                     activeMeetings: [],
	                                                     localStream: null,
	                                                     remoteStreams: [],
	                                                     audioOnly: false,
	                                                     screenSharingStream: null,
	                                                     isScreenSharingActive: false,
                                                     });
const meetingsSlice = createSlice({
	                                  name: 'meetings', initialState,
	                                  reducers: {},
                                  });

export const {} = meetingsSlice.actions;

export default meetingsSlice.reducer;
