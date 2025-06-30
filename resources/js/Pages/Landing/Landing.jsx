/* eslint-disable no-undef */
import { useEffect, useState } from "react";
import Guest from "@/Layouts/GuestLayout";
import { Head, Link, usePage } from "@inertiajs/react";
import { FaHeart } from "react-icons/fa6";
import { BiHeart } from "react-icons/bi";
import axios from "axios";

function Landing({ favorites: initialFavorites, content, surahs }) {
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
            <Head title="Beranda" />

            <main className="w-full overflow-hidden py-24 lg:pt-24 lg:pb-0 px-5 lg:px-20">
                {/* Form Pencarian */}
                <div className="">
                    <div className="w-full relative lg:h-[70vh] bg-cover bg-center border rounded-md mb-4 bg-[url('https://images.unsplash.com/photo-1618554844984-d4ed47c7e0c0?q=80&w=869&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D')]">
                        <div className="absolute inset-0 bg-black/20 z-10"></div>
                        <div className="relative z-20 lg:p-20 p-5">
                            <h1 className="lg:text-7xl text-3xl mb-2 font-[Helvetica-Bold] text-white ">
                                Tsaqalain
                            </h1>
                            <span className="block text-sm font-[Helvetica-Regular] text-white">
                                Al-Qur&apos;an & Munajat Ahlulbait
                            </span>
                            <p className="block text-xs lg:text-base font-[Helvetica-Regular] text-white mt-20 lg:max-w-[50%] tracking-wide">
                                Aplikasi ini menyajikan Al-Qur’an digital dan
                                kumpulan doa-doa pilihan dari Ahlulbait, lengkap
                                dengan munajat harian yang menyentuh hati.
                                Dirancang untuk menemani ibadah dan mendekatkan
                                diri kepada Allah melalui bacaan suci dan
                                lantunan doa penuh makna, di mana saja dan kapan
                                saja.
                            </p>
                        </div>
                    </div>
                    {/* Konten Doa */}
                    <div className="mb-5 mt-10">
                        <h1 className="text-xl font-[Helvetica-Regular] text-black">
                            Al-Qur’an{" "}
                            <span className="block text-xs">
                                Pilih surah yang ingin ditampilkan
                            </span>
                        </h1>
                    </div>

                    <div className="w-full grid grid-cols-1 lg:grid-cols-2 gap-3 mt-5 lg:mt-0 py-2 lg:py-0 font-[Helvetica-regular] lg:max-h-[83vh] lg:overflow-y-auto lg:pr-2">
                        {surahs.data.map((surah, i) => (
                            <div key={surah.number} className="relative">
                                <Link
                                    href={route("quran.show", [surah.number])}
                                    className="flex items-center gap-3 py-3 hover:bg-neutral-50 bg-white border rounded-md transition relative z-30"
                                >
                                    <div className="flex items-center gap-3 pl-3">
                                        <div className="w-14 h-14 shrink-0 bg-black/70 rounded-full flex items-center justify-center border text-sm text-white">
                                            {1 + i}
                                        </div>
                                        <div>
                                            <h1 className="text-base font-[Helvetica-bold] tracking-wide text-black">
                                                {surah.englishName} -{" "}
                                                {surah.name}
                                                <span className="block font-[Helvetica-light] text-xs truncate ..."></span>
                                            </h1>
                                        </div>
                                    </div>
                                </Link>
                            </div>
                        ))}
                    </div>
                    <div className="flex justify-center mb-5">
                        <Link
                            href={route('quran.index')}
                            className="text-sm font-[Helvetica-Regular] text-white bg-black/70 px-4 py-2.5 rounded-md mt-5"
                        >
                            Lihat Semua
                        </Link>
                    </div>
                    <hr />

                    <div className="mb-5 mt-10">
                        <h1 className="text-xl font-[Helvetica-Regular] text-black">
                            Munajat Ahlulbait{" "}
                            <span className="block text-xs">
                                Kumpulan doa dan munajat ahlulbait
                            </span>
                        </h1>
                    </div>
                    <div className="w-full grid grid-cols-1 lg:grid-cols-2 gap-3 mt-5 lg:mt-0 py-2 lg:py-0 font-[Helvetica-regular] lg:max-h-[83vh] lg:overflow-y-auto lg:pr-2">
                        {content.data.length > 0 ? (
                            content.data.map((doa, i) => (
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
                    <div className="flex justify-center">
                        <Link
                            href={route('doa.index')}
                            className="text-sm font-[Helvetica-Regular] text-white bg-black/70 px-4 py-2.5 rounded-md mt-5"
                        >
                            Lihat Semua
                        </Link>
                    </div>
                </div>
            </main>
        </Guest>
    );
}

export default Landing;
