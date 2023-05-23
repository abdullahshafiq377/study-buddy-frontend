import React from 'react';
import QRCode from 'react-qr-code';
import { useParams } from 'react-router-dom';

const QRCodePage = () => {
	const {lectureId} = useParams();
	return (
		<div className="grid h-screen place-items-center">
			<QRCode style={{height: 'auto', maxWidth: '40%', width: '100%'}} value={lectureId}/>
		</div>
	);
};

export default QRCodePage;
