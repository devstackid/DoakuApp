/* eslint-disable no-undef */
import clsx from "clsx";
import { useEffect, useState } from "react";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { gsap } from "gsap";
import { HiBars2, HiXMark } from "react-icons/hi2";
import { Link, usePage } from "@inertiajs/react";

gsap.registerPlugin(ScrollTrigger);

export default function NavBar({ handleDropdownButtonClick, isNavVisible }) {
    const { auth } = usePage().props;
    const [namaAplikasi, setNamaAplikasi] = useState("");

    
    useEffect(() => {
        axios.get('/navbar-config')
            .then(response => {
                setNamaAplikasi(response.data.nama_aplikasi); 
            })
            .catch(error => {
                console.error("Error fetching navbar config:", error);
            });
        
        gsap.to(".dropdownButton", { opacity: 1, ease: "none", delay: 1.5 });
    }, []);
    return (
        <nav
            className={clsx(
                "fixed z-[100] top-0 w-full px-5 md:px-20 pt-5 pb-4 flex justify-between items-center transition bg-white"
            )}
        >
            <h1 className="font-[Helvetica-bold] text-xl text-black">
                {namaAplikasi || "Doa"}
            </h1>
            <div className="flex items-center gap-7">
                <div className="md:flex shrink-0 items-center gap-5 font-[Helvetica-regular] text-[0.85rem] text-gray-500/75 hidden">
                    <Link
                        href="/"
                        className="hover:text-teal-400 transition tracking-wide"
                    >
                        Beranda
                    </Link>
                    <Link
                        href={route("kalender.index")}
                        className="hover:text-teal-400 transition tracking-wide"
                    >
                        Kalender
                    </Link>
                    {auth.user ? (
                        <>
                            <Link
                                href={route("koleksi", [auth.user.id])}
                                className="hover:text-teal-400 transition tracking-wide"
                            >
                                Koleksi
                            </Link>
                            <Link
                                href={route("profile")}
                                className="hover:text-teal-400 transition tracking-wide"
                            >
                                Profile
                            </Link>
                        </>
                    ) : (
                        <>
                            <Link
                                href={route('login')}
                                className="hover:text-teal-400 transition tracking-wide"
                            >
                                Koleksi
                            </Link>
                            <Link
                                href={route("login")}
                                className="hover:text-teal-400 bg-blue-600 px-5 py-2 text-white rounded-md transition tracking-wide"
                            >
                                Login
                            </Link>
                        </>
                    )}
                </div>
                <button
                    onClick={handleDropdownButtonClick}
                    className={clsx(
                        "dropdownButton relative flex transition-opacity items-center justify-center opacity-0 w-12 h-12 text-2xl lg:hidden",
                        isNavVisible
                            ? "bg-[#030510]  text-neutral-100 rounded-md"
                            : " text-black"
                    )}
                >
                    {isNavVisible ? <HiXMark /> : <HiBars2 />}
                </button>
            </div>
        </nav>
    );
}
