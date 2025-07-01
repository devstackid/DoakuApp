/* eslint-disable no-undef */
import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";
import { Head, useForm } from "@inertiajs/react";
import { Editor } from "@tinymce/tinymce-react"; // Import TinyMCE

const TambahDoa = ({ auth, categories }) => {
    const { data, setData, post, processing, errors } = useForm({
        title: "",
        content: "",
        category_id: "",
        sejarah_doa: "",
        catatan_kaki: "",
    });

    const handleChange = (e) => {
        setData(e.target.name, e.target.value);
    };

    const handleEditorChange = (content) => {
        setData("content", content);
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        post(route("doa.add"));
    };

    return (
        <AuthenticatedLayout user={auth.user}>
            <Head title="Tambah Doa" />
            <div className=" py-5 px-8">
                <div className="md:flex items-start justify-between mb-3">
                    <h1 className="text-sm font-[Helvetica-Bold] tracking-wide mb-3 md:mb-0 text-black">
                        Tambah Doa{" "}
                        <span className="block text-slate-700 font-[Helvetica-Regular] text-xs">
                            Isi data untuk menambahkan doa
                        </span>
                    </h1>
                </div>

                <div className="relative w-full h-[70vh] pr-2 overflow-y-auto">
                    <form onSubmit={handleSubmit} className="relative">
                        <div className="space-y-3">
                            <label
                                htmlFor="title"
                                className="block text-sm font-medium text-gray-900 "
                            >
                                Nama Doa / Title
                            </label>
                            <div className="relative mb-3">
                                <input
                                    type="text"
                                    id="title"
                                    name="title"
                                    value={data.title}
                                    onChange={handleChange}
                                    className="w-full border border-gray-300 rounded-md bg-neutral-50 text-sm font-[Helvetica-Regular] text-black"
                                    placeholder="Nama Doa / Judul.."
                                />
                                {errors.title && (
                                    <div className="text-xs font-medium text-red-500">
                                        {errors.title}
                                    </div>
                                )}
                            </div>

                            <label
                                htmlFor="content"
                                className="block text-sm font-medium text-gray-900 "
                            >
                                Isi Doa / Content
                            </label>
                            <div className="relative">
                                <Editor
                                    apiKey="lvz92aabap2iuitv445we7ve1xnk24zmy4svudfhuq4c7lkg"
                                    value={data.content}
                                    init={{
                                        height: 500,
                                        menubar: true,
                                        plugins: [
                                            
                                            "charmap",
                                            "codesample",
                                            "emoticons",
                                            "wordcount",
                                            "preview",
                                            "fullscreen",
                                            "paste",
                                            "code",
                                        ],
                                        toolbar:
                                            "undo redo | preview fullscreen | " +
                                            "bold italic underline | " +
                                            "align lineheight " +
                                            "emoticons charmap | removeformat",
                                    }}
                                    onEditorChange={handleEditorChange}
                                />

                                {errors.content && (
                                    <div className="text-xs font-medium text-red-500">
                                        {errors.content}
                                    </div>
                                )}
                            </div>

                            <label
                                htmlFor="category_id"
                                className="block text-sm font-medium text-gray-900 "
                            >
                                Kategori Doa
                            </label>
                            <select
                                id="category_id"
                                name="category_id"
                                value={data.category_id}
                                onChange={handleChange}
                                className="w-full border border-gray-300 rounded-md bg-neutral-50 text-sm font-[Helvetica-Regular] text-black"
                            >
                                <option value="" disabled>
                                    Pilih Kategori Doa
                                </option>
                                {categories &&
                                    categories.length > 0 &&
                                    categories.map((category, i) => (
                                        <option value={category.id} key={i}>
                                            {category.name}
                                        </option>
                                    ))}
                            </select>

                            {errors.category_id && (
                                <div className="text-xs font-medium text-red-500">
                                    {errors.category_id}
                                </div>
                            )}
                        </div>

                        <label
                            htmlFor="sejarah_doa"
                            className="block text-sm font-medium text-gray-900 mt-5 mb-3"
                        >
                            Sejarah, Deskripsi / Keutamaan (Opsional)
                        </label>
                        <div className="relative mb-3">
                            <textarea
                                rows={4}
                                name="sejarah_doa"
                                id="sejarah_doa"
                                value={data.sejarah_doa}
                                onChange={handleChange}
                                className="w-full border border-gray-300 rounded-md bg-neutral-50 text-sm font-[Helvetica-Regular] text-black"
                            ></textarea>

                            {errors.sejarah_doa && (
                                <div className="text-xs font-medium text-red-500">
                                    {errors.sejarah_doa}
                                </div>
                            )}
                        </div>

                        <label
                            htmlFor="catatan_kaki"
                            className="block text-sm font-medium text-gray-900 mb-3"
                        >
                            Sumber / Catatan Kaki (Opsional)
                        </label>
                        <div className="relative mb-3">
                            <input
                                type="text"
                                id="catatan_kaki"
                                name="catatan_kaki"
                                value={data.catatan_kaki}
                                onChange={handleChange}
                                className="w-full border border-gray-300 rounded-md bg-neutral-50 text-sm font-[Helvetica-Regular] text-black"
                                placeholder="Sumber sejarah / catatan kaki"
                            />
                            {errors.catatan_kaki && (
                                <div className="text-xs font-medium text-red-500">
                                    {errors.catatan_kaki}
                                </div>
                            )}
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

export default TambahDoa;
