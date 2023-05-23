import React from 'react';
import { useSelector } from 'react-redux';
import { selectLocalStream, selectRemoteStreams, selectScreenSharingStream } from '../meetingsApiSlice';
import Video from './Video';

const Meeting = () => {
	let localStream = useSelector(selectLocalStream);
	console.log(localStream);
	let screenSharingStream = useSelector(selectScreenSharingStream);
	console.log(screenSharingStream);
	let remoteStreams = useSelector(selectRemoteStreams);
	console.log(remoteStreams);
	
	
	return (
		<div className="bg-black">
			<div className="p-4 grid grid-cols-2 gap-4 content-center justify-center">
				<Video isLocalStream={true} stream={screenSharingStream ? screenSharingStream : localStream}/>
				{
					remoteStreams?.length ?
					remoteStreams.map(stream => {
						return <Video isLocalStream={false} stream={stream}/>;
					})
					                      :
					''
				}
			</div>
		</div>
	);
};

export default Meeting;
