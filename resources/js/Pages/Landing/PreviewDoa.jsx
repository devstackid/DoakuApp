/* eslint-disable no-undef */
import Guest from "@/Layouts/GuestLayout";
import { Head, usePage } from "@inertiajs/react";
import axios from "axios";
import { useEffect, useState } from "react";
import { BiHeart } from "react-icons/bi";
import { FaHeart } from "react-icons/fa6";

function PreviewDoa({ doa, favorites }) {
    const { auth } = usePage().props;

    const [showMore, setShowMore] = useState(false);

    const toggleShowMore = () => {
        setShowMore(!showMore);
    };

    const handleFavoriteToggle = (doaId) => {
        if (!auth.user) {
            window.location.href = route("login");
            return;
        }

        if (favorites.includes(doaId)) {
            axios.post(route("favorite.remove", doaId)).then(() => {
                window.location.reload();
            });
        } else {
            axios.post(route("favorite.add", doaId)).then(() => {
                window.location.reload();
            });
        }
    };

    const [formattedContent, setFormattedContent] = useState("");
    useEffect(() => {
        if (doa.content) {
            const parser = new DOMParser();
            const htmlDoc = parser.parseFromString(doa.content, "text/html");
            const paragraphs = htmlDoc.querySelectorAll("p");

            paragraphs.forEach((p, index) => {
                if (index % 3 === 0) {
                    p.classList.add(
                        "font-[Arabic]",
                        "text-2xl",
                        "mb-4",
                        "!text-center",
                        "leading-[3rem]"
                    );
                } else if (index % 3 === 1) {
                    p.classList.add(
                        "font-[Helvetica-medium]",
                        "text-base",
                        "mb-3"
                    );
                } else if (index % 3 === 2) {
                    p.classList.add(
                        "font-[Helvetica-regular]",
                        "text-base",
                        "mb-5",
                        "border-b",
                        "pb-5",
                        "border-neutral-100"
                    );
                }
            });

            setFormattedContent(htmlDoc.body.innerHTML);
        }
    }, [doa.content]);
    return (
        <Guest>
            <Head title="Preview Doa" />

            <main className="w-full overflow-x-hidden py-24 px-5 lg:px-20">
                {/* Daftar Kategori */}
                <div className="grid lg:grid-cols-4 grid-cols-1 lg:gap-10">
                    <div>
                    <div className="flex items-start justify-between mb-2 pb-3">
                        <h1 className="text-2xl font-[Helvetica-bold] tracking-wide capitalize text-black">
                            {doa.title}{" "}
                            <span className="block text-sm font-[Helvetica-regular] text-orange-500">
                                {doa.category.name}
                            </span>
                        </h1>
                        <button
                            onClick={() => handleFavoriteToggle(doa.id)}
                            className="px-5 py-2 text-sm font-[Helvetica-regular] tracking-wide shrink-0 bg-neutral-50 rounded"
                        >
                            {favorites.includes(doa.id) ? (
                                <FaHeart className="w-6 h-6 text-red-500 hover:text-blue-500 transition" />
                            ) : (
                                <BiHeart className="w-7 h-7 text-red-500 hover:text-blue-500 transition" />
                            )}
                        </button>
                    </div>

                    <div>
                        <p className="text-base tracking-wide text-justify text-black/75 font-[Helvetica-regular]">
                            {
                                showMore
                                    ? doa.sejarah_doa // Jika showMore true, tampilkan seluruh teks
                                    : doa.sejarah_doa.slice(0, 70) +
                                      (doa.sejarah_doa.length > 70 ? "..." : "") // Jika false, tampilkan sebagian
                            }
                        </p>

                        {/* Tampilkan tombol jika panjang teks lebih dari 40 karakter */}
                        {doa.sejarah_doa.length > 70 && (
                            <button
                                onClick={toggleShowMore}
                                className="text-base tracking-wide font-[Helvetica-bold] text-blue-400 mt-2"
                            >
                                {showMore
                                    ? "Tampilkan lebih sedikit"
                                    : "Tampilkan semua"}
                            </button>
                        )}

                        <p className="text-sm font-[Helvetica-regular] text-black/75 italic mt-2">
                            {doa.catatan_kaki}
                        </p>
                    </div>
                    </div>

                    <div
                        className="tracking-wide mb-10 mt-10 w-full px-5 lg:col-span-3"
                        dangerouslySetInnerHTML={{ __html: formattedContent }}
                    ></div>
                </div>
            </main>
        </Guest>
    );
}

export default PreviewDoa;
