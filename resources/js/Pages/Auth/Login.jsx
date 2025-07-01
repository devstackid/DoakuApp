/* eslint-disable no-undef */
import InputError from "@/Components/InputError";
import InputLabel from "@/Components/InputLabel";
import PrimaryButton from "@/Components/PrimaryButton";
import TextInput from "@/Components/TextInput";
import Guest from "@/Layouts/GuestLayout";
import { Head, useForm } from "@inertiajs/react";
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
        <Guest>
            <Head title="Log in" />

            {status && (
                <div className="mb-4 font-medium text-sm text-green-600">
                    {status}
                </div>
            )}

            <div className="w-full h-screen overflow-hidden p-0">
                <div className="flex items-center h-screen justify-center z-40">
                    <form onSubmit={submit} className="w-full px-5 lg:w-[40%]">
                        <div className="mb-5">
                            <h1 className="text-3xl md:text-4xl font-[Helvetica-bold] text-center">
                                Masuk
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
                            <InputLabel htmlFor="password" value="Kata Sandi" />

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
                            <button
                                className="w-full font-[Helvetica-Bold] mb-3 block bg-blue-600 text-white text-center border border-blue-700 rounded-md py-2  hover:bg-white hover:text-blue-700 transition"
                                disabled={processing}
                            >
                                Masuk
                            </button>
                            <div className="flex items-center gap-2">
                                <hr className="w-full" />
                                <span className="text-xs font-[Helvetica-Regular] text-black/50">
                                    atau
                                </span>
                                <hr className="w-full" />
                            </div>
                            <a
                                href="/auth/redirect/google"
                                className="bg-orange-400 hover:bg-white border border-orange-500 hover:text-orange-600 transition text-white font-[Helvetica-Regular] px-4 py-2 mt-4 flex items-center justify-center gap-2 rounded"
                            >
                                <FaGoogle /> Lanjutkan dengan Google
                            </a>
                        </div>
                    </form>
                </div>
            </div>

            <div className="left-0 right-0 bottom-0 fixed z-20 border-t py-2 flex items-center justify-center gap-2">
                <div className="w-10 h-10 flex items-center justify-center rounded-full">
                    <img
                        src="/assets/logo.png"
                        className="w-full h-full object-cover"
                        alt=""
                    />
                </div>
                <div className="text-sm font-[Helvetica-Regular] text-black/70 tracking-wide">
                   @2025, Tsaqalain
                </div>
            </div>
        </Guest>
    );
}
