import { Link } from '@inertiajs/react';
import clsx from 'clsx';

export default function NavLink({ active = false, children, ...props }) {
    return (
        <Link
            {...props}
            className={clsx(
                'text-xs md:text-sm font-Poppins transition duration-150 py-2 px-3 rounded ease-in-out focus:outline-none hover:text-teal-300 md:hover:text-black md:hover:bg-teal-300 md:min-w-[200px]', active
                ? 'text-teal-400 md:text-black font-bold'
                : 'text-black/70 font-normal'
            )
            }
        >
            {children}
        </Link>
    );
}
