/* eslint-disable no-undef */
import { useMemo, useState } from "react";
import Guest from "@/Layouts/GuestLayout";
import { Head, Link, usePage } from "@inertiajs/react";
import { BiBookmark, BiSearch, BiSolidBookmark } from "react-icons/bi";
import axios from "axios";
import clsx from "clsx";

function Doa({ favorites: initialFavorites, content, categories }) {
    const { auth } = usePage().props;
    const [favorites, setFavorites] = useState(initialFavorites);
    const handleFavoriteToggle = (doaId) => {
        if (!auth.user) {
            window.location.href = route("login");
            return;
        }

        if (favorites.includes(doaId)) {
            axios
                .post(route("favorite.remove", doaId))
                .then(() => {
                    setFavorites((prevFavorites) =>
                        prevFavorites.filter((id) => id !== doaId)
                    );
                })
                .catch((error) => {
                    // console.error("Error removing favorite:", error);
                });
        } else {
            axios
                .post(route("favorite.add", doaId))
                .then(() => {
                    setFavorites((prevFavorites) => [...prevFavorites, doaId]);
                })
                .catch((error) => {
                    // console.error("Error adding favorite:", error);
                });
        }
    };

    const [searchTerm, setSearchTerm] = useState("");
    const [selectedCategory, setSelectedCategory] = useState(null);
    const filteredDoa = useMemo(() => {
        return content.filter((doa) => {
            const matchName = doa.title
                .toLowerCase()
                .includes(searchTerm.toLowerCase());
            const matchCategory =
                !selectedCategory || doa.category?.name === selectedCategory;
            return matchName && matchCategory;
        });
    }, [searchTerm, selectedCategory, content]);

    return (
        <Guest>
            <Head title="Munajat Ahlulbait" />

            <main className="w-full overflow-hidden py-24 lg:pt-24 lg:pb-0 px-5 lg:px-20">
                {/* Form Pencarian */}
                <div className="">
                    <div className="mt-10 mb-2 text-center">
                        <h1 className="text-3xl font-[Helvetica-Bold] text-black">
                            Munajat{" "}
                            <span className="text-blue-700">Ahlulbait</span>{" "}
                            <span className="block text-sm md:text-xl text-black/70 font-[Helvetica-Regular]">
                                Kumpulan doa dan munajat ahlulbait
                            </span>
                        </h1>
                        <form
                            onSubmit={(e) => e.preventDefault()}
                            className="flex items-center justify-center lg:justify-end gap-2 mt-5"
                        >
                            <label htmlFor="searchTerm">
                                <BiSearch className="w-6 h-6" />
                            </label>

                            <input
                                name="searchTerm"
                                id="searchTerm"
                                placeholder="Search.."
                                value={searchTerm}
                                onChange={(e) => setSearchTerm(e.target.value)}
                                className="text-sm w-full lg:w-max font-[Helvetica-Regular] text-black flex items-center gap-1 border px-2 rounded-md py-2"
                            />
                        </form>
                    </div>

                    <hr className="border-neutral-200" />

                    <div className="flex items-center md:justify-between gap-1 mt-2 overflow-x-auto pb-2">
                        {/* Tombol tampilkan semua */}
                        <div className="hidden md:inline">
                            <span className="text-sm font-[Helvetica-Bold] text-black">
                                Filter
                            </span>
                        </div>
                        <div className="flex items-center gap-1">
                            <button
                                type="button"
                                className={clsx(
                                    "text-sm tracking-wide px-3 md:px-5 font-[Helvetica-Regular] py-2 rounded-md text-nowrap shrink-0",
                                    selectedCategory === null
                                        ? "bg-blue-600 text-white"
                                        : "bg-neutral-50 text-black"
                                )}
                                onClick={() => setSelectedCategory(null)}
                            >
                                Semua
                            </button>

                            {/* Tombol tiap kategori */}
                            {categories.map((category, i) => (
                                <button
                                    type="button"
                                    key={i}
                                    className={clsx(
                                        "text-sm tracking-wide px-3 md:px-5 font-[Helvetica-Regular] py-2 rounded-md text-nowrap",
                                        selectedCategory === category.name
                                            ? "bg-blue-600 text-white"
                                            : "bg-neutral-50 text-black"
                                    )}
                                    onClick={() =>
                                        setSelectedCategory(
                                            selectedCategory === category.name
                                                ? null
                                                : category.name
                                        )
                                    }
                                >
                                    {category.name}
                                </button>
                            ))}
                        </div>
                    </div>

                    <hr className="mb-3" />

                    {filteredDoa.length > 0 ? (
                        <div className="w-full grid grid-cols-1 lg:grid-cols-2 gap-3 mt-5 lg:mt-0 py-2 lg:py-0 font-[Helvetica-regular]">
                            {filteredDoa.map((doa, i) => (
                                <div key={i} className="relative">
                                    <Link
                                        href={route("doa.show", [doa.id])}
                                        className="flex items-center gap-3 py-3 hover:bg-neutral-50 bg-white border rounded-md transition relative z-30"
                                    >
                                        <div className="flex items-center gap-3 pl-3">
                                            <div className="w-14 h-14 shrink-0 bg-blue-600 font-[Helvetica-Bold] rounded-full flex items-center justify-center border text-sm text-white">
                                                {1 + i}
                                            </div>
                                            <div>
                                                <h1 className="text-base font-[Helvetica-bold] tracking-wide text-black">
                                                    {doa.title}{" "}
                                                    <span className="block font-[Helvetica-light] text-xs truncate ...">
                                                        {doa.category.name}
                                                    </span>
                                                </h1>
                                            </div>
                                        </div>
                                    </Link>
                                    <button
                                        onClick={() =>
                                            handleFavoriteToggle(doa.id)
                                        }
                                        className="absolute top-4 rounded-xl px-3 py-2 bg-red-100/20  right-2 z-50"
                                    >
                                        {favorites.includes(doa.id) ? (
                                            <BiSolidBookmark className="w-6 h-6 text-red-500 hover:text-blue-500 transition" />
                                        ) : (
                                            <BiBookmark className="w-7 h-7 text-red-500 hover:text-blue-500 transition" />
                                        )}
                                    </button>
                                </div>
                            ))}
                        </div>
                    ) : (
                        <div className="text-center text-gray-500 font-[Helvetica-Regular]">
                            Tidak ada doa yang ditemukan untuk pencarian ini.
                        </div>
                    )}
                </div>
            </main>
        </Guest>
    );
}

export default Doa;
