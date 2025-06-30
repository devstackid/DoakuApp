/* eslint-disable no-undef */
import { useState } from "react";
import Guest from "@/Layouts/GuestLayout";
import { Head, Link, usePage } from "@inertiajs/react";
import { FaHeart } from "react-icons/fa6";
import { BiHeart } from "react-icons/bi";
import axios from "axios";

function Doa({ favorites: initialFavorites, content }) {
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

    return (
        <Guest>
            <Head title="Munajat Ahlulbait" />

            <main className="w-full overflow-hidden py-24 lg:pt-24 lg:pb-0 px-5 lg:px-20">
                {/* Form Pencarian */}
                <div className="">
                    <div className="mb-5 mt-10">
                        <h1 className="text-xl font-[Helvetica-Regular] text-black">
                            Munajat Ahlulbait{" "}
                            <span className="block text-xs">
                                Kumpulan doa dan munajat ahlulbait
                            </span>
                        </h1>
                    </div>
                    <div className="w-full grid grid-cols-1 lg:grid-cols-2 gap-3 mt-5 lg:mt-0 py-2 lg:py-0 font-[Helvetica-regular]">
                        {content.length > 0 ? (
                            content.map((doa, i) => (
                                <div key={i} className="relative">
                                    <Link
                                        href={route("doa.show", [doa.id])}
                                        className="flex items-center gap-3 py-3 hover:bg-neutral-50 bg-white border rounded-md transition relative z-30"
                                    >
                                        <div className="flex items-center gap-3 pl-3">
                                            <div className="w-14 h-14 shrink-0 bg-black/70 rounded-full flex items-center justify-center border text-sm text-white">
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
                                        className="absolute top-4 rounded-xl px-3 py-2 bg-neutral-50 right-2 z-50"
                                    >
                                        {favorites.includes(doa.id) ? (
                                            <FaHeart className="w-6 h-6 text-red-500 hover:text-blue-500 transition" />
                                        ) : (
                                            <BiHeart className="w-7 h-7 text-red-500 hover:text-blue-500 transition" />
                                        )}
                                    </button>
                                </div>
                            ))
                        ) : (
                            <div className="text-center text-gray-500">
                                Tidak ada doa yang ditemukan untuk pencarian
                                ini.
                            </div>
                        )}
                    </div>
                </div>
            </main>
        </Guest>
    );
}

export default Doa;
