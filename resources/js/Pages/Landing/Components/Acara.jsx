const Acara = ({
    futures,
    now_hijri_day,
    now_hijri_month,
    now_hijri_year,
    todayFormatted,
}) => {
    return (
        <div className="mt-20 text-center">
            <h1 className="text-3xl font-[Helvetica-Bold] text-blue-700 mb-5">
                Kalender
                <span className="block text-xl text-black/70 font-[Helvetica-Regular]">
                    Informasi peristiwa hari-hari besar Ahlulbait
                </span>
            </h1>
            <div className="px-4 py-20 bg-blue-600 rounded-xl">
                <div className="text-center mb-5">
                    <h1 className="text-xl font-[Helvetica-Medium] text-white mb-2 border-b border-white pb-2 w-max mx-auto">
                        Saat ini
                    </h1>
                    <h2 className="text-sm tracking-wide capitalize font-[Helvetica-Regular] text-white/75">
                        {now_hijri_day} {now_hijri_month} {now_hijri_year} H /{" "}
                        {todayFormatted}
                    </h2>
                </div>
                <div className="text-center">
                    <h1 className="text-xl font-[Helvetica-Medium] text-white mb-2 border-b border-white pb-2 w-max mx-auto">
                        Mendatang
                    </h1>
                    <ul className="text-sm tracking-wide capitalize font-[Helvetica-Regular] text-white/75">
                        {futures.map((future, i) => (
                            <li key={i} className="mb-3">
                                <span className="block text-center">
                                    {future.hijri_day} {future.hijri_month}{" "}
                                    {future.hijri_year} H ({future.title})
                                </span>
                            </li>
                        ))}
                    </ul>
                </div>
            </div>
            <div className="mx-auto w-14 h-14 flex items-center justify-center rounded-full mt-10">
                <img
                    src="/assets/logo.png"
                    className="w-full h-full object-cover"
                    alt=""
                />
            </div>
            <div className="text-center text-sm font-[Helvetica-Bold] text-black pb-20">
                @2025 Tsaqalain
            </div>
        </div>
    );
};

export default Acara;
