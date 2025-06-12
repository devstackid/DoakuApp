
const Footer = () => {
  return (
    <section className="py-10 bg-gray-50 sm:pt-16 lg:pt-24">
                    <div className="px-4 mx-auto sm:px-6 lg:px-8 max-w-7xl">
                        <div className="grid grid-cols-2 md:col-span-3 lg:grid-cols-6 gap-y-16 gap-x-12">
                            <div className="col-span-2 md:col-span-3 lg:col-span-2 lg:pr-8">
                                <h1 className="text-3xl font-extrabold text-black">
                                    Ourvitation
                                </h1>

                                <p className="text-base leading-relaxed text-gray-600 mt-7">
                                    Silahkan konsultasikan kepada kami melalui
                                    kontak berikut jika anda ingin mengajukan
                                    pertanyaan seputar cara pemesanan dan
                                    lain-lain.
                                </p>

                                <ul className="flex items-center space-x-3 mt-9">
                                    <li>
                                        <a
                                            href="{{ $info->instagram }}"
                                            title=""
                                            className="flex items-center justify-center text-white transition-all duration-200 bg-gray-800 rounded-full w-7 h-7 hover:bg-blue-600 focus:bg-blue-600"
                                        >
                                            <i className="fa-brands fa-instagram"></i>
                                        </a>
                                    </li>
                                    <li>
                                        <a
                                            href="https://wa.me/@if($info){{ $info->whatsapp }}@endif"
                                            title=""
                                            className="flex items-center justify-center text-white transition-all duration-200 bg-gray-800 rounded-full w-7 h-7 hover:bg-blue-600 focus:bg-blue-600"
                                        >
                                            <i className="fa-brands fa-whatsapp"></i>
                                        </a>
                                    </li>
                                </ul>
                            </div>

                            <div>
                                <p className="text-sm font-semibold tracking-widest text-gray-400 uppercase">
                                    Menu
                                </p>

                                <ul className="mt-6 space-y-4">
                                    <li>
                                        <a
                                            href="#home"
                                            title=""
                                            className="flex text-base text-black transition-all duration-200 hover:text-blue-600 focus:text-blue-600"
                                        >
                                            {" "}
                                            Beranda{" "}
                                        </a>
                                    </li>

                                    <li>
                                        <a
                                            href="#about"
                                            title=""
                                            className="flex text-base text-black transition-all duration-200 hover:text-blue-600 focus:text-blue-600"
                                        >
                                            {" "}
                                            Tentang Kami{" "}
                                        </a>
                                    </li>

                                    <li>
                                        <a
                                            href="#themes"
                                            title=""
                                            className="flex text-base text-black transition-all duration-200 hover:text-blue-600 focus:text-blue-600"
                                        >
                                            {" "}
                                            Tema{" "}
                                        </a>
                                    </li>

                                    <li>
                                        <a
                                            href="#pricing"
                                            title=""
                                            className="flex text-base text-black transition-all duration-200 hover:text-blue-600 focus:text-blue-600"
                                        >
                                            {" "}
                                            Penawaran{" "}
                                        </a>
                                    </li>
                                    <li>
                                        <a
                                            href="#tutorial"
                                            title=""
                                            className="flex text-base text-black transition-all duration-200 hover:text-blue-600 focus:text-blue-600"
                                        >
                                            {" "}
                                            Tutorial{" "}
                                        </a>
                                    </li>
                                    <li>
                                        <a
                                            href="{{ route('login') }}"
                                            title=""
                                            className="flex text-base text-black transition-all duration-200 hover:text-blue-600 focus:text-blue-600"
                                        >
                                            {" "}
                                            Masuk{" "}
                                        </a>
                                    </li>
                                </ul>
                            </div>

                            <div>
                                <p className="text-sm font-semibold tracking-widest text-gray-400 uppercase">
                                    Help
                                </p>

                                <ul className="mt-6 space-y-4">
                                    <li>
                                        <a
                                            href="#FAQ"
                                            title=""
                                            className="flex text-base text-black transition-all duration-200 hover:text-blue-600 focus:text-blue-600"
                                        >
                                            {" "}
                                            FAQ{" "}
                                        </a>
                                    </li>

                                    <li>
                                        <a
                                            href="{{ route('terms') }}"
                                            title=""
                                            className="flex text-base text-black transition-all duration-200 hover:text-blue-600 focus:text-blue-600"
                                        >
                                            {" "}
                                            Terms & Conditions
                                        </a>
                                    </li>

                                    <li>
                                        <a
                                            href="#"
                                            title=""
                                            className="flex text-base text-black transition-all duration-200 hover:text-blue-600 focus:text-blue-600"
                                        >
                                            Privacy Policy
                                        </a>
                                    </li>
                                </ul>
                            </div>

                            <div className="col-span-2 md:col-span-1 lg:col-span-2 lg:pl-8">
                                <p className="text-sm font-semibold tracking-widest text-gray-400 uppercase">
                                    Subscribe to newsletter
                                </p>

                                <form action="#" method="POST" className="mt-6">
                                    <div>
                                        <label className="sr-only">Email</label>
                                        <input
                                            type="email"
                                            name="email"
                                            id="email"
                                            placeholder="Enter your email"
                                            className="block w-full p-4 text-black placeholder-gray-500 transition-all duration-200 bg-white border border-gray-200 rounded-md focus:outline-none focus:border-blue-600 caret-blue-600"
                                        />
                                    </div>

                                    <button
                                        type="submit"
                                        className="inline-flex items-center justify-center px-6 py-4 mt-3 font-semibold text-white transition-all duration-200 bg-blue-600 rounded-md hover:bg-blue-700 focus:bg-blue-700"
                                    >
                                        Subscribe
                                    </button>
                                </form>
                            </div>
                        </div>

                        <hr className="mt-16 mb-10 border-gray-200" />

                        <p className="text-sm text-center text-gray-600">
                            © Copyright 2024, All Rights Reserved by Ourvitation
                        </p>
                    </div>
                </section>
  )
}

export default Footer