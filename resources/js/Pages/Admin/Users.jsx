import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";
import { Head, router, usePage } from "@inertiajs/react";
import { useCallback, useEffect, useMemo, useState } from "react";
import { BiPencil, BiTrash } from "react-icons/bi";
const Users = ({ auth, users }) => {
    const { errors } = usePage().props;

    const [search, setSearch] = useState("");
    const [filteredData, setFilteredData] = useState(users);
    const [modalUserId, setModalUserId] = useState(null);
    const [values, setValues] = useState({
        name: "",
        email: "",
        password: "",
        role: "",
    });

    useEffect(() => {
        if (modalUserId && modalUserId !== "addUser" && users.length > 0) {
            const selectedUser = users.find((b) => b.id === modalUserId);
            if (selectedUser) {
                setValues({
                    name: selectedUser.name || "",
                    email: selectedUser.email || "",
                    password: "",
                    role: selectedUser.role || "",
                });
            }
        } else {
            resetForm();
        }
    }, [modalUserId, users]);
    

    const resetForm = () => {
        setValues({
            name: "",
            email: "",
            password: "",
            role: "",
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
            modalUserId === "addUser"
                ? `/dashboard/user/add`
                : `/dashboard/user/update/${modalUserId}`;
    
    
        router.post(url, values, {
            onSuccess: () => {
                setModalUserId(null);
                resetForm(); 
            },
            onError: (errors) => {
                // console.log("Errors:", errors); 
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
            users.filter(
                (user) =>
                    user.name.toLowerCase().includes(search.toLowerCase()) ||
                    user.email.toLowerCase().includes(search.toLowerCase())
            )
        );
    }, [search, users]);

    const memoizedFilteredData = useMemo(() => filteredData, [filteredData]);

    const handleSearchChange = useCallback(
        (e) => {
            setSearch(e.target.value);
        },
        [setSearch]
    );

    return (
        <AuthenticatedLayout user={auth.user}>
            <Head title="Users" />
            <div className="py-5 px-5">
                <div className="md:flex items-start justify-between mb-3">
                    <h1 className="text-sm font-[Helvetica-Bold] mb-3 md:mb-0 text-black">
                        Data Akun{" "}
                        <span className="block text-slate-700 font-[Helvetica-Regular] text-xs">
                            Anda dapat mengelola data akun pengguna
                        </span>
                    </h1>
                    <div className="grid grid-cols-3 md:flex items-center gap-2">
                        {users.length > 0 && (
                            <div className="col-span-2">
                                <label className="outline-none flex items-center gap-2 max-w-xs">
                                    <input
                                        type="text"
                                        placeholder="Cari akun..."
                                        value={search}
                                        onChange={handleSearchChange}
                                        className="grow border-none outline-none py-2 focus:ring-0 focus:border-none focus:outline-none placeholder:text-xs"
                                    />
                                </label>
                            </div>
                        )}
                        <button
                            onClick={() => setModalUserId("addUser")}
                            className="text-xs font-[Helvetica-Bold] text-white px-3 py-2 rounded bg-sky-500"
                        >
                            Buat Akun
                        </button>
                    </div>
                </div>
                <div className="relative overflow-x-auto mt-3 shadow-md sm:rounded-lg w-full">
                    <table className="w-full text-sm text-left text-gray-500 ">
                        <thead className="text-xs text-gray-700 uppercase bg-gray-50 ">
                            <tr>
                                <th scope="col" className="px-6 py-3">
                                    #
                                </th>
                                <th scope="col" className="px-6 py-3">
                                    Nama
                                </th>
                                <th scope="col" className="px-6 py-3">
                                    Email
                                </th>
                                
                                <th scope="col" className="px-6 py-3">
                                    Aksi
                                </th>
                            </tr>
                        </thead>
                        <tbody>
                            {memoizedFilteredData.map((user, i) => (
                                <tr
                                    key={i}
                                    className="bg-white border-b "
                                >
                                    <td className="px-6 py-4">{i + 1}</td>
                                    <td className="px-6 py-4 font-[Helvetica-Regular] tracking-wide text-gray-900 whitespace-nowrap ">
                                        {user.name}
                                    </td>
                                    <td className="px-6 py-4">{user.email}</td>
                                    
                                    <td className="px-6 py-4 flex items-center gap-2">
                                        <button
                                            className="font-[Helvetica-Regular] tracking-wide w-10 h-10 rounded-full bg-neutral-100 flex items-center justify-center text-blue-600  hover:underline"
                                            onClick={() =>
                                                setModalUserId(user.id)
                                            }
                                        >
                                            <BiPencil />
                                        </button>
                                        <button
                                            className="font-[Helvetica-Regular] tracking-wide w-10 h-10 rounded-full bg-neutral-100 flex items-center justify-center text-red-600  hover:underline"
                                            onClick={() =>
                                                handleDelete(user.id)
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

                {modalUserId && (
                    <div
                        id={modalUserId}
                        tabIndex="-1"
                        className="fixed inset-0 z-[100] flex items-center justify-center w-full p-4 overflow-x-hidden overflow-y-auto h-full bg-black/50 backdrop-blur-sm"
                    >
                        <div className="relative w-full max-w-md max-h-[70vh] bg-white rounded overflow-y-auto">
                            <form
                                onSubmit={handleSubmit}
                                className="relative bg-white rounded-lg shadow "
                            >
                                <div className="flex items-start justify-between p-4 border-b rounded-t dark:border-gray-600">
                                    <h3 className="text-xl font-semibold text-gray-900 ">
                                        {modalUserId === "addUser"
                                            ? "Tambah"
                                            : "Ubah"}{" "}
                                        Akun
                                    </h3>
                                    <button
                                        type="button"
                                        className="text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm w-8 h-8 ms-auto inline-flex justify-center items-center dark:hover:bg-gray-600 dark:hover:text-white"
                                        onClick={() => setModalUserId(null)}
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
                                        className="block text-sm font-[Helvetica-Regular] tracking-wide text-gray-900 "
                                    >
                                        Nama
                                    </label>
                                    <div className="relative mb-3">
                                        <input
                                            type="text"
                                            id="name"
                                            name="name"
                                            value={values.name}
                                            onChange={handleChange}
                                            className="w-full border border-gray-300 rounded-md bg-neutral-50 text-sm font-[Helvetica-Regular] text-black"
                                            placeholder="Nama user.."
                                        />
                                        {errors.name && (
                                            <div className="text-xs font-[Helvetica-Regular] tracking-wide text-red-500">
                                                {errors.name}
                                            </div>
                                        )}
                                    </div>

                                    

                                    

                                    <label
                                        htmlFor="email"
                                        className="block text-sm font-[Helvetica-Regular] tracking-wide text-gray-900 "
                                    >
                                        Email
                                    </label>
                                    <div className="relative">
                                        <input
                                            type="text"
                                            id="email"
                                            name="email"
                                            value={values.email}
                                            onChange={handleChange}
                                            placeholder="Email.."
                                            className="w-full border border-gray-300 rounded-md bg-neutral-50 text-sm font-[Helvetica-Regular] text-black"
                                        />
                                        {errors.email && (
                                            <div className="text-xs font-[Helvetica-Regular] tracking-wide text-red-500">
                                                {errors.email}
                                            </div>
                                        )}
                                    </div>

                                    <label
                                        htmlFor="password"
                                        className="block text-sm font-[Helvetica-Regular] tracking-wide text-gray-900 "
                                    >
                                        Password
                                    </label>
                                    <div className="relative">
                                        <input
                                            type="text"
                                            id="password"
                                            name="password"
                                            value={values.password}
                                            onChange={handleChange}
                                            placeholder="Password.."
                                            className="w-full border border-gray-300 rounded-md bg-neutral-50 text-sm font-[Helvetica-Regular] text-black"
                                        />
                                        {errors.password && (
                                            <div className="text-xs font-[Helvetica-Regular] tracking-wide text-red-500">
                                                {errors.password}
                                            </div>
                                        )}
                                    </div>

                                    

                                    <label
                                        htmlFor="role"
                                        className="block text-sm font-[Helvetica-Regular] tracking-wide text-gray-900 "
                                    >
                                        Role
                                    </label>
                                    <select
                                        id="role"
                                        name="role"
                                        value={values.role}
                                        onChange={handleChange}
                                        className="w-full border border-gray-300 rounded-md bg-neutral-50 text-sm font-[Helvetica-Regular] text-black"
                                    >
                                        <option value="" disabled>
                                            Pilih Role
                                        </option>
                                        <option value="pengguna">Pengguna</option>
                                        <option value="admin">
                                            Admin
                                        </option>
                                    </select>

                                    {errors.role && (
                                        <div className="text-xs font-[Helvetica-Regular] tracking-wide text-red-500">
                                            {errors.role}
                                        </div>
                                    )}
                                </div>
                                <div className="flex items-center p-6 space-x-2 border-t border-gray-200 rounded-b dark:border-gray-600">
                                    <button
                                        type="submit"
                                        className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-[Helvetica-Regular] tracking-wide rounded-lg text-sm px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
                                    >
                                        {modalUserId === "addUser"
                                            ? "Tambah"
                                            : "Simpan Perubahan"}
                                    </button>
                                    <button
                                        type="button"
                                        className="text-gray-500 bg-white hover:bg-gray-100 focus:ring-4 focus:outline-none focus:ring-blue-300 rounded-lg border border-gray-200 text-sm font-[Helvetica-Regular] tracking-wide px-5 py-2.5 hover:text-gray-900 focus:z-10  dark:text-gray-300 dark:border-gray-500 dark:hover:text-white dark:hover:bg-gray-600"
                                        onClick={() => setModalUserId(null)}
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

export default Users;
