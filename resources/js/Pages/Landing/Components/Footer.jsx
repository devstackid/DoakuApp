import { Link } from "@inertiajs/react"

const Footer = () => {
  return (
    <section className="py-10 bg-black sm:pt-16 lg:pt-24 mt-20">
                    <div className="px-4 mx-auto sm:px-6 lg:px-8 max-w-7xl">
                        <div className="grid grid-cols-2 md:col-span-3 lg:grid-cols-6 gap-y-16 gap-x-12">
                            <div className="col-span-2 md:col-span-3 lg:col-span-2 lg:pr-8">
                                <h1 className="text-3xl font-[Helvetica-Bold] text-white">
                                    Tsaqalain
                                </h1>

                                <p className="text-base font-[Helvetica-Regular] leading-relaxed text-white mt-7">
                                    Silahkan konsultasikan kepada kami melalui
                                    kontak berikut jika anda ingin mengajukan
                                    pertanyaan seputar cara pemesanan dan
                                    lain-lain.
                                </p>

                                <ul className="flex items-center space-x-3 mt-9">
                                    <li>
                                        <a
                                            href="#"
                                            title=""
                                            className="flex items-center justify-center text-white transition-all duration-200 bg-gray-800 rounded-full w-7 h-7 hover:bg-blue-600 focus:bg-blue-600"
                                        >
                                            <i className="fa-brands fa-instagram"></i>
                                        </a>
                                    </li>
                                    <li>
                                        <a
                                            href="#"
                                            title=""
                                            className="flex items-center justify-center text-white transition-all duration-200 bg-gray-800 rounded-full w-7 h-7 hover:bg-blue-600 focus:bg-blue-600"
                                        >
                                            <i className="fa-brands fa-whatsapp"></i>
                                        </a>
                                    </li>
                                </ul>
                            </div>

                            <div>
                                <p className="text-sm font-semibold tracking-widest text-white uppercase">
                                    Menu
                                </p>

                                <ul className="mt-6 space-y-4">
                                    <li>
                                        <a
                                            href="#home"
                                            title=""
                                            className="flex text-base text-white transition-all duration-200 hover:text-black focus:text-blue-600"
                                        >
                                            {" "}
                                            Beranda{" "}
                                        </a>
                                    </li>

                                    <li>
                                        <a
                                            href="#"
                                            title=""
                                            className="flex text-base text-white transition-all duration-200 hover:text-black focus:text-blue-600"
                                        >
                                            {" "}
                                            Al-Qur&apos;an{" "}
                                        </a>
                                    </li>

                                    <li>
                                        <a
                                            href="#"
                                            title=""
                                            className="flex text-base text-white transition-all duration-200 hover:text-black focus:text-blue-600"
                                        >
                                            {" "}
                                            Tema{" "}
                                        </a>
                                    </li>

                                    <li>
                                        <a
                                            href="#"
                                            title=""
                                            className="flex text-base text-white transition-all duration-200 hover:text-black focus:text-blue-600"
                                        >
                                            {" "}
                                            Kumpulan Doa{" "}
                                        </a>
                                    </li>
                                    <li>
                                        <Link
                                            href="{{ route('login') }}"
                                            title=""
                                            className="flex text-base text-white transition-all duration-200 hover:text-black focus:text-blue-600"
                                        >
                                            {" "}
                                            Masuk{" "}
                                        </Link>
                                    </li>
                                </ul>
                            </div>

                            <div>
                                <p className="text-sm font-semibold tracking-widest text-white uppercase">
                                    Bantuan
                                </p>

                                <ul className="mt-6 space-y-4">
                                    <li>
                                        <a
                                            href="#FAQ"
                                            title=""
                                            className="flex text-base text-white transition-all duration-200 hover:text-black focus:text-blue-600"
                                        >
                                            {" "}
                                            FAQ{" "}
                                        </a>
                                    </li>

                                    <li>
                                        <a
                                            href="{{ route('terms') }}"
                                            title=""
                                            className="flex text-base text-white transition-all duration-200 hover:text-black focus:text-blue-600"
                                        >
                                            {" "}
                                            Terms & Conditions
                                        </a>
                                    </li>

                                    <li>
                                        <a
                                            href="#"
                                            title=""
                                            className="flex text-base text-white transition-all duration-200 hover:text-black focus:text-blue-600"
                                        >
                                            Privacy Policy
                                        </a>
                                    </li>
                                </ul>
                            </div>

                            <div className="col-span-2 md:col-span-1 lg:col-span-2 lg:pl-8">
                                <img className="rounded-full w-10 h-10" src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAOEAAADhCAMAAAAJbSJIAAABC1BMVEX///8HkxgAjgD///4AkAAAjwYAkhD///33/fkynkAAkgAKkRpdunJWtGpcuXj8//8xvGmCzJUAiQCCzJn//P9VsmuLyZwAlBB+xIz3//4AlR13vofn+/H1+vv9//mUxqcrumLH5Nzp9u89pld7t4kypVE3pT3d8ugSljETmSxpuX3K6tjW7d3D5si03LrB48uX0KRotoN1xaJCuH1PxHw1rk+t6slSoGg6nklfuHuY16nT9OKm2qkilkOKzo9BsGBQuWaa1LHf6t1sxoyt4r43nFHe+exXr4i959rQ+OCOxqEVjSaQ1qNcrW8Aozmh3LSXxKygwbqf1LhNnlmJ3KF8tJpxzppNwIgAr2PJ96c0AAAIpklEQVR4nO2dC1vbOBZAr2VHMhagYhyMQ0g7Yck7hB1mum0zHcrQYVu2LbPMPvr/f8lKzsuWQxMeqR3tPXx8bWOgOrl6XD1sABAEQRAEQRAEQRAEQRAEQRAEQRAEQRAEQf5fECLvEqwc0w2jH0xWlGr1o7/kXYrVUj32D/Iuw+qQEaw2HM9gQ4Bmi1qOwYas2XYsy+vkXY7V0W073LKcbWB5l2RF9CoOD2NDQ+lTaimkoYnjoYBeOBI0M4YigIE1FjTR0GYMTshE0EBDW0VQdTHGGrIA3nshN9ZQVdFTf+ZnnqGc7p46lmWsIZNtcD8taJahLWO4R7jFjTWUVXTftyxjY6iGiX0/NNhQNsOOn66hJhkymYq625kqapChpLpNMlXUIEMB0V99Tg02BPfHs59+9hxubk9jH7rCrd86xvY0EEEQsJpMuo01BGbLxliDXWKsYYwIogo12pAJONCaogGGh7OlNCFH/q5Rcwtbyr38m5t6rV4xKYYy1+62G2lDtkENMmTQbzuvgtRrYsszZX4o5EfXo3QjHUOxZc4qhoATmaPRVj398lYpbfg6n9I9AQLeyNE91GMIm5rhmu4fChaIG7VyXzHUUAQCbvxRp7mhbS3phpdruX9YE7AzWZLZOExf0w1fr6WhDTvTvZeNKH1NN+ysn6GcRSRWDZdoh5NqHJ//OlTAKMMrKoFw953p3svyhgIOh790Xr19+/aofNqPZG/1/cu+HEL8Svh0TWaRIZkZ9s/bfomGEo84n/tu9kcXAyG2SWI5ZknDAJrbvjfe2+fcCh1y3rVzEViATLbfkWRuvUwtDWQLfBmmZ/88dLyLArZFBtUyobxyP0P5ttwQbRmOyoZMbvOxuBOmBI+0Ge5Cw47qQ/sWVYKZBdWTgkVRqAhqZVxoKOcWdrWl3HhmV4O2r4L5/1VO2NUNLYLLGULH8RyHEP3dkVfLxRoz3EYps+K7jOGQ+D+d/NYbXIb6G8TJ+3xU5iBT0eZxNgjLtEP48feXo2tX2572FtHz769yB1FwteHRTAiX6kv/3oR46BMQlb1K+tsr1Txs5sGkYNZvCcPX0PxQA9Wh2EzAx3a6P6XFqKZqwb7ZymxJLFtLhQ2BPfo5DK61H0P28jDKEMGwMjeCS2RtqZUoO2hqqY1XiJUqGwZ0ThNcLoYpAwb1dHfKS1vf02QutvzoV1Q6MtfxfoY2uFotLYChbEX99rwd+ocYgn2YNuRe/oYAXSucu0X/IMNIM3QKYNgMaXZ7/slimLehzBqv2ukiP8rQZq5uWP6ePlnswC3PHwefytDL2VCIA3LXOLH+MbTVuuGFnmzzdF655jFkMNQHQepolfaRhlaehkENql+08oT/OL1MJyWPNsyzL63BQaqOykHRuYHTdL19dDvMdbTo6+ME+QRwbZChq0+Y5FwuELsGGXb0wz9vgEXG1FKZzHwkYcqQ3MQvP87QLowhiNpW6rQoJTuyitoM9kwxhH56VPAvpZ8IzDG04XNybZSTd/EdIwzMqaX9xK0TIfe+RIFanJafj+tLC2S4lexIaavJ1Oa2MtwxwtCGYTib1XPL68fLNXFFNcJQCJmvJeYQZHdyxZQY2jKdmR1FUIUQ4w1pcwwHZLZ4SHk1mmyBmWIoZMI2K4R/M7tijGE9sX/inSf2ME0xhO6sGLQ0TOy1G2O4O6uk/nby8FLWMFy8u5akIIZies63QsNe8DjD1PNpihJD9+dpMySbqQeu3d+QHEDi6FNR5oeJeyZI12aJx688IIYHMD2eGcgfUIxV/d40hLQRpU6DZAwpbaiT7IkwbabfAfUUJXuE/FPou2s5GXbJZK9JTntTzOlL+e7zmKY68waZGIZv955PuL5+/seetkOaj+FgegjN6aYP9GQM1QojkR+Ofz2uzJqhFcqLY+TfPO1qToY3U4m2mzbMzi0mqBMHYp7ht8nbkB5D+gzo3YbO5EzFehk6+sPWvhHD0/GXrIXhCeGzwKSCmF3FSBja62M4mJzEl8VO3y9yt6F8M9j6GHYnEuRiaUPZ07D16Wl6k1GZvNd6GlMMq5OsTRreI4bzx8NCGrrHk5TmxlBDVi5Ni710X7pWhjBJHsnlqg3z2uU+GVuUyqYa9salpMfaLWbfHA8fVEvzMRTul7Fhu15LXVFZm++U5qBiqMIttsi8y/OQs42SQ3I5ys7g13FDdAbaJQEnZ19fvHjxLMEL9e+z21GFFn+cPdOuf5PP/8zD0J1mNbMdizFs0QNlawuuZ8jnBjYWNUZjfumIaUkNiwtlayS+yrZHnxpiwuwlWwiW0x0zshSfJtW0mU8RVs94uY3rCzUG0Ymzb24V556Wp2Y46Wt2IK/GsloC2BxPoSr1hf3nWiLgarzDpnJTE5Hd/cX4jmbSBBYU8rbrRyErpjiKD5zwUkNAzcimCB/ju5ND7m9GQbFu130aZB59UqJc3U0iczeRU3a1Whjsjx5JGt8GaWKHKtve69EeDfXU6WDjoshkxYzKqreRddW/yLs4K6NDrHgzMT5Aa2BVZYG778XDInW2qwYKxiP/mziGIXeO+yZ2qGol6mXbkZMMOWiQ00jNgU0b/dUvT+v4lHOLh+R8COb9vj/1eGAYNOInQ/GSv9kzTnHU9Kp7LYeq+4G91u5VXHnnrMWsOVcdq6SeMBM6rdMrAWBcAiCdmvsVElLpSLxOr2ZcHidUfW1++uITOe3njrd1Gy3+prWke1Dx5dSYlwh9N1AHvhgEBXvY06NQvejV4PRP7hAnLNFW55ehGiLvvdBdYOTYIQMmPn46OGqVfIeQ1p/Xg2FkUJMUs9Gw+eFf5VcNi/g+P/v3oF4v7FMCH0h8cFhEbvPD7cV//vvs69evZ7sXP/xWX/iNa4QQibUNIaJ6vd40y1A9yZQJmYjbgdqLGr1kUINEEARBEARBEARBEARBEARBEARBEARBEARBEARBEARB1pT/AcC6pk7lPwsGAAAAAElFTkSuQmCC" alt="" />

                               
                            </div>
                        </div>

                        <hr className="mt-16 mb-10 border-gray-200" />

                        <p className="text-sm text-center text-white">
                            © Copyright 2025, All Rights Reserved by Tsaqalain
                        </p>
                    </div>
                </section>
  )
}

export default Footer