/* eslint-disable no-undef */
import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";
import { Head, useForm } from "@inertiajs/react";

const Config = ({ auth, config }) => {
    const { data, setData, put, processing, errors } = useForm({
        nama_aplikasi: config.nama_aplikasi || "",
        deskripsi_aplikasi: config.deskripsi_aplikasi || ""
    });

    const handleChange = (e) => {
        setData(e.target.name, e.target.value);
    };


    const handleSubmit = (e) => {
        e.preventDefault();
        put(route("config.update", config.id));
    };

    return (
        <AuthenticatedLayout user={auth.user}>
            <Head title="Pengaturan" />
            <div className="font-poppins py-5 px-8">
                <div className="md:flex items-start justify-between mb-3">
                    <h1 className="text-sm font-bold mb-3 md:mb-0 text-black">
                        Pengaturan{" "}
                        <span className="block text-slate-700 font-normal text-xs">
                            Perbarui informasi aplikasi
                        </span>
                    </h1>
                </div>

                <div className="relative w-full h-[70vh] pr-2 overflow-y-auto">
                    <form onSubmit={handleSubmit} className="relative">
                        <input type="hidden" name="_method" value="PUT" />
                        <div className="space-y-3">
                            <label
                                htmlFor="nama_aplikasi"
                                className="block text-sm font-medium text-gray-900 "
                            >
                                Nama Aplikasi
                            </label>
                            <div className="relative mb-3">
                                <input
                                    type="text"
                                    id="nama_aplikasi"
                                    name="nama_aplikasi"
                                    value={data.nama_aplikasi}
                                    onChange={handleChange}
                                    className="w-full border border-gray-300 rounded-md bg-neutral-50 text-sm font-normal text-black"
                                    placeholder="Nama Aplikasi.."
                                />
                                {errors.nama_aplikasi && (
                                    <div className="text-xs font-medium text-red-500">
                                        {errors.nama_aplikasi}
                                    </div>
                                )}
                            </div>

                            <label
                                htmlFor="deskripsi_aplikasi"
                                className="block text-sm font-medium text-gray-900 mt-5"
                            >
                                Tentang
                            </label>
                            <div className="relative mb-3">
                                <textarea
                                    rows={4}
                                    name="deskripsi_aplikasi"
                                    id="deskripsi_aplikasi"
                                    value={data.deskripsi_aplikasi}
                                    onChange={handleChange}
                                    className="w-full border border-gray-300 rounded-md bg-neutral-50 text-sm font-normal text-black"
                                ></textarea>

                                {errors.deskripsi_aplikasi && (
                                    <div className="text-xs font-medium text-red-500">
                                        {errors.deskripsi_aplikasi}
                                    </div>
                                )}
                            </div>

                        </div>
                        <button
                            type="submit"
                            className=" w-full mt-3 bg-blue-600 text-white py-2 rounded-md text-sm font-medium"
                            disabled={processing}
                        >
                            {processing ? "Menyimpan..." : "Simpan"}
                        </button>
                    </form>
                </div>
            </div>
        </AuthenticatedLayout>
    );
};

export default Config;
