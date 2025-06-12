/* eslint-disable no-undef */
import clsx from "clsx";
import { BiMailSend, BiPhone } from "react-icons/bi";
import { FaXmark } from "react-icons/fa6";
import { Link } from "@inertiajs/react";
import { useEffect, useState } from "react";

const NavbarOffcanvas = ({
    isNavVisible,
    handleLinkClick,
    handleDropdownButtonClick,
    auth,
}) => {
    const LinkClass =
        "text-xl lg:text-2xl capitalize font-[Helvetica-regular] w-max text-black hover:text-teal-400 transition ";

        const [namaAplikasi, setNamaAplikasi] = useState("");
        const [deskripsiAplikasi, setDeskripsiAplikasi] = useState("");
    
        
        useEffect(() => {
            axios.get('/navbar-config')
                .then(response => {
                    setNamaAplikasi(response.data.nama_aplikasi); 
                    setDeskripsiAplikasi(response.data.deskripsi_aplikasi); 
                })
                .catch(error => {
                    console.error("Error fetching navbar config:", error);
                });
            
        }, []);

    return (
        <nav
            className={clsx(
                "fixed lg:left-20 lg:right-20 left-0 right-0 bottom-0 top-0 lg:top-5 lg:bottom-5 lg:rounded z-[200] lg:items-center bg-white lg:bg-neutral-100 shadow-inner lg:shadow-none transition-opacity flex justify-center gap-2 duration-500 ",
                isNavVisible ? "opacity-100" : "opacity-0 pointer-events-none"
            )}
        >
            <div className="absolute top-10 right-10 lg:right-20 z-50">
                <button
                    onClick={handleDropdownButtonClick}
                    className={clsx(
                        "text-black  flex transition-opacity items-center justify-center text-3xl font-thin"
                    )}
                >
                    <FaXmark />
                </button>
            </div>
            <div className="flex lg:flex-row flex-col gap-3">
                <div className="flex flex-col gap-3 md:pt-0 relative z-30 pt-24">
                    <h1 className="font-[Helvetica-bold] text-black  tracking-wide text-3xl lg:text-5xl">
                {namaAplikasi || "Doa"}
                        
                    </h1>
                    <p className="font-[Helvetica-regular] text-black  text-base lg:text-xl tracking-wide max-w-[340px]">
                    {deskripsiAplikasi || "deskripsi"}

                    </p>

                    <div className="flex items-center gap-3">
                        <BiPhone className="lg:w-10 lg:h-10 h-7 w-7 p-1 rounded-full border border-teal-400 text-teal-500" />{" "}
                        <span className="text-black  font-[Helvetica-regular] text-base tracking-wide">
                            +62 895631780343
                        </span>
                    </div>
                    <div className="flex items-center gap-3">
                        <BiMailSend className="lg:w-10 lg:h-10 h-7 w-7 p-1 rounded-full border border-teal-400 text-teal-500" />{" "}
                        <span className="text-black  font-[Helvetica-regular] text-base tracking-wide">
                            devstackweb@gmail.com
                        </span>
                    </div>
                </div>

                <div className="flex flex-col gap-3 md:pt-0 relative z-30 mt-10 lg:mt-0">
                    <a href="/" onClick={handleLinkClick} className={LinkClass}>
                        Beranda
                    </a>
                    <a href="" onClick={handleLinkClick} className={LinkClass}>
                        Cari
                    </a>
                    <a href="" onClick={handleLinkClick} className={LinkClass}>
                        Koleksi
                    </a>
                    {auth.user ? (
                        <Link href={route("logout")} method="post" as="button" className={LinkClass}>
                            Logout
                        </Link>
                    ) : (
                        <a
                            href={route("login")}
                            onClick={handleLinkClick}
                            className={LinkClass}
                        >
                            Masuk
                        </a>
                    )}
                </div>
                
            </div>

            <div className="absolute font-[Helvetica-regular] py-5 lg:px-10 px-5 text-black  top-0 left-0 right-0 lg:flex items-center justify-between">
                <h1 className="text-sm mb-2 lg:mb-0">
                {namaAplikasi || "Doa"}
                </h1>
                
            </div>
        </nav>
    );
};

export default NavbarOffcanvas;
