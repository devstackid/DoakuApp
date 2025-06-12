import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";
import { Head, router, usePage } from "@inertiajs/react";
import { useCallback, useEffect, useMemo, useState } from "react";
import { BiPencil, BiTrash } from "react-icons/bi";
const Categories = ({ auth, categories }) => {
    const { errors } = usePage().props;

    const [search, setSearch] = useState("");
    const [filteredData, setFilteredData] = useState(categories);
    const [modalCategoryId, setModalCategoryId] = useState(null);
    const [values, setValues] = useState({
        name: "",
        description: "",
    });

    useEffect(() => {
        if (modalCategoryId && modalCategoryId !== "addCategory" && categories.length > 0) {
            const selectedCategories = categories.find((b) => b.id === modalCategoryId);
            if (selectedCategories) {
                setValues({
                    name: selectedCategories.name || "",
                    description: selectedCategories.description || "",
                });
            }
        } else {
            resetForm();
        }
    }, [modalCategoryId, categories]);

    const resetForm = () => {
        setValues({
            name: "",
            description: "",
        });
    };

    const handleChange = (e) => {
        setValues({
            ...values,
            [e.target.name]: e.target.value,
        });
    };
    
    const handleSubmit = (e) => {
        e.preventDefault();
    
        const url =
            modalCategoryId === "addCategory"
                ? `/dashboard/kategori/add`
                : `/dashboard/kategori/update/${modalCategoryId}`;
    
        const formData = new FormData();
        formData.append("name", values.name);
        formData.append("description", values.description);
    
    
        router.post(url, formData, {
            onSuccess: () => {
                setModalCategoryId(null);
                resetForm();
            },
            onError: (errors) => {
                console.log("Errors:", errors);
            }
        });
    };
    

    const handleDelete = (categoryId) => {
        if (confirm("Apakah Anda yakin ingin menghapus data ini?")) {
            router.post(`/dashboard/kategori/delete/${categoryId}`, {
                _method: "delete",
                onSuccess: () => {
                    setFilteredData((prevData) =>
                        prevData.filter((category) => category.id !== categoryId)
                    );
                },
            });
        }
    };

    useEffect(() => {
        setFilteredData(
            categories.filter(
                (theme) =>
                    theme.name
                        .toLowerCase()
                        .includes(search.toLowerCase()) ||
                    theme.description
                        .toLowerCase()
                        .includes(search.toLowerCase())
            )
        );
    }, [search, categories]);

    const memoizedFilteredData = useMemo(() => filteredData, [filteredData]);

    const handleSearchChange = useCallback(
        (e) => {
            setSearch(e.target.value);
        },
        [setSearch]
    );

    return (
        <AuthenticatedLayout user={auth.user}>
            <Head title="Categories" />
            <div className="font-poppins py-5 px-8 overflow-y-auto md:max-h-screen">
                <div className="md:flex items-start justify-between mb-3">
                    <h1 className="text-sm font-bold mb-3 md:mb-0 text-black">
                        Data Kategori{" "}
                        <span className="block text-slate-700 font-normal text-xs">
                            Anda dapat mengelola data kategori doa pada halaman ini
                        </span>
                    </h1>
                    <div className="grid grid-cols-3 md:flex items-center gap-2">
                        {categories.length > 0 && (
                            <div className="col-span-2">
                                <label className="outline-none flex items-center gap-2 max-w-xs">
                                    <input
                                        type="text"
                                        placeholder="Cari Kategori..."
                                        value={search}
                                        onChange={handleSearchChange}
                                        className="grow border-none outline-none py-2 focus:ring-0 focus:border-none focus:outline-none placeholder:text-xs"
                                    />
                                </label>
                            </div>
                        )}
                        <button
                            onClick={() => setModalCategoryId("addCategory")}
                            className="text-xs font-bold text-white px-3 py-2 rounded bg-sky-500"
                        >
                            Buat
                        </button>
                    </div>
                </div>
                <div className="relative overflow-x-auto mt-3 shadow-md sm:rounded-lg w-full">
                    <table className="w-full text-sm text-left text-gray-500 dark:text-gray-400">
                        <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
                            <tr>
                                <th scope="col" className="px-6 py-3">
                                    #
                                </th>
                                <th scope="col" className="px-6 py-3">
                                    Kategori
                                </th>
                                <th scope="col" className="px-6 py-3">
                                    Deskripsi
                                </th>

                                <th scope="col" className="px-6 py-3">
                                    Aksi
                                </th>
                            </tr>
                        </thead>
                        <tbody>
                            {memoizedFilteredData.map((category, i) => (
                                <tr
                                    key={i}
                                    className="bg-white border-b dark:bg-gray-800 dark:border-gray-700"
                                >
                                    <td className="px-6 py-4">{i + 1}</td>
                                    <td className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white">
                                        {category.name}
                                    </td>
                                    <td className="px-6 py-4">
                                        {category.description}
                                    </td>
                                    

                                    <td className="px-6 py-4 flex items-center gap-2">
                                        <button
                                            className="font-medium w-10 h-10 rounded-full bg-neutral-100 flex items-center justify-center text-blue-600 dark:text-blue-500 hover:underline"
                                            onClick={() =>
                                                setModalCategoryId(category.id)
                                            }
                                        >
                                            <BiPencil />
                                        </button>
                                        <button
                                            className="font-medium w-10 h-10 rounded-full bg-neutral-100 flex items-center justify-center text-red-600 dark:text-red-500 hover:underline"
                                            onClick={() =>
                                                handleDelete(category.id)
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

                {modalCategoryId && (
                    <div
                        id={modalCategoryId}
                        tabIndex="-1"
                        className="fixed inset-0 z-[100] flex items-center justify-center w-full p-4 overflow-x-hidden overflow-y-auto h-full bg-black/50 backdrop-blur-sm"
                    >
                        <div className="relative w-full max-w-md max-h-[70vh] bg-white rounded overflow-y-auto">
                            <form
                                onSubmit={handleSubmit}
                                className="relative bg-white rounded-lg shadow dark:bg-gray-700"
                            >
                                <div className="flex items-start justify-between p-4 border-b rounded-t dark:border-gray-600">
                                    <h3 className="text-xl font-semibold text-gray-900 dark:text-white">
                                        {modalCategoryId === "addCategory"
                                            ? "Tambah"
                                            : "Ubah"}{" "}
                                        Kategori
                                    </h3>
                                    <button
                                        type="button"
                                        className="text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm w-8 h-8 ms-auto inline-flex justify-center items-center dark:hover:bg-gray-600 dark:hover:text-white"
                                        onClick={() => setModalCategoryId(null)}
                                    >
                                        <svg
                                            className="w-3 h-3"
                                            aria-hidden="true"
                                            xmlns="http://www.w3.org/2000/svg"
                                            fill="none"
                                            viewBox="0 0 14 14"
                                        >
                                            <path
                                                stroke="currentColor"
                                                strokeLinecap="round"
                                                strokeLinejoin="round"
                                                strokeWidth="2"
                                                d="M1 1l6 6m0 0l6 6M7 7l6-6M7 7l-6 6"
                                            />
                                        </svg>
                                        <span className="sr-only">
                                            Close modal
                                        </span>
                                    </button>
                                </div>
                                <div className="p-6 space-y-3">
                                    <label
                                        htmlFor="name"
                                        className="block text-sm font-medium text-gray-900 dark:text-white"
                                    >
                                        Kategori
                                    </label>
                                    <div className="relative mb-3">
                                        <input
                                            type="text"
                                            id="name"
                                            name="name"
                                            value={values.name}
                                            onChange={handleChange}
                                            className="w-full border border-gray-300 rounded-md bg-neutral-50 text-sm font-normal text-black"
                                            placeholder="Nama Kategori.."
                                        />
                                        {errors.name && (
                                            <div className="text-xs font-medium text-red-500">
                                                {errors.name}
                                            </div>
                                        )}
                                    </div>

                                    <label
                                        htmlFor="description"
                                        className="block text-sm font-medium text-gray-900 dark:text-white"
                                    >
                                        Deskripsi
                                    </label>
                                    <div className="relative">
                                        <input
                                            type="text"
                                            id="description"
                                            name="description"
                                            value={values.description}
                                            onChange={handleChange}
                                            placeholder="Description.."
                                            className="w-full border border-gray-300 rounded-md bg-neutral-50 text-sm font-normal text-black"
                                        />
                                        {errors.description && (
                                            <div className="text-xs font-medium text-red-500">
                                                {errors.description}
                                            </div>
                                        )}
                                    </div>

                                    
                                </div>
                                <div className="flex items-center p-6 space-x-2 border-t border-gray-200 rounded-b dark:border-gray-600">
                                    <button
                                        type="submit"
                                        className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
                                    >
                                        {modalCategoryId === "addCategory"
                                            ? "Tambah"
                                            : "Simpan Perubahan"}
                                    </button>
                                    <button
                                        type="button"
                                        className="text-gray-500 bg-white hover:bg-gray-100 focus:ring-4 focus:outline-none focus:ring-blue-300 rounded-lg border border-gray-200 text-sm font-medium px-5 py-2.5 hover:text-gray-900 focus:z-10 dark:bg-gray-700 dark:text-gray-300 dark:border-gray-500 dark:hover:text-white dark:hover:bg-gray-600"
                                        onClick={() => setModalCategoryId(null)}
                                    >
                                        Batal
                                    </button>
                                </div>
                            </form>
                        </div>
                    </div>
                )}
            </div>
        </AuthenticatedLayout>
    );
};

export default Categories;
