/* eslint-disable no-undef */
import Guest from "@/Layouts/GuestLayout";
import { Head } from "@inertiajs/react";

function Show({ surah }) {
    return (
        <Guest>
            <Head title="Preview Surah" />

            <main className="w-full overflow-x-hidden bg-neutral-50 py-24 px-5 lg:px-20">
                {/* Daftar Kategori */}
                <div className="">
                    <div>
                        <div className="mb-2 pb-3">
                            <h1 className="text-2xl font-[Helvetica-Bold] tracking-wide capitalize text-black">
                                {surah.englishName}{" "}
                                <span className="font-[Arabic]">
                                    ({surah.name})
                                </span>
                            </h1>
                            <p className="text-sm text-black font-[Helvetica-Regular] mt-2">
                                Jumlah Ayat: {surah.numberOfAyahs}
                            </p>
                        </div>
                    </div>
                    <hr className="border-neutral-200 mt-5" />

                    <div className="mb-10 w-full flex flex-col">
                        {surah.ayahs.map((ayah) => (
                            <div
                                key={ayah.numberInSurah}
                                className="py-4 border-b border-neutral-200 flex flex-col"
                            >
                                <div className="flex items-start justify-between gap-2 w-full ">
                                    <div className="bg-[url('/assets/frame.svg')] w-[41px] h-[48px] bg-cover bg-no-repeat bg-center flex items-center justify-center shrink-0 font-[Helvetica-Regular] text-[12px]">
                                        {ayah.numberInSurah}
                                    </div>
                                    <div className="text-right leading-[3rem] font-[Arabic] self-end tracking-widest text-2xl bg-white p-2.5 rounded-md border border-neutral-200 w-max">
                                        {ayah.text_arab}
                                    </div>
                                </div>
                                <div className="text-sm text-gray-700 mt-2 font-[Helvetica-Regular] tracking-wide">
                                    {ayah.translation}
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </main>
        </Guest>
    );
}

export default Show;
