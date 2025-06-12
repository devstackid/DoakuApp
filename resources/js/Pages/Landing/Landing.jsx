/* eslint-disable no-undef */
import { useEffect, useState } from "react";
import Guest from "@/Layouts/GuestLayout";
import { Head, Link, usePage } from "@inertiajs/react";
import { BiSearch } from "react-icons/bi";
import { FaHeart } from "react-icons/fa6";
import { BiHeart } from "react-icons/bi";
import axios from "axios";

function Landing({ content, categories, favorites: initialFavorites }) {
    const { auth } = usePage().props;
    const [selectedCategory, setSelectedCategory] = useState("semua");
    const [favorites, setFavorites] = useState(initialFavorites);
    const [searchQuery, setSearchQuery] = useState(""); // State untuk pencarian

    const filteredContent = content
        .filter((doa) => {
            if (selectedCategory === "semua") return true;
            return doa.category.name === selectedCategory;
        })
        .filter((doa) => {
            // Filter berdasarkan pencarian
            return doa.title.toLowerCase().includes(searchQuery.toLowerCase());
        });

    // Fungsi untuk toggle favorite (add/remove)
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
                    console.error("Error removing favorite:", error);
                });
        } else {
            axios
                .post(route("favorite.add", doaId))
                .then(() => {
                    setFavorites((prevFavorites) => [...prevFavorites, doaId]);
                })
                .catch((error) => {
                    console.error("Error adding favorite:", error);
                });
        }
    };

    const [namaAplikasi, setNamaAplikasi] = useState("");
    const [deskripsiAplikasi, setDeskripsiAplikasi] = useState("");

    useEffect(() => {
        axios
            .get("/navbar-config")
            .then((response) => {
                setNamaAplikasi(response.data.nama_aplikasi);
                setDeskripsiAplikasi(response.data.deskripsi_aplikasi);
            })
            .catch((error) => {
                console.error("Error fetching navbar config:", error);
            });
    }, []);

    return (
        <Guest>
            <Head title="Beranda" />

            <main className="w-full overflow-hidden py-24 lg:pt-24 lg:pb-0 px-5 lg:px-20">
                {/* Form Pencarian */}
                <div className="grid lg:grid-cols-4 lg:gap-10">
                    <div className="lg:max-h-[83vh] lg:overflow-y-auto lg:px-2">
                        <div className="hidden lg:block mb-5 bg-rose-100 rounded-md shadow p-5">
                            <div className="flex items-center gap-1 mb-2">
                                <div className="rounded-full w-3 h-3 bg-red-500"></div>
                                <div className="rounded-full w-3 h-3 bg-yellow-500"></div>
                                <div className="rounded-full w-3 h-3 bg-blue-500"></div>
                            </div>
                            <h1 className="text-3xl font-[Helvetica-bold] mb-3">{namaAplikasi || ""}</h1>
                            <p className="text-sm font-[Helvetica-regular] tracking-wide">{deskripsiAplikasi || ""}</p>
                        </div>
                        <form
                            onSubmit={(e) => e.preventDefault()} // Mencegah reload halaman
                            className="relative"
                        >
                            <input
                                type="text"
                                className="rounded-xl mb-4 border-neutral-100 shadow w-full text-base tracking-wide font-[Helvetica-regular] placeholder:text-black/70 py-2.5"
                                name="search"
                                id="search"
                                placeholder="Cari Doa.."
                                value={searchQuery} // Bind state pencarian
                                onChange={(e) => setSearchQuery(e.target.value)} // Update state saat input berubah
                                autoComplete="off"
                            />
                            <BiSearch className="absolute top-2 right-3 w-6 h-6" />
                        </form>

                        {/* Daftar Kategori */}
                        <div className="flex items-center gap-2 font-[Helvetica-regular] flex-wrap">
                            <div
                                onClick={() => setSelectedCategory("semua")}
                                className={`px-3 py-2 shadow rounded-full tracking-wide flex items-center text-sm justify-center cursor-pointer ${
                                    selectedCategory === "semua"
                                        ? "text-white bg-orange-400"
                                        : "text-black bg-neutral-50"
                                }`}
                            >
                                Semua
                            </div>
                            {categories.map((category, i) => (
                                <div
                                    key={i}
                                    onClick={() =>
                                        setSelectedCategory(category.name)
                                    }
                                    className={`px-3 py-2 shadow rounded-full shrink-0 tracking-wide flex items-center text-sm justify-center cursor-pointer ${
                                        selectedCategory === category.name
                                            ? "text-white bg-orange-400"
                                            : "text-black bg-neutral-50"
                                    }`}
                                >
                                    {category.name}
                                </div>
                            ))}
                        </div>
                    </div>

                    {/* Konten Doa */}
                    <div className="w-full lg:col-span-3 grid grid-cols-1 lg:grid-cols-2 gap-3 mt-5 lg:mt-0 py-2 lg:py-0 font-[Helvetica-regular] lg:max-h-[83vh] lg:overflow-y-auto lg:pr-2">
                        {filteredContent.length > 0 ? (
                            filteredContent.map((doa, i) => (
                                <div key={i} className="relative">
                                    <Link
                                        href={route("doa.show", [doa.id])}
                                        className="flex items-center gap-3 py-3 hover:bg-neutral-50 lg:bg-neutral-50 lg:rounded-md lg:hover:opacity-50 transition relative z-30"
                                    >
                                        <div className="flex items-center gap-3">
                                            <div className="w-14 h-14 shrink-0 bg-neutral-50 flex items-center justify-center text-sm text-black">
                                                {doa.title[0]}
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

export default Landing;
