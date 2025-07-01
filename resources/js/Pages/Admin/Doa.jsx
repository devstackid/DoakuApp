/* eslint-disable no-undef */
import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";
import { Head, Link, router } from "@inertiajs/react";
import { useCallback, useEffect, useMemo, useState } from "react";
import { BiPencil, BiTrash } from "react-icons/bi";
const Doa = ({ auth, contents }) => {

    const [search, setSearch] = useState("");
    const [filteredData, setFilteredData] = useState(contents);
    
    

    const handleDelete = (contentId) => {
        if (confirm("Apakah Anda yakin ingin menghapus data ini?")) {
            router.post(`/dashboard/doa/delete/${contentId}`, {
                _method: "delete",
                onSuccess: () => {
                    setFilteredData((prevData) =>
                        prevData.filter((user) => user.id !== contentId)
                    );
                },
            });
        }
    };

    useEffect(() => {
        setFilteredData(
            contents.filter(
                (content) =>
                    content.title.toLowerCase().includes(search.toLowerCase()) ||
                    content.content.toLowerCase().includes(search.toLowerCase())
            )
        );
    }, [search, contents]);

    const memoizedFilteredData = useMemo(() => filteredData, [filteredData]);

    const handleSearchChange = useCallback(
        (e) => {
            setSearch(e.target.value);
        },
        [setSearch]
    );

    return (
        <AuthenticatedLayout user={auth.user}>
            <Head title="Contents" />
            <div className=" py-5 px-8">
                <div className="md:flex items-start justify-between mb-3">
                    <h1 className="text-sm font-[Helvetica-Bold] tracking-wide mb-3 md:mb-0 text-black">
                        Data Doa{" "}
                        <span className="block text-slate-700 font-[Helvetica-Regular] text-xs">
                            Anda dapat mengelola data doa di halaman ini
                        </span>
                    </h1>
                    <div className="grid grid-cols-3 md:flex items-center gap-2">
                        {contents.length > 0 && (
                            <div className="col-span-2">
                                <label className="outline-none flex items-center gap-2 max-w-xs">
                                    <input
                                        type="text"
                                        placeholder="Cari Doa..."
                                        value={search}
                                        onChange={handleSearchChange}
                                        className="grow border-none outline-none py-2 focus:ring-0 focus:border-none focus:outline-none placeholder:text-xs"
                                    />
                                </label>
                            </div>
                        )}
                        <Link href={route('doa.tambah')}
                            className="text-xs font-[Helvetica-Bold] tracking-wide text-white px-3 py-2 rounded bg-sky-500"
                        >
                            Tambahkan Doa
                        </Link>
                    </div>
                </div>
                <div className="relative overflow-x-auto mt-3 shadow-md sm:rounded-lg w-full">
                    <table className="w-full text-sm text-left text-gray-500 ">
                        <thead className="text-xs text-gray-700 uppercase bg-gray-50  ">
                            <tr>
                                <th scope="col" className="px-6 py-3">
                                    #
                                </th>
                                <th scope="col" className="px-6 py-3">
                                    Judul
                                </th>
                                <th scope="col" className="px-6 py-3">
                                    Kategori Doa
                                </th>
                                
                                <th scope="col" className="px-6 py-3">
                                    Aksi
                                </th>
                            </tr>
                        </thead>
                        <tbody>
                            {memoizedFilteredData.map((content, i) => (
                                <tr
                                    key={i}
                                    className="bg-white border-b "
                                >
                                    <td className="px-6 py-4">{i + 1}</td>
                                    <td className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap ">
                                        {content.title}
                                    </td>
                                    <td className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap ">
                                        {content.category.name}
                                    </td>
                                    <td className="px-6 py-4 flex items-center gap-2">
                                        <Link href={route('doa.ubah', [content.id])}
                                            className="font-medium w-10 h-10 rounded-full bg-neutral-100 flex items-center justify-center text-blue-600  hover:underline"
                                            
                                        >
                                            <BiPencil />
                                        </Link>
                                        <button
                                            className="font-medium w-10 h-10 rounded-full bg-neutral-100 flex items-center justify-center text-red-600  hover:underline"
                                            onClick={() =>
                                                handleDelete(content.id)
                                            }
                                        >
                                            <BiTrash />
                                        </button>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>

                
            </div>
        </AuthenticatedLayout>
    );
};

export default Doa;
