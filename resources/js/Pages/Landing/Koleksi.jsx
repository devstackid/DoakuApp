/* eslint-disable no-undef */
import Guest from "@/Layouts/GuestLayout";
import { Head, usePage } from "@inertiajs/react";
import axios from "axios";
import { FaHeart } from "react-icons/fa6";
import { useState } from "react";

function Koleksi({ favorites: initialFavorites }) {
    // State untuk menyimpan favorit
    const [favorites, setFavorites] = useState(initialFavorites);
    const { auth } = usePage().props;

    const handleFavoriteRemove = (doaId) => {
        if (!auth.user) {
            window.location.href = route("login");
            return;
        }
    
        // Hapus dari favorit, karena di halaman ini hanya boleh hapus
        if (favorites.some(favorite => favorite.doa.id === doaId)) {
            axios.post(route("favorite.remove", doaId)).then(() => {
                setFavorites(prevFavorites => 
                    prevFavorites.filter(favorite => favorite.doa.id !== doaId)
                );
            }).catch(error => {
                console.error('Error removing favorite:', error);
            });
        }
    };

    return (
        <Guest>
            <Head title="Koleksi" />

            <main className="w-full overflow-x-hidden py-24 px-5 lg:px-20">
                {/* Konten Doa */}
                <h1 className="text-base font-[Helvetica-regular] w-max mb-3 text-black border-b">Koleksi Anda</h1>
                <div className="w-full grid grid-cols-1 gap-3 font-[Helvetica-regular]">
                    {favorites.length > 0 ? (
                        favorites.map((favorite, i) => (
                            <div key={i} className="relative">
                                <a
                                    href={route("doa.show", [favorite.doa.id])}
                                    className="flex items-center gap-3 py-3 hover:bg-neutral-50 transition relative z-30"
                                >
                                    <div className="flex items-center gap-3">
                                        <div className="w-14 h-14 shrink-0 bg-neutral-50 flex items-center justify-center text-sm text-black">
                                            {favorite.doa.title[0]}
                                        </div>
                                        <div>
                                            <h1 className="text-base font-[Helvetica-bold] tracking-wide text-black">
                                                {favorite.doa.title}{" "}
                                                <span className="block font-[Helvetica-light] text-xs truncate ...">
                                                    {
                                                        favorite.doa.category
                                                            ?.description
                                                    }
                                                </span>
                                            </h1>
                                        </div>
                                    </div>
                                </a>
                                <button
                                    onClick={() =>
                                        handleFavoriteRemove(favorite.doa.id)
                                    }
                                    className="absolute top-4 rounded-xl px-3 py-2 bg-neutral-50 right-2 z-50"
                                >
                                    <FaHeart className="w-6 h-6 text-red-500 hover:text-blue-500 transition" />
                                </button>
                            </div>
                        ))
                    ) : (
                        <div className="text-center text-gray-500 mt-5 font-[Helvetica-regular] text-sm tracking-wide ">
                            Belum ada doa yang ditambahkan ke koleksi
                        </div>
                    )}
                </div>
            </main>
        </Guest>
    );
}

export default Koleksi;
