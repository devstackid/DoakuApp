import Guest from "@/Layouts/GuestLayout";
import { Head, usePage } from "@inertiajs/react";
import Calendar from "react-calendar";
import "react-calendar/dist/Calendar.css"; // Import style kalender
import { useState } from "react";
import clsx from "clsx";

function Kalender() {
    const { upcomingEvents, pastEvents } = usePage().props; // Mengambil props dari controller
    const [value, setValue] = useState(new Date()); // State untuk menangani tanggal

    return (
        <Guest>
            <Head title="Kalender" />

            <main className="w-full overflow-x-hidden py-24 px-5 lg:px-20">
                <div className="grid lg:grid-cols-4 grid-cols-1 lg:gap-10">
                    {/* Kalender */}
                    <div>
                        <h1 className="text-base font-[Helvetica-regular] w-max mb-3 text-black border-b">
                            Kalender
                        </h1>
                        <div className="max-w-md mx-auto mb-5">
                            <Calendar
                                onChange={setValue} // Fungsi untuk menangani perubahan tanggal
                                value={value} // Tanggal yang dipilih
                            />
                        </div>
                    </div>

                    {/* Data Hari Besar */}

                    <div className="lg:col-span-3">
                        <div className="w-full">
                            <h1 className="text-base font-[Helvetica-bold] tracking-wide mb-2">
                                Waktu Mendatang
                            </h1>
                            {upcomingEvents.map((coming, i) => {
                                // Mengkonversi string tanggal menjadi objek Date
                                const eventDate = new Date(coming.tanggal);

                                // Mendapatkan hari, bulan, dan tahun dalam format yang diinginkan
                                const hariNama = eventDate.toLocaleDateString(
                                    "id-ID",
                                    {
                                        weekday: "long",
                                    }
                                ); // Nama hari
                                const hariAngka = eventDate.getDate(); // Hari dalam angka
                                const bulanNama = eventDate.toLocaleDateString(
                                    "id-ID",
                                    { month: "long" }
                                ); // Nama bulan
                                const tahunAngka = eventDate.getFullYear(); // Tahun

                                return (
                                    <div
                                        key={i}
                                        className={clsx(
                                            "flex items-center gap-3 p-3 rounded-md shadow mb-2",
                                            i === 0 && "bg-orange-200",
                                            i >= 0 && "bg-neutral-50"
                                        )}
                                    >
                                        <div className="shrink-0 flex flex-col items-center justify-center border-r border-black pr-3">
                                            <div className="text-sm font-[Helvetica-regular]">
                                                {hariNama},
                                            </div>
                                            <div className="text-3xl font-[Helvetica-bold]">
                                                {hariAngka}
                                            </div>
                                            <div className="text-sm font-[Helvetica-regular]">
                                                {bulanNama}
                                            </div>
                                            <div className="text-sm font-[Helvetica-regular]">
                                                {tahunAngka}
                                            </div>
                                        </div>
                                        <div className="">
                                            <h1 className="text-base font-[Helvetica-bold] tracking-wide">
                                                {coming.title}
                                                <span className="block text-base font-[Helvetica-regular] text-black/75">
                                                    {coming.deskripsi}
                                                </span>
                                            </h1>
                                        </div>
                                    </div>
                                );
                            })}
                        </div>

                        <div className="w-full mt-10">
                            <h1 className="text-base font-[Helvetica-bold] tracking-wide mb-2">
                                Telah Berlalu
                            </h1>
                            {pastEvents.map((past, i) => {
                                // Mengkonversi string tanggal menjadi objek Date
                                const eventDate = new Date(past.tanggal);

                                // Mendapatkan hari, bulan, dan tahun dalam format yang diinginkan
                                const hariNama = eventDate.toLocaleDateString(
                                    "id-ID",
                                    {
                                        weekday: "long",
                                    }
                                ); // Nama hari
                                const hariAngka = eventDate.getDate(); // Hari dalam angka
                                const bulanNama = eventDate.toLocaleDateString(
                                    "id-ID",
                                    { month: "long" }
                                ); // Nama bulan
                                const tahunAngka = eventDate.getFullYear(); // Tahun

                                return (
                                    <div
                                        key={i}
                                        className={clsx(
                                            "flex items-center gap-3 p-3 rounded-md shadow mb-2",
                                            i === 0 && "bg-purple-200",
                                            i >= 0 && "bg-neutral-50"
                                        )}
                                    >
                                        <div className="shrink-0 flex flex-col items-center justify-center border-r border-black pr-3">
                                            <div className="text-sm font-[Helvetica-regular]">
                                                {hariNama},
                                            </div>
                                            <div className="text-3xl font-[Helvetica-bold]">
                                                {hariAngka}
                                            </div>
                                            <div className="text-sm font-[Helvetica-regular]">
                                                {bulanNama}
                                            </div>
                                            <div className="text-sm font-[Helvetica-regular]">
                                                {tahunAngka}
                                            </div>
                                        </div>
                                        <div className="">
                                            <h1 className="text-base font-[Helvetica-bold] tracking-wide">
                                                {past.title}
                                                <span className="block text-base font-[Helvetica-regular] text-black/75">
                                                    {past.deskripsi}
                                                </span>
                                            </h1>
                                        </div>
                                    </div>
                                );
                            })}
                        </div>
                    </div>
                </div>
            </main>
        </Guest>
    );
}

export default Kalender;
