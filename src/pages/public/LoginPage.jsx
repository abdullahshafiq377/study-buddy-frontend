import {useRef, useState} from 'react';
import {useNavigate} from 'react-router-dom';
import {useDispatch} from 'react-redux';
import {useLoginMutation} from '../../features/auth/authApiSlice';
import {setCredentials} from '../../features/auth/authSlice';
import FeedbackAlert from '../../components/FeedbackAlert';
import bgImage from '../../assets/logos/login-bg.jpg';
import logo from '../../assets/logos/logo-light@2x.png';

export default function LoginPage() {
    const emailRef = useRef();
    const errorRef = useRef();
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');

    const [login, {isLoading}] = useLoginMutation();
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();
        emailRef.current = email;
        try {
            const userData = await login({email, password}).unwrap();
            console.log(userData);
            dispatch(setCredentials({...userData, user: email}));
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
                <FeedbackAlert type='error' content={error}/>
            </div>
        );

    return (
        <>
            <div className='flex min-h-full'>
                <div className='flex flex-1 flex-col justify-center py-12 px-4 sm:px-6 lg:flex-none lg:px-20 xl:px-24'>
                    <div className='mx-auto w-full max-w-sm lg:w-96'>
                        <div>
                            <img
                                className='mx-auto h-12 w-auto'
                                src={logo}
                                alt='Your Company'
                            />
                            <h2 className='mt-20 text-center text-3xl font-bold tracking-tight text-gray-900'>
                                Sign in to your account
                            </h2>
                        </div>

                        <div className='mt-8'>
                            <div className='mt-6'>
                                <div className='mb-10'>{feedbackAlert}</div>
                                <form
                                    onSubmit={handleSubmit}
                                    className='space-y-6'
                                >
                                    <div>
                                        <label
                                            htmlFor='email'
                                            className='block text-sm font-medium text-gray-700'
                                        >
                                            Email address
                                        </label>
                                        <div className='mt-1'>
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
                                    </div>

                                    <div className='space-y-1'>
                                        <label
                                            htmlFor='password'
                                            className='block text-sm font-medium text-gray-700'
                                        >
                                            Password
                                        </label>
                                        <div className='mt-1'>
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
                                                className='h-4 w-4 rounded border-gray-300 text-primary-900 focus:ring-primary-600'
                                            />
                                            <label
                                                htmlFor='remember-me'
                                                className='ml-2 block text-sm text-gray-900'
                                            >
                                                Remember me
                                            </label>
                                        </div>

                                        <div className='text-sm'>
                                            <a
                                                href='#'
                                                className='font-medium text-primary-900 hover:text-primary-600'
                                            >
                                                Forgot your password?
                                            </a>
                                        </div>
                                    </div>

                                    <div>
                                        <button
                                            type='submit'
                                            className='flex w-full justify-center rounded-md border border-transparent bg-primary-900 py-2 px-4 text-sm font-medium text-white shadow-sm hover:bg-primary-700 focus:outline-none focus:ring-2 focus:ring-primary-600 focus:ring-offset-2'
                                        >
                                            Sign in
                                        </button>
                                        <p className='mt-36'></p>
                                    </div>
                                </form>
                            </div>
                        </div>
                    </div>
                </div>
                <div className='relative hidden w-0 flex-1 lg:block'>
                    <img
                        className='absolute inset-0 h-full w-full object-cover'
                        src={bgImage}
                        alt=''
                    />
                </div>
            </div>
        </>
    );
}
