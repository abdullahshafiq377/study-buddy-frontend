import React from 'react';

const Welcome = () => {
	return (
		<div className="lg:col-span-2 lg:block bg-white">
			<div className="h-screen grid content-center pl-5">
				<div className="text-center">
					<h2 className="text-xl font-medium text-gray-700">
						Welcome
					</h2>
				</div>
				<div className="text-center">
					<p className="mt-2 text-sm text-gray-700">
						Select a Chat to Start Messaging
					</p>
				</div>
			</div>
		</div>
	);
};

export default Welcome;
