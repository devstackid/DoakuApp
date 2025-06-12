/* eslint-disable no-undef */
import { Link, usePage } from '@inertiajs/react';
import clsx from 'clsx'
import { BiHeart, BiUser } from 'react-icons/bi'
import { FaCalendar, FaHeart } from 'react-icons/fa6';
import { HiHome } from 'react-icons/hi2';

const BottomNavbar = () => {
    const { auth } = usePage().props; // Mengambil status login dari props

  return (
    <nav
            className={clsx(
                "fixed z-[100] bottom-0 w-full px-5 rounded-t-3xl lg:hidden pt-5 pb-4 bg-white border-t shadow grid grid-cols-4 md:hidden transition font-[Helvetica-medium]"
            )}
        >
            <Link href="/" className={clsx("transition flex hover:opacity-50 items-center text-center justify-center flex-col gap-1", route().current('home') ? 'text-orange-500' : 'text-black')}>
                <HiHome className='w-5 h-5'/>
                <span className='text-base tracking-wide'>Beranda</span>
            </Link>
            <Link href={route('kalender.index')} className={clsx("transition flex hover:opacity-50 items-center text-center justify-center flex-col gap-1", route().current('kalender.index') ? 'text-orange-500' : 'text-black')}>
                <FaCalendar className='w-5 h-5'/>
                <span className='text-base tracking-wide'>Kalender</span>
            </Link>
            
            {auth.user ? (
                <>
                <Link href={route('koleksi', [auth.user.id])} className={clsx("transition flex hover:opacity-50 items-center text-center justify-center flex-col gap-1", route().current('koleksi') ? 'text-orange-500' : 'text-black')}>
                <FaHeart className='w-5 h-5'/>
                <span className='text-base tracking-wide'>Koleksi</span>
            </Link>
                <Link 
                    href={route('profile')}
                    className="transition flex hover:opacity-50 items-center text-center justify-center flex-col gap-1 text-black"
                >
                    <BiUser className="w-5 h-5" />
                    <span className="text-base tracking-wide">Profil</span>
                </Link>
                </>
            ) : (
                <>
                <Link href={route('login')} className={clsx("transition flex hover:opacity-50 items-center text-center justify-center flex-col gap-1", route().current('koleksi') ? 'text-orange-500' : 'text-black')}>
                <BiHeart className='w-5 h-5'/>
                <span className='text-base tracking-wide'>Koleksi</span>
            </Link>
                <Link 
                    href={route('login')} 
                    className={clsx(
                        "transition flex hover:opacity-50 items-center text-center justify-center flex-col gap-1", 
                        route().current('login') ? 'text-orange-500' : 'text-black'
                    )}
                >
                    <BiUser className="w-5 h-5" />
                    <span className="text-base tracking-wide">Masuk</span>
                </Link>
                </>
                
            )}
                
        </nav>
  )
}

export default BottomNavbar