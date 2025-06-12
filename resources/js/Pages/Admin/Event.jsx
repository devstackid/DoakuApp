import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";
import { Head, router, usePage } from "@inertiajs/react";
import { useCallback, useEffect, useMemo, useState } from "react";
import { BiPencil, BiTrash } from "react-icons/bi";
const Event = ({ auth, events }) => {
    const { errors } = usePage().props;

    const [search, setSearch] = useState("");
    const [filteredData, setFilteredData] = useState(events);
    const [modalEventId, setModalEventId] = useState(null);
    const [values, setValues] = useState({
        title: "",
        deskripsi: "",
        tanggal: "",
    });

    useEffect(() => {
        if (modalEventId && modalEventId !== "addEvent" && events.length > 0) {
            const selectedEvent = events.find((b) => b.id === modalEventId);
            if (selectedEvent) {
                setValues({
                    title: selectedEvent.title || "",
                    deskripsi: selectedEvent.deskripsi || "",
                    tanggal: selectedEvent.tanggal || "",
                });
            }
        } else {
            resetForm();
        }
    }, [modalEventId, events]);
    

    const resetForm = () => {
        setValues({
            title: "",
            deskripsi: "",
            tanggal: "",
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
            modalEventId === "addEvent"
                ? `/dashboard/event/add`
                : `/dashboard/event/update/${modalEventId}`;
    
    
        router.post(url, values, {
            onSuccess: () => {
                setModalEventId(null);
                resetForm(); 
            },
            onError: (errors) => {
                console.log("Errors:", errors); 
            }
        });
    };
    

    const handleDelete = (userId) => {
        if (confirm("Apakah Anda yakin ingin menghapus data ini?")) {
            router.post(`/dashboard/user/delete/${userId}`, {
                _method: "delete",
                onSuccess: () => {
                    setFilteredData((prevData) =>
                        prevData.filter((user) => user.id !== userId)
                    );
                },
            });
        }
    };

    useEffect(() => {
        setFilteredData(
            events.filter(
                (user) =>
                    user.title.toLowerCase().includes(search.toLowerCase()) ||
                    user.deskripsi.toLowerCase().includes(search.toLowerCase()) ||
                    user.tanggal
                        .toLowerCase()
                        .includes(search.toLowerCase())
            )
        );
    }, [search, events]);

    const memoizedFilteredData = useMemo(() => filteredData, [filteredData]);

    const handleSearchChange = useCallback(
        (e) => {
            setSearch(e.target.value);
        },
        [setSearch]
    );

    return (
        <AuthenticatedLayout user={auth.user}>
            <Head title="Events" />
            <div className="font-poppins py-5 px-8">
                <div className="md:flex items-start justify-between mb-3">
                    <h1 className="text-sm font-bold mb-3 md:mb-0 text-black">
                        Data Acara{" "}
                        <span className="block text-slate-700 font-normal text-xs">
                            Anda dapat mengelola data Kalender acara pada halaman ini
                        </span>
                    </h1>
                    <div className="grid grid-cols-3 md:flex items-center gap-2">
                        {events.length > 0 && (
                            <div className="col-span-2">
                                <label className="outline-none flex items-center gap-2 max-w-xs">
                                    <input
                                        type="text"
                                        placeholder="Cari acara..."
                                        value={search}
                                        onChange={handleSearchChange}
                                        className="grow border-none outline-none py-2 focus:ring-0 focus:border-none focus:outline-none placeholder:text-xs"
                                    />
                                </label>
                            </div>
                        )}
                        <button
                            onClick={() => setModalEventId("addEvent")}
                            className="text-xs font-bold text-white px-3 py-2 rounded bg-sky-500"
                        >
                            Tambah Acara
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
                                    Tanggal
                                </th>
                                <th scope="col" className="px-6 py-3">
                                    Judul Acara
                                </th>
                                <th scope="col" className="px-6 py-3">
                                    Tanggal / Tahun (H)
                                </th>
                                
                                <th scope="col" className="px-6 py-3">
                                    Aksi
                                </th>
                            </tr>
                        </thead>
                        <tbody>
                            {memoizedFilteredData.map((event, i) => (
                                <tr
                                    key={i}
                                    className="bg-white border-b dark:bg-gray-800 dark:border-gray-700"
                                >
                                    <td className="px-6 py-4">{i + 1}</td>
                                    <td className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white">
                                        {event.tanggal}
                                    </td>
                                    <td className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white">
                                        {event.title}
                                    </td>
                                    <td className="px-6 py-4">{event.deskripsi}</td>
                                    
                                    <td className="px-6 py-4 flex items-center gap-2">
                                        <button
                                            className="font-medium w-10 h-10 rounded-full bg-neutral-100 flex items-center justify-center text-blue-600 dark:text-blue-500 hover:underline"
                                            onClick={() =>
                                                setModalEventId(event.id)
                                            }
                                        >
                                            <BiPencil />
                                        </button>
                                        <button
                                            className="font-medium w-10 h-10 rounded-full bg-neutral-100 flex items-center justify-center text-red-600 dark:text-red-500 hover:underline"
                                            onClick={() =>
                                                handleDelete(event.id)
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

                {modalEventId && (
                    <div
                        id={modalEventId}
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
                                        {modalEventId === "addEvent"
                                            ? "Tambah"
                                            : "Ubah"}{" "}
                                        Acara
                                    </h3>
                                    <button
                                        type="button"
                                        className="text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm w-8 h-8 ms-auto inline-flex justify-center items-center dark:hover:bg-gray-600 dark:hover:text-white"
                                        onClick={() => setModalEventId(null)}
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
                                        htmlFor="tanggal"
                                        className="block text-sm font-medium text-gray-900 dark:text-white"
                                    >
                                        Tanggal
                                    </label>
                                    <div className="relative mb-3">
                                        <input
                                            type="date"
                                            id="tanggal"
                                            name="tanggal"
                                            value={values.tanggal}
                                            onChange={handleChange}
                                            className="w-full border border-gray-300 rounded-md bg-neutral-50 text-sm font-normal text-black"
                                        />
                                        {errors.tanggal && (
                                            <div className="text-xs font-medium text-red-500">
                                                {errors.tanggal}
                                            </div>
                                        )}
                                    </div>
                                    <label
                                        htmlFor="title"
                                        className="block text-sm font-medium text-gray-900 dark:text-white"
                                    >
                                        Title / Judul Acara
                                    </label>
                                    <div className="relative mb-3">
                                        <input
                                            type="text"
                                            id="title"
                                            name="title"
                                            value={values.title}
                                            onChange={handleChange}
                                            className="w-full border border-gray-300 rounded-md bg-neutral-50 text-sm font-normal text-black"
                                            placeholder="Nama Acara.."
                                        />
                                        {errors.title && (
                                            <div className="text-xs font-medium text-red-500">
                                                {errors.title}
                                            </div>
                                        )}
                                    </div>

                                    <label
                                        htmlFor="deskripsi"
                                        className="block text-sm font-medium text-gray-900 dark:text-white"
                                    >
                                        Tanggal / Tahun (H)
                                    </label>
                                    <div className="relative">
                                        <input
                                            type="text"
                                            id="deskripsi"
                                            name="deskripsi"
                                            value={values.deskripsi}
                                            onChange={handleChange}
                                            placeholder="Tanggal Hijriah.."
                                            className="w-full border border-gray-300 rounded-md bg-neutral-50 text-sm font-normal text-black"
                                        />
                                        {errors.deskripsi && (
                                            <div className="text-xs font-medium text-red-500">
                                                {errors.deskripsi}
                                            </div>
                                        )}
                                    </div>

                                    
                                </div>
                                <div className="flex items-center p-6 space-x-2 border-t border-gray-200 rounded-b dark:border-gray-600">
                                    <button
                                        type="submit"
                                        className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
                                    >
                                        {modalEventId === "addEvent"
                                            ? "Tambah"
                                            : "Simpan Perubahan"}
                                    </button>
                                    <button
                                        type="button"
                                        className="text-gray-500 bg-white hover:bg-gray-100 focus:ring-4 focus:outline-none focus:ring-blue-300 rounded-lg border border-gray-200 text-sm font-medium px-5 py-2.5 hover:text-gray-900 focus:z-10 dark:bg-gray-700 dark:text-gray-300 dark:border-gray-500 dark:hover:text-white dark:hover:bg-gray-600"
                                        onClick={() => setModalEventId(null)}
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

export default Event;
