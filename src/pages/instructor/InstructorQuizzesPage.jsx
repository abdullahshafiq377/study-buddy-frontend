import React, { useState } from 'react';
import InstructorSectionsTable from '../../features/sections/components/InstructorSectionsTable';
import NewQuizSlideOver from '../../features/quizzes/components/NewQuizSlideOver';

const InstructorQuizzesPage = () => {
	const [openNewQuizSlideOver, setOpenNewQuizSlideOver] = useState(false);
	return (
		<>
			<div className="px-4 sm:px-6 lg:px-8">
				<div className="sm:flex sm:items-center">
					<div className="sm:flex-auto">
						<h1 className="text-2xl font-bold text-gray-900">
							Quiz
						</h1>
						<p className="mt-2 text-sm text-gray-700">
							A list of all the sub admins in the system including
							their names, emails, genders and contact numbers.
						</p>
					</div>
					<div className="mt-4 sm:mt-0 sm:ml-16 sm:flex-none">
						<button
							onClick={() => setOpenNewQuizSlideOver(!openNewQuizSlideOver)}
							className="inline-flex items-center justify-center rounded-md border border-transparent bg-primary-900 px-4 py-2 text-sm font-medium text-white shadow-sm hover:bg-primary-700 focus:outline-none focus:ring-2 focus:ring-primary-600 focus:ring-offset-2 sm:w-auto"
						>
							New Quiz
						</button>
					</div>
				</div>
				<div className="mt-8 flex flex-col">
					<div className="-my-2 -mx-4 overflow-x-auto sm:-mx-6 lg:-mx-8">
						<div className="inline-block min-w-full py-2 align-middle md:px-6 lg:px-8">
							<div className="overflow-hidden shadow ring-1 ring-black ring-opacity-5 md:rounded-lg">
								<InstructorSectionsTable/>
							</div>
						</div>
					</div>
				</div>
			</div>
			<NewQuizSlideOver open={openNewQuizSlideOver} setOpen={setOpenNewQuizSlideOver}/>
		</>
	);
};

export default InstructorQuizzesPage;

