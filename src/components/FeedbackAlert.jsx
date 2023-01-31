// prop1: type = error, warning, success
// prop2: content = error body

import {CheckCircleIcon, ExclamationTriangleIcon,} from '@heroicons/react/20/solid';

export default function FeedbackAlert(props) {
    switch (props.type) {
        case 'error':
            return (
                <div
                    className={`border-l-4 border-red-400 rounded-md bg-red-50 p-4`}
                >
                    <div className='flex'>
                        <div className='flex-shrink-0'>
                            <CheckCircleIcon
                                className={`h-5 w-5 text-red-400`}
                                aria-hidden='true'
                            />
                        </div>
                        <div className='ml-3'>
                            <p className={`text-sm font-medium text-red-800`}>
                                {props.content}
                            </p>
                        </div>
                    </div>
                </div>
            );
        case 'warning':
            return (
                <div
                    className={`border-l-4 border-yellow-400 rounded-md bg-yellow-50 p-4`}
                >
                    <div className='flex'>
                        <div className='flex-shrink-0'>
                            <ExclamationTriangleIcon
                                className={`h-5 w-5 text-yellow-400`}
                                aria-hidden='true'
                            />
                        </div>
                        <div className='ml-3'>
                            <p
                                className={`text-sm font-medium text-yellow-800`}
                            >
                                {props.content}
                            </p>
                        </div>
                    </div>
                </div>
            );
        case 'success':
            return (
                <div
                    className={`border-l-4 border-green-400 rounded-md bg-green-50 p-4`}
                >
                    <div className='flex'>
                        <div className='flex-shrink-0'>
                            <CheckCircleIcon
                                className={`h-5 w-5 text-green-400`}
                                aria-hidden='true'
                            />
                        </div>
                        <div className='ml-3'>
                            <p className={`text-sm font-medium text-green-800`}>
                                {props.content}
                            </p>
                        </div>
                    </div>
                </div>
            );
        default:
            return (
                <div
                    className={`border-l-4 border-red-400 rounded-md bg-red-50 p-4`}
                >
                    <div className='flex'>
                        <div className='flex-shrink-0'>
                            <CheckCircleIcon
                                className={`h-5 w-5 text-red-400`}
                                aria-hidden='true'
                            />
                        </div>
                        <div className='ml-3'>
                            <p className={`text-sm font-medium text-red-800`}>
                                {props.content}
                            </p>
                        </div>
                    </div>
                </div>
            );
    }
}
