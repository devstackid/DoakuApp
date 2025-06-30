import React from "react";
import { Head, Link } from "@inertiajs/react";

export default function Show({ surah }) {
    console.log(surah);
    return (
        <div className="p-6">
            <Head title={`Surah ${surah.name}`} />

            <div className="mb-6">
                <h1 className="text-3xl font-bold">
                    {surah.englishName} ({surah.name})
                </h1>
                <p className="text-gray-500 italic">
                    Artinya: {surah.englishNameTranslation}
                </p>
                <p className="text-sm text-gray-600 mt-2">
                    Jumlah Ayat: {surah.numberOfAyahs}
                </p>
                <p className="text-sm text-gray-600">
                    Juz Pertama: {surah.ayahs[0]?.juz}
                </p>
            </div>

            <div className="space-y-5">
                {surah.ayahs.map((ayah) => (
                    <div
                        key={ayah.numberInSurah}
                        className="border p-4 rounded shadow-sm"
                    >
                        <div className="text-right font-arabic text-2xl">
                            {ayah.text_arab}
                        </div>
                        <div className="text-sm text-gray-700 mt-2">
                            {ayah.numberInSurah}. {ayah.translation}
                        </div>
                    </div>
                ))}
            </div>

            <div className="mt-6">
                <Link href="/quran" className="text-blue-600 hover:underline">
                    ← Kembali ke daftar surah
                </Link>
            </div>
        </div>
    );
}
