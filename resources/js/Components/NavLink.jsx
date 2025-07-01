import { Link } from '@inertiajs/react';
import clsx from 'clsx';

export default function NavLink({ active = false, children, ...props }) {
    return (
        <Link
            {...props}
            className={clsx(
                'text-sm md:text-sm font-[Helvetica-Bold] tracking-wide transition duration-150 py-2 px-3 rounded ease-in-out focus:outline-none hover:text-blue-600  md:hover:bg-blue-600 md:hover:text-white md:min-w-[200px]', active
                ? 'text-blue-700 md:text-black font-[Helvetica-Bold]'
                : 'text-black/70 font-[Helvetica-Regular]'
            )
            }
        >
            {children}
        </Link>
    );
}
