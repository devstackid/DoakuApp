/* eslint-disable no-undef */
import Guest from "@/Layouts/GuestLayout";
import { Head, Link } from "@inertiajs/react";
import { useMemo, useState } from "react";
import { BiSearch } from "react-icons/bi";
function Quran({ surahs }) {
    const [search, setSearch] = useState("");

    const handleSearchSurah = (e) => {
        setSearch(e.target.value);
    };
    const filteredSurahs = useMemo(() => {
        return surahs.filter((surah) => {
            const keyword = search.toLowerCase();
            return (
                surah.englishName.toLowerCase().includes(keyword) ||
                surah.name.toLowerCase().includes(keyword)
            );
        });
    }, [search, surahs]);

    return (
        <Guest>
            <Head title="Al-Qur-'an" />
            <main className="w-full overflow-hidden py-24 lg:pt-24 px-5 lg:px-20">
                {/* Form Pencarian */}
                <div className="">
                    <div className="mb-10 mt-10 text-center">
                        <h1 className="text-3xl font-[Helvetica-Bold] text-blue-700">
                            Al-Qur’an{" "}
                            <span className="block text-xl text-black/70 font-[Helvetica-Regular]">
                                Pilih surah yang ingin ditampilkan
                            </span>
                        </h1>
                        <form className="flex items-center justify-center gap-2 mt-5">
                            <label htmlFor="searchSurah">
                                <BiSearch className="w-6 h-6" />
                            </label>

                            <input
                                name="searchSurah"
                                id="searchSurah"
                                placeholder="Search.."
                                value={search}
                                onChange={handleSearchSurah}
                                className="text-sm font-[Helvetica-Regular] text-black flex items-center gap-1 border px-2 rounded-md py-2"
                            />
                        </form>
                    </div>

                    <div className="w-full grid grid-cols-1 lg:grid-cols-2 gap-3 mt-5 lg:mt-0 py-2 lg:py-0 font-[Helvetica-regular]">
                        {filteredSurahs.length > 0 ? (
                            filteredSurahs.map((surah) => (
                                <div key={surah.number} className="relative">
                                    <Link
                                        href={route("quran.show", [
                                            surah.number,
                                        ])}
                                        className="flex items-center gap-3 py-3 hover:bg-neutral-50 bg-white border rounded-md transition relative z-30"
                                    >
                                        <div className="flex items-center gap-3 pl-3">
                                            <div className="w-14 h-14 shrink-0 bg-blue-600 font-[Helvetica-Bold] rounded-full flex items-center justify-center border text-sm text-white">
                                                {surah.number}
                                            </div>
                                            <div>
                                                <h1 className="text-base font-[Helvetica-bold] tracking-wide text-black">
                                                    {surah.englishName} -{" "}
                                                    <span className="font-[Arabic]">
                                                        {surah.name}
                                                    </span>
                                                </h1>
                                            </div>
                                        </div>
                                    </Link>
                                </div>
                            ))
                        ) : (
                            <p className="text-center text-sm text-neutral-400 col-span-2">
                                Surah tidak ditemukan.
                            </p>
                        )}
                    </div>
                </div>
            </main>
        </Guest>
    );
}

export default Quran;
