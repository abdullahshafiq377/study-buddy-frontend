import React, { useEffect, useRef } from 'react';

const Video = ({stream, isLocalStream}) => {
	const videoRef = useRef();
	
	useEffect(() => {
		const video = videoRef.current;
		video.srcObject = stream;
		
		video.onloadedmetadata = () => {
			video.play();
		};
	}, [stream]);
	return (
		<video className="" ref={videoRef} autoPlay muted={!!isLocalStream}/>
	);
};

export default Video;
