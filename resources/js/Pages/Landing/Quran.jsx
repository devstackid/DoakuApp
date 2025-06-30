/* eslint-disable no-undef */
import Guest from "@/Layouts/GuestLayout";
import { Head, Link } from "@inertiajs/react";
function Quran({ surahs }) {

    return (
        <Guest>
            <Head title="Al-Qur-&apos;an" />
            <main className="w-full overflow-hidden py-24 lg:pt-24 lg:pb-0 px-5 lg:px-20">
                {/* Form Pencarian */}
                <div className="">
                    
                    <div className="mb-5 mt-10">
                        <h1 className="text-xl font-[Helvetica-Regular] text-black">
                            Al-Qur’an{" "}
                            <span className="block text-xs">
                                Pilih surah yang ingin ditampilkan
                            </span>
                        </h1>
                    </div>

                    <div className="w-full grid grid-cols-1 lg:grid-cols-2 gap-3 mt-5 lg:mt-0 py-2 lg:py-0 font-[Helvetica-regular]">
                        {surahs.map((surah, i) => (
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

                </div>
            </main>
        </Guest>
    );
}

export default Quran;
