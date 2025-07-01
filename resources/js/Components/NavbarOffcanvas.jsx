/* eslint-disable no-undef */
import clsx from "clsx";
import { BiSearch } from "react-icons/bi";
import { Link } from "@inertiajs/react";
import { FaGoogle } from "react-icons/fa";

const NavbarOffcanvas = ({
    isNavVisible,
    handleLinkClick,
    setSearchQuery2,
    filteredContent2,
    auth,
    searchQuery2,
}) => {
    const LinkClass =
        "text-xl lg:text-2xl capitalize font-[Helvetica-regular] text-black hover:text-teal-400 tracking-wide transition border-b border-neutral-200 py-2.5";

    return (
        <nav
            className={clsx(
                "fixed lg:left-20 lg:right-20 left-0 right-0 bottom-0 top-20 lg:top-5 lg:bottom-5 lg:rounded z-[200] lg:items-center bg-white lg:bg-neutral-100  lg:shadow-none transition-opacity px-5 gap-2 duration-500 ",
                isNavVisible ? "opacity-100" : "opacity-0 pointer-events-none"
            )}
        >
            <div className="">
                <form
                    onSubmit={(e) => e.preventDefault()}
                    className="relative flex items-center"
                >
                    <input
                        type="text"
                        className="rounded-md pl-10 border border-neutral-200 w-full text-sm tracking-wide font-[Helvetica-regular] text-black placeholder:text-black/70 py-2.5"
                        name="search"
                        id="search2"
                        placeholder="Cari Doa.."
                        value={searchQuery2}
                        onChange={(e) => setSearchQuery2(e.target.value)}
                        autoComplete="off"
                    />
                    <label htmlFor="search2" className="absolute left-3">
                        <BiSearch className="  w-5 h-5" />
                    </label>
                </form>
                {searchQuery2.length > 0 && (
                    <>
                        <div
                            onClick={() => setSearchQuery2("")}
                            className="mb-2"
                        >
                            <div
                                id="pencarian"
                                onClick={(e) => e.stopPropagation()} // ⛔ Cegah bubbling
                                className="h-max"
                            >
                                <div className="max-h-[30vh] overflow-y-auto border mt-1 rounded-md">
                                    {filteredContent2.map((data, i) => (
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
                    </>
                )}
                <div className="flex flex-col gap-5 md:pt-0 relative z-30 mt-3 lg:mt-0">
                    <Link
                        href={route("home")}
                        onClick={handleLinkClick}
                        className={LinkClass}
                    >
                        Beranda
                    </Link>
                    <Link
                        href={route("quran.index")}
                        onClick={handleLinkClick}
                        className={LinkClass}
                    >
                        Al-Qur&apos;an
                    </Link>
                    <Link
                        href={route("doa.index")}
                        onClick={handleLinkClick}
                        className={LinkClass}
                    >
                        Kumpulan Doa
                    </Link>
                    <Link
                        href={route("koleksi")}
                        onClick={handleLinkClick}
                        className={LinkClass}
                    >
                        Koleksi
                    </Link>
                    {auth.user ? (
                        <Link
                            href={route("logout")}
                            method="post"
                            as="button"
                            className="flex items-center text-center bg-red-500 text-white justify-center gap-3 py-2.5 px-4 rounded-3xl border text-base tracking-wide font-[Helvetica-bold]"
                        >
                            Keluar
                        </Link>
                    ) : (
                        <>
                            <Link
                                href={route("login")}
                                className="flex items-center text-center bg-blue-700 text-white justify-center gap-3 py-2.5 px-4 rounded-3xl border text-base tracking-wide font-[Helvetica-bold]"
                            >
                                Masuk
                            </Link>
                            <div className="flex items-center gap-2">
                                <hr className="w-full" />
                                <span className="text-xs font-[Helvetica-Regular] text-black/50">
                                    atau
                                </span>
                                <hr className="w-full" />
                            </div>
                            <Link
                                href="/auth/redirect/google"
                                className="flex items-center text-center justify-center gap-3 py-2.5 px-4 rounded-3xl border text-base tracking-wide font-[Helvetica-Bold]"
                            >
                                <FaGoogle className="text-orange-400" />{" "}
                                Lanjutkan dengan Google
                            </Link>
                        </>
                    )}
                </div>
            </div>
        </nav>
    );
};

export default NavbarOffcanvas;
