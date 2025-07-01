/* eslint-disable no-undef */
import clsx from "clsx";
import { useEffect } from "react";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { gsap } from "gsap";
import { HiBars2, HiXMark } from "react-icons/hi2";
import { Link, usePage } from "@inertiajs/react";
import {BiLogOutCircle, BiSearch } from "react-icons/bi";

gsap.registerPlugin(ScrollTrigger);

export default function NavBar({
    handleDropdownButtonClick,
    isNavVisible,
    filteredContent,
    setSearchQuery,
    openSearchForm,
    toggleSearchForm,
    searchQuery,
}) {
    const { auth } = usePage().props;

    
    return (
        <>
            <nav
                className={clsx(
                    "fixed z-[100] top-0 w-full px-5 md:px-20 pt-5 pb-4 border-b flex justify-between transition bg-white"
                )}
            >
                <div className="flex gap-16">
                    <h1 className="font-[Helvetica-Black] text-xl text-blue-700">
                        Tsaqalain{" "}
                        <span className="block text-xs text-black font-[Helvetica-Regular]">
                            Al-Quran & Munajat Ahlulbait
                        </span>
                    </h1>
                </div>
                <div className="flex items-center gap-7 self-end">
                    <div className="lg:flex shrink-0 items-center gap-3 font-[Helvetica-regular] text-sm text-gray-500/75 hidden">
                        <Link
                            href="/"
                            className="hover:text-blue-700 transition font-[Helvetica-Medium] hidden md:inline text-sm text-black tracking-wide"
                        >
                            Beranda
                        </Link>
                        <Link
                            href={route("quran.index")}
                            className="hover:text-blue-700 transition font-[Helvetica-Medium] hidden md:inline text-sm text-black tracking-wide"
                        >
                            Al-Qur&apos;an
                        </Link>
                        <Link
                            href={route("doa.index")}
                            className="hover:text-blue-700 transition font-[Helvetica-Medium] hidden md:inline text-sm text-black tracking-wide"
                        >
                            Kumpulan Doa
                        </Link>
                        <Link
                            href={route("koleksi")}
                            className="hover:text-blue-700 transition font-[Helvetica-Medium] hidden md:inline text-sm text-black tracking-wide"
                        >
                            Koleksi
                        </Link>

                        <button
                            onClick={toggleSearchForm}
                            className="text-sm font-[Helvetica-Regular] text-black/70 flex items-center gap-1 border px-2 rounded-md py-2 hover:bg-neutral-50 transition"
                        >
                            <BiSearch className="w-5 h-5" />
                        </button>

                        <div className="border-r w-1 h-10 border-neutral-200"></div>

                        {!auth.user ? (
                            <Link
                                href={route("login")}
                                className="hover:bg-white hover:text-blue-700 bg-blue-600 px-5 py-2 text-white rounded-md transition tracking-wide"
                            >
                                Masuk
                            </Link>
                        ) : (
                            <Link
                                href={route("logout")}
                                method="post"
                                as="button"
                                className="flex items-center gap-2 justify-center text-black group"
                            >
                                <div className="w-8 h-8 flex items-center justify-center rounded-full bg-red-500 text-white group-hover:bg-white group-hover:text-black transition">
                                    <BiLogOutCircle className="w-4 h-4" />
                                </div>{" "}
                                Keluar
                            </Link>
                        )}
                    </div>
                    <button
                        onClick={handleDropdownButtonClick}
                        className={clsx(
                            "dropdownButton relative flex transition-opacity items-center justify-center w-12 h-12 text-2xl lg:hidden",
                            isNavVisible
                                ? " text-black rounded-md"
                                : " text-black"
                        )}
                    >
                        {isNavVisible ? <HiXMark /> : <HiBars2 />}
                    </button>
                </div>
            </nav>

            {openSearchForm && (
                <div
                    onClick={toggleSearchForm}
                    className="fixed flex justify-center bg-black/25 backdrop-blur-sm inset-0 z-[999] pt-20"
                >
                    <div
                        id="pencarian"
                        onClick={(e) => e.stopPropagation()} // ⛔ Cegah bubbling
                        className="bg-white rounded-xl shadow w-[50%] h-max overflow-hidden"
                    >
                        <form
                            onSubmit={(e) => e.preventDefault()}
                            className="relative flex items-center"
                        >
                            <input
                                type="text"
                                className="!border-none !ring-0 !outline-none pl-10 w-full text-sm tracking-wide font-[Helvetica-regular] text-black placeholder:text-black/70 py-4"
                                name="search"
                                id="search"
                                placeholder="Cari.."
                                autoFocus={true}
                                value={searchQuery}
                                onChange={(e) => setSearchQuery(e.target.value)}
                                autoComplete="off"
                            />
                            <label htmlFor="search" className="absolute left-3">
                                <BiSearch className="  w-5 h-5" />
                            </label>
                        </form>
                        <hr />
                        <span className="block text-base px-5 py-3 font-[Helvetica-Bold]">
                            Hasil Pencarian
                        </span>
                        <hr />
                        <div className="max-h-[60vh] overflow-y-auto">
                            {filteredContent.map((data, i) => (
                                <Link
                                    className="block hover:text-blue-700 hover:bg-neutral-50 transition text-black/70 text-sm px-5 border-b bg-white font-[Helvetica-Regular] py-4"
                                    href={route("doa.show", [data.id])}
                                    key={i}
                                >
                                    {data.title}
                                </Link>
                            ))}
                        </div>
                    </div>
                </div>
            )}
        </>
    );
}
