import { LockClosedIcon } from '@heroicons/react/20/solid';
import { useState, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { useLoginMutation } from '../../features/auth/authApiSlice';
import { setCredentials } from '../../features/auth/authSlice';
import FeedbackAlert from '../../components/FeedbackAlert';
import logo from '../../assets/logos/logo-light@2x.png';

export default function LoginPage() {
	const emailRef = useRef();
	const errorRef = useRef();
	const [email, setEmail] = useState('');
	const [password, setPassword] = useState('');
	const [error, setError] = useState('');

	const [login, { isLoading }] = useLoginMutation();
	const dispatch = useDispatch();
	const navigate = useNavigate();

	const handleSubmit = async (e) => {
		e.preventDefault();
		emailRef.current = email;
		try {
			const userData = await login({ email, password }).unwrap();
			console.log(userData);
			dispatch(setCredentials({ ...userData, email }));
			setEmail('');
			setPassword('');
			emailRef.current = null;

			switch (userData.userType) {
				case 'admin':
					navigate('/admin/dashboard');
					break;
				case 'subAdmin':
					navigate('/sub-admin/dashboard');
					break;
				case 'instructor':
					navigate('/instructor/dashboard');
					break;
				case 'student':
					navigate('/student/dashboard');
					break;
				default:
					navigate('/404');
					break;
			}
		} catch (err) {
			console.log(err);
			if (!err?.originalStatus) {
				setError('Server not responding! Please try again later.');
			} else if (err?.originalStatus === 400) {
				setError('Please fill all the fields!');
			} else if (err?.originalStatus === 401) {
				setError('Email or Password Incorrect!');
			} else {
				setError('Login Failed!');
			}
			errorRef.current = error;
		}
	};

	const handleEmailInput = (e) => setEmail(e.target.value);
	const handlePasswordInput = (e) => setPassword(e.target.value);

	const feedbackAlert =
		error === '' ? null : (
			<div className='mt-6'>
				<FeedbackAlert type='error' content={error} />
			</div>
		);

	const content = isLoading ? (
		<h1>Loading...</h1>
	) : (
		<>
			<div>
				<img
					className='mx-auto h-12 w-auto'
					src={logo}
					alt='Your Company'
				/>
				<h2 className='mt-6 text-center text-3xl font-bold tracking-tight text-gray-900'>
					Sign in to your account
				</h2>
				{feedbackAlert}
			</div>
			<form className='mt-8 space-y-6' onSubmit={handleSubmit}>
				<input type='hidden' name='remember' defaultValue='true' />
				<div className='-space-y-px rounded-md shadow-sm'>
					<div>
						<label htmlFor='email-address' className='sr-only'>
							Email address
						</label>
						<input
							id='email-address'
							name='email'
							type='email'
							autoComplete='email'
							defaultValue={emailRef.current}
							required
							className='relative block w-full appearance-none rounded-none rounded-t-md border border-gray-300 px-3 py-2 text-gray-900 placeholder-gray-500 focus:z-10 focus:border-primary-500 focus:outline-none focus:ring-primary-500 sm:text-sm'
							placeholder='Email address'
							onChange={handleEmailInput}
						/>
					</div>
					<div>
						<label htmlFor='password' className='sr-only'>
							Password
						</label>
						<input
							id='password'
							name='password'
							type='password'
							autoComplete='current-password'
							required
							className='relative block w-full appearance-none rounded-none rounded-b-md border border-gray-300 px-3 py-2 text-gray-900 placeholder-gray-500 focus:z-10 focus:border-primary-500 focus:outline-none focus:ring-primary-500 sm:text-sm'
							placeholder='Password'
							onChange={handlePasswordInput}
						/>
					</div>
				</div>

				<div className='flex items-center justify-between'>
					<div className='flex items-center'>
						<input
							id='remember-me'
							name='remember-me'
							type='checkbox'
							className='h-4 w-4 rounded border-gray-300 text-primary-700 focus:ring-primary-500'
						/>
						<label
							htmlFor='remember-me'
							className='ml-2 block text-sm text-gray-900'
						>
							Remember me
						</label>
					</div>
				</div>

				<div>
					<button
						type='submit'
						className='group relative flex w-full justify-center rounded-md border border-transparent bg-primary-900 py-2 px-4 text-sm font-medium text-white hover:bg-primary-800 focus:outline-none focus:ring-2 focus:ring-primary-500 focus:ring-offset-2'
					>
						<span className='absolute inset-y-0 left-0 flex items-center pl-3'>
							<LockClosedIcon
								className='h-5 w-5 text-primary-500 group-hover:text-primary-400'
								aria-hidden='true'
							/>
						</span>
						Sign in
					</button>
				</div>
			</form>
		</>
	);

	return (
		<>
			<div className='flex min-h-full items-center justify-center py-12 px-4 sm:px-6 lg:px-8'>
				<div className='w-full max-w-md space-y-8'>{content}</div>
			</div>
		</>
	);
}
