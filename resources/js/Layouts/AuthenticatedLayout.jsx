/* eslint-disable no-undef */
import ApplicationLogo from "@/Components/ApplicationLogo";
import Dropdown from "@/Components/Dropdown";
import NavLink from "@/Components/NavLink";
import { Link } from "@inertiajs/react";
import {
    BiCalendar,
    BiImageAdd,
    BiListPlus,
    BiLogOut,
    BiNotification,
    BiPieChart,
} from "react-icons/bi";
import { FaMagic, FaToolbox, FaUserFriends } from "react-icons/fa";
import { FaUsers } from "react-icons/fa6";
import { GiBank } from "react-icons/gi";

export default function Authenticated({ user, children }) {
    return (
        <div className="h-screen overflow-hidden bg-neutral-100 relative">
            {/* Navbar */}
            <div className="fixed top-0 w-full flex justify-between z-50 h-16 px-4 md:px-10 border-b border-neutral-50 bg-white">
                <div className="flex items-center gap-3">
                    <div className="shrink-0 flex items-center">
                        <Link href="/">
                            <ApplicationLogo className="block h-9 w-auto fill-current text-gray-800" />
                        </Link>
                    </div>

                    <span className="text-black font-poppins font-semibold text-base">
                        Shafinah
                    </span>

                    <div className="ml-24 hidden md:flex flex-col">
                        <h1 className="text-xl font-bold text-black font-poppins">
                            Hai, {user.name}{" "}
                            <small className="block text-xs font-normal text-black/75">
                                Selamat datang di halaman dashboard
                            </small>
                        </h1>
                    </div>
                </div>

                <div className="flex items-center sm:ms-6">
                    <div className="ms-3 relative">
                        <Dropdown>
                            <Dropdown.Trigger>
                                <span className="inline-flex rounded-md">
                                    <button
                                        type="button"
                                        className="inline-flex items-center px-3 py-2 border border-transparent text-sm rounded-md focus:outline-none transition ease-in-out duration-150"
                                    >
                                        <div className="w-10 h-10 rounded-full font-medium text-black font-poppins relative leading-10 capitalize ring-2 ring-teal-200">
                                            {user.name[0]}
                                            <div className="absolute top-0 right-0 ring-2 ring-teal-100 w-2 h-2 bg-teal-200 rounded-full"></div>
                                        </div>

                                        <svg
                                            className="ms-2 -me-0.5 h-4 w-4"
                                            xmlns="http://www.w3.org/2000/svg"
                                            viewBox="0 0 20 20"
                                            fill="currentColor"
                                        >
                                            <path
                                                fillRule="evenodd"
                                                d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z"
                                                clipRule="evenodd"
                                            />
                                        </svg>
                                    </button>
                                </span>
                            </Dropdown.Trigger>

                            <Dropdown.Content>
                                <Dropdown.Link href={route("profile.edit")}>
                                    Profile
                                </Dropdown.Link>
                                <Dropdown.Link
                                    href={route("logout")}
                                    method="post"
                                    as="button"
                                >
                                    Log Out
                                </Dropdown.Link>
                            </Dropdown.Content>
                        </Dropdown>
                    </div>
                </div>
            </div>

            {/* Layouts */}
            <div className="flex h-full bg-white pt-16 pb-16 md:pb-0">
                <div className="hidden md:flex flex-col justify-between px-5 border-r border-neutral-50 pt-10 pb-5">
                    <div className="flex flex-col gap-1.5">
                        <NavLink
                            href={route("admin.dashboard")}
                            active={route().current("admin.dashboard")}
                        >
                            <div className="flex items-center gap-4">
                                <BiPieChart className="text-xl opacity-75" />{" "}
                                <span>Dashboard</span>
                            </div>
                        </NavLink>
                        <NavLink
                            href={route("admin.users.dashboard")}
                            active={route().current("admin.users.dashboard")}
                        >
                            <div className="flex items-center gap-4">
                                <FaUsers className="text-xl opacity-75" />{" "}
                                <span>Users</span>
                            </div>
                        </NavLink>
                        <NavLink
                            href={route("admin.kategori.dashboard")}
                            active={route().current("admin.kategori.dashboard")}
                        >
                            <div className="flex items-center gap-4">
                                <FaMagic className="text-xl opacity-75" />{" "}
                                <span>Kategori</span>
                            </div>
                        </NavLink>
                        <NavLink
                            href={route("admin.doa.dashboard")}
                            active={route().current("admin.doa.dashboard")}
                        >
                            <div className="flex items-center gap-4">
                                <BiNotification className="text-xl opacity-75" />{" "}
                                <span>Doa</span>
                            </div>
                        </NavLink>
                        <NavLink
                            href={route("admin.event.dashboard")}
                            active={route().current("admin.event.dashboard")}
                        >
                            <div className="flex items-center gap-4">
                                <BiCalendar className="text-xl opacity-75" />{" "}
                                <span>Acara</span>
                            </div>
                        </NavLink>
                        <NavLink
                            href={route("admin.configs.dashboard")}
                            active={route().current("admin.configs.dashboard")}
                        >
                            <div className="flex items-center gap-4">
                                <FaToolbox className="text-xl opacity-75" />{" "}
                                <span>Config</span>
                            </div>
                        </NavLink>
                    </div>

                    {/* bawah */}
                    <div className="flex flex-col gap-3">
                        <NavLink
                            href={route("logout")}
                            // active={route().current("user.dashboard")}
                        >
                            <div className="flex items-center gap-4">
                                <BiLogOut className="text-xl opacity-75" />{" "}
                                <span>Logout</span>
                            </div>
                        </NavLink>
                    </div>
                </div>
                <main className="w-full h-auto overflow-y-auto overflow-x-hidden md:overflow-hidden pl-2">
                    {children}
                </main>
            </div>

            {/* Mobile Navigation View */}
            <nav className="md:hidden fixed bottom-0 w-full z-50 grid grid-cols-5 gap-1 pb-3 pt-2 border-t px-2 bg-white border-neutral-100">
                <NavLink
                    href={
                        user.role == "other"
                            ? route("user.dashboard")
                            : route("admin.dashboard")
                    }
                    active={
                        user.role == "other"
                            ? route().current("user.dashboard")
                            : route().current("admin.dashboard")
                    }
                >
                    <div className="flex flex-col items-center gap-1">
                        <BiPieChart className="text-xl opacity-75" />{" "}
                        <small>Dashboard</small>
                    </div>
                </NavLink>
                <NavLink
                    href={
                        user.role == "other"
                            ? route("user.content.dashboard")
                            : route("admin.users.dashboard")
                    }
                    active={
                        user.role == "other"
                            ? route().current("user.content.dashboard")
                            : route().current("admin.users.dashboard")
                    }
                >
                    <div className="flex flex-col items-center gap-1">
                        {user.role == "other" ? (
                            <>
                                <BiListPlus className="text-xl opacity-75" />{" "}
                                <small>Content</small>
                            </>
                        ) : (
                            <>
                                <FaUsers className="text-xl opacity-75" />{" "}
                                <small>Users</small>
                            </>
                        )}
                    </div>
                </NavLink>
                <NavLink
                    href={
                        user.role == "other"
                            ? route("user.gallery.dashboard")
                            : route("admin.kategori.dashboard")
                    }
                    active={
                        user.role == "other"
                            ? route().current("user.gallery.dashboard")
                            : route().current("admin.kategori.dashboard")
                    }
                >
                    <div className="flex flex-col items-center gap-1">
                        {user.role == "other" ? (
                            <>
                                <BiImageAdd className="text-xl opacity-75" />{" "}
                                <small>Gallery</small>
                            </>
                        ) : (
                            <>
                                <FaMagic className="text-xl opacity-75" />{" "}
                                <small>Kategori</small>
                            </>
                        )}
                    </div>
                </NavLink>
                <NavLink
                    href={
                        user.role == "other"
                            ? route("user.gift.dashboard")
                            : route("admin.doa.dashboard")
                    }
                    active={
                        user.role == "other"
                            ? route().current("user.gift.dashboard")
                            : route().current("admin.doa.dashboard")
                    }
                >
                    <div className="flex flex-col items-center gap-1">
                        {user.role == "other" ? (
                            <>
                                <GiBank className="text-xl opacity-75" />{" "}
                                <small>Gift</small>
                            </>
                        ) : (
                            <>
                                <BiNotification className="text-xl opacity-75" />{" "}
                                <small>Doa</small>
                            </>
                        )}
                    </div>
                </NavLink>
                <NavLink
                    href={
                        user.role == "other"
                            ? route("user.guest.dashboard")
                            : route("admin.configs.dashboard")
                    }
                    active={
                        user.role == "other"
                            ? route().current("user.guest.dashboard")
                            : route().current("admin.configs.dashboard")
                    }
                >
                    <div className="flex flex-col items-center gap-1">
                        {user.role == "other" ? (
                            <>
                                <FaUserFriends className="text-xl opacity-75" />{" "}
                                <small>Guest</small>
                            </>
                        ) : (
                            <>
                                <FaToolbox className="text-xl opacity-75" />{" "}
                                <small>Config</small>
                            </>
                        )}
                    </div>
                </NavLink>
            </nav>
        </div>
    );
}
