/* eslint-disable no-undef */
import Checkbox from "@/Components/Checkbox";
import InputError from "@/Components/InputError";
import InputLabel from "@/Components/InputLabel";
import PrimaryButton from "@/Components/PrimaryButton";
import TextInput from "@/Components/TextInput";
import { Head, Link, useForm } from "@inertiajs/react";
import { FaGoogle } from "react-icons/fa";

export default function Login({ status }) {
    const { data, setData, post, processing, errors, reset } = useForm({
        email: "",
        password: "",
        remember: false,
    });

    const submit = (e) => {
        e.preventDefault();

        post(route("login"), {
            onFinish: () => reset("password"),
        });
    };

    return (
        <>
            <Head title="Log in" />

            {status && (
                <div className="mb-4 font-medium text-sm text-green-600">
                    {status}
                </div>
            )}

            <div className="w-full h-screen overflow-hidden grid lg:grid-cols-3 grid-cols-1 p-0">
                <div className="flex items-center h-screen justify-center z-40">
                    <form onSubmit={submit} className="w-[75%] md:w-[70%]">
                        <div className="mb-5">
                            <h1 className="text-3xl md:text-4xl font-[Helvetica-bold] text-center">
                                Login
                            </h1>
                            <p className="text-base tracking-wide font-[Helvetica-regular] text-black text-center">
                                Harap masuk untuk melanjutkan.
                            </p>
                        </div>
                        <div>
                            <InputLabel htmlFor="email" value="Email" />

                            <TextInput
                                id="email"
                                type="email"
                                name="email"
                                value={data.email}
                                className="mt-1 block w-full"
                                autoComplete="username"
                                isFocused={true}
                                onChange={(e) =>
                                    setData("email", e.target.value)
                                }
                            />

                            <InputError
                                message={errors.email}
                                className="mt-2"
                            />
                        </div>

                        <div className="mt-4">
                            <InputLabel htmlFor="password" value="Password" />

                            <TextInput
                                id="password"
                                type="password"
                                name="password"
                                value={data.password}
                                className="mt-1 block w-full"
                                autoComplete="current-password"
                                onChange={(e) =>
                                    setData("password", e.target.value)
                                }
                            />

                            <InputError
                                message={errors.password}
                                className="mt-2"
                            />
                        </div>

                        <div className="mt-4">
                            {/* {canResetPassword && (
            <Link
                href={route('password.request')}
                className="underline text-sm text-gray-600 hover:text-gray-900 rounded-md focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
            >
                Forgot your password?
            </Link>
        )} */}

                            <PrimaryButton
                                className="w-full font-[Helvetica-regular]"
                                disabled={processing}
                            >
                                Masuk
                            </PrimaryButton>
                            <a
                                href="/auth/redirect/google"
                                className="bg-orange-400 text-white font-[Helvetica-Regular] px-4 py-2 mt-4 flex items-center justify-center gap-2 rounded"
                            >
                                <FaGoogle /> Lanjutkan dengan Google
                            </a>
                            <div className="flex items-center justify-between mt-5">
                                <p className="text-base font-[Helvetica-regular] text-black">
                                    Belum punya akun?
                                </p>
                                <Link
                                    href={route("register")}
                                    className="text-base font-[Helvetica-bold] text-blue-700 underline pb-1"
                                >
                                    Daftar
                                </Link>
                            </div>
                        </div>
                    </form>
                </div>
                <div className="h-full lg:col-span-2 lg:flex absolute inset-0 lg:relative z-20">
                    <img
                        src={
                            "https://images.unsplash.com/photo-1618554844984-d4ed47c7e0c0?q=80&w=869&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
                        }
                        className="object-cover h-full"
                        alt=""
                    />
                </div>
                <div className="absolute inset-0 lg:hidden bg-white/75 backdrop-blur-sm z-30"></div>
            </div>
        </>
    );
}
