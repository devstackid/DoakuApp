/* eslint-disable no-undef */
import Guest from "@/Layouts/GuestLayout";
import { Head, usePage } from "@inertiajs/react";
import axios from "axios";
import { useEffect, useState } from "react";
import { BiBookmark, BiSolidBookmark } from "react-icons/bi";

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

            paragraphs.forEach((p) => {
                const text = p.textContent?.trim() || "";

                if (/[\u0600-\u06FF]/.test(text)) {
                    // Ada huruf Arab
                    p.classList.add(
                        "font-[Arabic]",
                        "text-2xl",
                        "!text-right",
                        "leading-[3rem]",
                        "mb-4",
                        "mt-5",
                        "bg-white",
                        "w-max",
                        "max-w-full",
                        "p-2.5",
                        "border",
                        "border-neutral-200",
                        "rounded-md",
                        "self-end",
                    );
                } else if (/^[a-zA-Z\s']+$/.test(text)) {
                    // Latin (transliterasi)
                    p.classList.add(
                        "font-[Helvetica-Regular]",
                        "text-base",
                        "!text-start",
                        "mb-2",
                        "italic"
                    );
                } else {
                    // Terjemahan atau lainnya
                    p.classList.add(
                        "font-[Helvetica-Regular]", 
                        "text-base",
                        "!text-start",
                    );
                }
            });

            setFormattedContent(htmlDoc.body.innerHTML);
        }
    }, [doa.content]);
    return (
        <Guest>
            <Head title="Preview Doa" />

            <main className="w-full overflow-x-hidden bg-neutral-50 py-24 px-5 lg:px-20">
                {/* Daftar Kategori */}
                <div className="">
                    <div>
                        <div className="flex items-start justify-between mb-2 pb-3">
                            <h1 className="text-2xl font-[Helvetica-Bold] tracking-wide capitalize text-black">
                                {doa.title}{" "}
                                <span className="block text-sm font-[Helvetica-Bold] text-blue-700">
                                    {doa.category.name}
                                </span>
                            </h1>
                            <button
                                onClick={() => handleFavoriteToggle(doa.id)}
                                className="px-5 py-2 text-sm font-[Helvetica-regular] tracking-wide shrink-0 bg-red-100/20 rounded"
                            >
                                {favorites.includes(doa.id) ? (
                                    <BiSolidBookmark className="w-6 h-6 text-red-500 hover:text-blue-500 transition" />
                                ) : (
                                    <BiBookmark className="w-7 h-7 text-red-500 hover:text-blue-500 transition" />
                                )}
                            </button>
                        </div>

                        <div>
                            {doa.sejarah_doa && (
                                <>
                                    <p className="text-base tracking-wide text-justify text-black/75 font-[Helvetica-Regular]">
                                        {
                                            showMore
                                                ? doa.sejarah_doa // Jika showMore true, tampilkan seluruh teks
                                                : doa.sejarah_doa.slice(0, 70) +
                                                  (doa.sejarah_doa.length > 70
                                                      ? "..."
                                                      : "") // Jika false, tampilkan sebagian
                                        }
                                    </p>
                                    {/* Tampilkan tombol jika panjang teks lebih dari 40 karakter */}
                                    {doa.sejarah_doa.length > 70 && (
                                        <button
                                            onClick={toggleShowMore}
                                            className="text-base tracking-wide font-[Helvetica-Regular] text-blue-700 mt-2"
                                        >
                                            {showMore
                                                ? "Tampilkan lebih sedikit"
                                                : "Tampilkan semua"}
                                        </button>
                                    )}
                                </>
                            )}

                            <p className="text-sm font-[Helvetica-regular] text-black/75 italic mt-2">
                                {doa.catatan_kaki}
                            </p>
                        </div>
                    </div>
                    <hr className="border-neutral-200 mt-5"/>

                    <div
                        className="tracking-wide mb-10 w-full flex flex-col"
                        dangerouslySetInnerHTML={{ __html: formattedContent }}
                    ></div>
                </div>
            </main>
        </Guest>
    );
}

export default PreviewDoa;
