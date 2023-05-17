import { store } from '../../app/store';
import {
	setActiveMeetings, setLocalStream,
	setMeetingDetails,
	setOpenMeeting, setRemoteStreams,
	setScheduledMeetings, setScreenSharingSteam
} from '../../features/meetings/meetingsApiSlice';
import * as socketConnection from './socketConnection';
import * as webRTCHandler from './webRTCHandler';


export const scheduleNewMeeting = (data) => {
	socketConnection.scheduleMeeting(data);
};

export const startNewMeeting = (data) => {
	const successCallbackFunc = () => {
		store.dispatch(setOpenMeeting({isUserInMeeting: true, isUserMeetingCreator: true}));
		socketConnection.startMeeting(data);
	};
	webRTCHandler.getLocalStreamPreview(false, successCallbackFunc);
};
export const newMeetingCreated = (data) => {
	const {meetingDetails} = data;
	store.dispatch(setMeetingDetails(meetingDetails));
};

export const updateScheduledMeetings = (data) => {
	const {scheduledMeetings} = data;
	store.dispatch(setScheduledMeetings(scheduledMeetings));
};
export const updateActiveMeetings = (data) => {
	const {activeMeetings} = data;
	console.log('Active Meetings', activeMeetings);
	store.dispatch(setActiveMeetings(activeMeetings));
};

export const joinMeeting = (meetingId) => {
	const successCallbackFunc = () => {
		store.dispatch(setMeetingDetails({id: meetingId}));
		store.dispatch(setOpenMeeting({isUserInMeeting: true, isUserMeetingCreator: false}));
		socketConnection.joinMeeting({meetingId});
	};
	webRTCHandler.getLocalStreamPreview(false, successCallbackFunc);
};

export const leaveMeeting = () => {
	const meetingId = store.getState().meetings.meetingDetails.id;
	
	const localStream = store.getState().meetings.localStream;
	if (localStream) {
		localStream.getTracks()
		           .map(track => track.stop());
		store.dispatch(setLocalStream(null));
	}
	
	const screenSharingStream = store.getState().meetings.screenSharingStream;
	if (screenSharingStream) {
		screenSharingStream.getTracks()
		                   .map(t => t.stop());
		store.dispatch(setScreenSharingSteam({stream: null}));
	}
	
	store.dispatch(setRemoteStreams([]));
	webRTCHandler.closeAllConnections();
	
	socketConnection.leaveMeeting({meetingId});
	
	store.dispatch(setMeetingDetails(null));
	store.dispatch(setOpenMeeting({isUserInMeeting: false, isUserMeetingCreator: false}));
};
