import { useState } from 'react';
import { Switch } from '@headlessui/react';

function classNames (...classes) {
	return classes.filter(Boolean)
	              .join(' ');
}

export default function AttendanceToggleButton () {
	const [enabled, setEnabled] = useState(false);
	
	return (
		<Switch
			checked={enabled}
			onChange={setEnabled}
			className={classNames(
				enabled ? 'bg-green-700' : 'bg-red-700',
				'relative inline-flex h-6 w-11 flex-shrink-0 cursor-pointer rounded-full border-2 border-transparent transition-colors duration-200 ease-in-out focus:outline-none'
			)}
		>
			<span className="sr-only">Use setting</span>
			<span
				className={classNames(
					enabled ? 'translate-x-5' : 'translate-x-0',
					'pointer-events-none relative inline-block h-5 w-5 transform rounded-full bg-white shadow ring-0 transition duration-200 ease-in-out'
				)}
			>
        <span
	        className={classNames(
		        enabled ? 'opacity-0 duration-100 ease-out' : 'opacity-100 duration-200 ease-in',
		        'absolute inset-0 flex h-full w-full items-center justify-center transition-opacity'
	        )}
	        aria-hidden="true"
        >
          <p className="text-red-700 font-bold text-xs">A</p>
        </span>
        <span
	        className={classNames(
		        enabled ? 'opacity-100 duration-200 ease-in' : 'opacity-0 duration-100 ease-out',
		        'absolute inset-0 flex h-full w-full items-center justify-center transition-opacity'
	        )}
	        aria-hidden="true"
        >
                    <p className="text-green-700 font-bold text-xs">P</p>
        </span>
      </span>
		</Switch>
	);
}
