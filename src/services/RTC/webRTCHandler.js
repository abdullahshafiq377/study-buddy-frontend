import { store } from '../../app/store';
import { setLocalStream, setRemoteStreams } from '../../features/meetings/meetingsApiSlice';
import Peer from 'simple-peer';
import * as socketConnection from './socketConnection';

const getConfiguration = () => {
	const turnIceServers = null;
	
	if (turnIceServers) {
		// todo use turn server credentials
	}
	else {
		console.warn('Using only STUN Server.');
		return {
			iceServers: [
				{
					urls: 'stun:stun.l.google.com:19302'
				},
			]
		};
	}
};

const onlyAudioConstraints = {
	audio: true,
	video: false
};
const defaultConstraints = {
	audio: true,
	video: true
};
export const getLocalStreamPreview = (onlyAudio = false, callBackFunc) => {
	const constraints = onlyAudio ? onlyAudioConstraints : defaultConstraints;
	
	navigator.mediaDevices.getUserMedia(constraints)
	         .then(stream => {
		         console.log(stream);
		         store.dispatch(setLocalStream(stream));
		         callBackFunc();
	         })
	         .catch(e => {
		         console.log(e);
	         });
	
};

let peers = {};
export const prepareNewPeerConnection = (connUserSocketId, isInitiator) => {
	const localStream = store.getState().meetings.localStream;
	
	if (isInitiator) {
		console.log('preparing new connection as initiator.');
	}
	else {
		console.log('preparing new connection as non initiator.');
	}
	
	peers[connUserSocketId] = new Peer({
		                                   initiator: isInitiator,
		                                   config: getConfiguration(),
		                                   stream: localStream
	                                   });
	
	peers[connUserSocketId].on('signal', data => {
		const signalData = {
			signal: data,
			connUserSocketId
		};
		socketConnection.signalPeerData(signalData);
	});
	
	peers[connUserSocketId].on('stream', remoteStream => {
		console.log('remote stream came from the server');
		console.log('direct connection established');
		remoteStream.connUserSocketId = connUserSocketId;
		addNewRemoteStream(remoteStream);
	});
};

export const handleSignalingData = (data) => {
	const {connUserSocketId, signal} = data;
	if (peers[connUserSocketId]) {
		peers[connUserSocketId].signal(signal);
	}
};

const addNewRemoteStream = (stream) => {
	const remoteStreams = store.getState().meetings.remoteStreams;
	const newRemoteStreams = [...remoteStreams, stream];
	store.dispatch(setRemoteStreams(newRemoteStreams));
};

export const closeAllConnections = () => {
	Object.entries(peers)
	      .map(mappedObj => {
		      const {connUserSocketId} = mappedObj[0];
		      if (peers[connUserSocketId]) {
			      peers[connUserSocketId].destroy();
			      delete peers[connUserSocketId];
		      }
	      });
};

export const handleParticipantLeftMeeting = (data) => {
	const {connUserSocketId} = data;
	
	if (peers[connUserSocketId]) {
		peers[connUserSocketId].destroy();
		delete peers[connUserSocketId];
	}
	
	const remoteStreams = store.getState().meetings.remoteStreams;
	
	const newRemoteStreams = remoteStreams.filter(
		remoteStream => remoteStream.connUserSocketId !== connUserSocketId
	);
	console.log('new remote streams', newRemoteStreams);
	
	store.dispatch(setRemoteStreams(newRemoteStreams));
};

export const switchOutgoingTracks = (stream) => {
	for (let socket_id in peers) {
		for (let index in peers[socket_id].streams[0].getTracks()) {
			for (let index2 in stream.getTracks()) {
				if (
					peers[socket_id].streams[0].getTracks()[index].kind ===
					stream.getTracks()[index2].kind
				) {
					peers[socket_id].replaceTrack(
						peers[socket_id].streams[0].getTracks()[index],
						stream.getTracks()[index2],
						peers[socket_id].streams[0]
					);
					break;
				}
			}
		}
	}
};
