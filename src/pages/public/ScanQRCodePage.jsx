import React, { useState } from 'react';
import { QrReader } from 'react-qr-reader';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import FeedbackAlert from '../../components/FeedbackAlert';

const ScanQRCodePage = () => {
	const {studentId} = useParams();
	const [isMarked, setIsMarked] = useState(false);
	
	const handleQRScan = (result, error) => {
		if (result) {
			const lectureId = result.text;
			axios.post('http://localhost:8000/api/v1/attendance/QR', {lectureId, studentId})
			     .then(() => {
				     console.log('Attendance Marked');
				     setIsMarked(true);
				     setTimeout(() => {
					     window.close();
				     }, 3000);
			     });
		}
		else {
			console.log(error);
		}
	};
	return (
		<>
			{
				isMarked
				?
				<FeedbackAlert type="success" content="Attendance Marked Successfully"/>
				:
				''
			}
			{
				!isMarked ?
				<QrReader onResult={(result, error) => handleQRScan(result, error)}
				          containerStyle={{width: '30%'}}/>
				          
				          :
				''
			}
		
		
		</>
	
	);
};

export default ScanQRCodePage;
