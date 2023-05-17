import React, { useState } from 'react';
import {
	MicrophoneIcon as MicrophoneIconSolid,
	PhoneXMarkIcon,
	TvIcon as TvIconSolid,
	UsersIcon as UsersIconSolid,
	VideoCameraIcon as VideoCameraIconSolid
} from '@heroicons/react/24/solid';
import {
	MicrophoneIcon as MicrophoneIconOutlined,
	TvIcon as TvIconOutlined,
	UsersIcon as UsersIconOutlined,
	VideoCameraIcon as VideoCameraIconOutlined
} from '@heroicons/react/24/outline';
import ParticipantsSlideOver from './ParticipantsSlideOver';
import * as meetingHandler from '../../../services/RTC/meetingHandler';
import { useNavigate } from 'react-router-dom';
import { connect, useSelector } from 'react-redux';
import { selectCurrentUserType } from '../../auth/authSlice';
import { store } from '../../../app/store';
import { setScreenSharingSteam } from '../meetingsApiSlice';
import * as webRTCHandler from '../../../services/RTC/webRTCHandler';


const screenShareConstraints = {
	audio: false,
	video: true
};

const MeetingControls = ({localStream, screenSharingStream, isScreenSharingActive: isScreenSharingActiveStore}) => {
	const [isScreenSharingActive, setIsScreenSharingActive] = useState(false);
	const [isVideoSharingActive, setIsVideoSharingActive] = useState(true);
	const [isMicActive, setIsMicActive] = useState(true);
	
	const [openParticipantsSlideOver, setOpenParticipantsSlideOver] = useState(false);
	
	
	const navigate = useNavigate();
	const userType = useSelector(selectCurrentUserType);
	
	
	const handleScreenSharing = async () => {
		if (!isScreenSharingActive) {
			let stream = null;
			try {
				stream = await navigator.mediaDevices.getDisplayMedia(screenShareConstraints);
			} catch (e) {
				console.log(e);
			}
			if (stream) {
				setIsScreenSharingActive(true);
				store.dispatch(setScreenSharingSteam({stream}));
				webRTCHandler.switchOutgoingTracks(stream);
			}
		}
		else {
			setIsScreenSharingActive(false);
			webRTCHandler.switchOutgoingTracks(localStream);
			screenSharingStream.getTracks()
			                   .map(t => t.stop());
			store.dispatch(setScreenSharingSteam({stream: null}));
		}
	};
	const handleVideoSharing = () => {
		localStream.getVideoTracks()[0].enabled = !isVideoSharingActive;
		setIsVideoSharingActive(!isVideoSharingActive);
	};
	const handleVoiceSharing = () => {
		localStream.getAudioTracks()[0].enabled = !isMicActive;
		setIsMicActive(!isMicActive);
	};
	
	const handleLeave = () => {
		meetingHandler.leaveMeeting();
		navigate(`/${userType}/meetings`, {replace: true});
	};
	return (
		<div className="flex bg-gray-50 justify-center py-4 gap-x-4">
			<button
				type="button"
				className="rounded-full bg-gray-200 p-4 text-gray-900 shadow-sm hover:bg-gray-300 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-gray-400"
				onClick={handleScreenSharing}
			>
				{isScreenSharingActive ?
				 <TvIconSolid className="h-6 w-6" aria-hidden="true"/> :
				 <TvIconOutlined className="h-6 w-6" aria-hidden="true"/>
				}
			
			</button>
			<button
				type="button"
				className="rounded-full bg-gray-200 p-4 text-gray-900 shadow-sm hover:bg-gray-300 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-gray-400"
				onClick={handleVideoSharing}
			>
				{isVideoSharingActive ?
				 <VideoCameraIconSolid className="h-6 w-6" aria-hidden="true"/> :
				 <VideoCameraIconOutlined className="h-6 w-6" aria-hidden="true"/>
				}
			
			</button>
			<button
				type="button"
				className="rounded-full bg-gray-200 p-4 text-gray-900 shadow-sm hover:bg-gray-300 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-gray-400"
				onClick={handleVoiceSharing}
			>
				{isMicActive ?
				 <MicrophoneIconSolid className="h-6 w-6" aria-hidden="true"/> :
				 <MicrophoneIconOutlined className="h-6 w-6" aria-hidden="true"/>
				}
			
			</button>
			<button
				type="button"
				className="rounded-full bg-gray-200 p-4 text-gray-900 shadow-sm hover:bg-gray-300 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-gray-400"
				onClick={() => {
					setOpenParticipantsSlideOver(!openParticipantsSlideOver);
				}}
			>
				{openParticipantsSlideOver ?
				 <UsersIconSolid className="h-6 w-6" aria-hidden="true"/> :
				 <UsersIconOutlined className="h-6 w-6" aria-hidden="true"/>
				}
			
			</button>
			<button
				type="button"
				onClick={handleLeave}
				className="rounded-full bg-red-100 p-4 text-red-700 shadow-sm hover:bg-red-200 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-red-500"
			>
				<PhoneXMarkIcon className="-h-6 w-6" aria-hidden="true"/>
			</button>
			<ParticipantsSlideOver open={openParticipantsSlideOver} setOpen={setOpenParticipantsSlideOver}/>
		</div>
	);
};

const mapStoreStateToProps = ({meetings}) => {
	return {
		...meetings,
	};
};
export default connect(mapStoreStateToProps)(MeetingControls);
