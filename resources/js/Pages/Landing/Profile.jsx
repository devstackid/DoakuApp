/* eslint-disable no-undef */
import Guest from "@/Layouts/GuestLayout";
import { Head, Link } from "@inertiajs/react";
import UpdatePasswordForm from "@/Pages/Profile/Partials/UpdatePasswordForm";
import UpdateProfileInformationForm from "@/Pages/Profile/Partials/UpdateProfileInformationForm";

function Profile({ mustVerifyEmail, status }) {
    return (
        <Guest>
            <Head title="Profile" />

            <main className="w-full overflow-x-hidden py-24 px-5 lg:px-20">
                {/* Profile */}

                <div className="grid lg:grid-cols-2 gap-10 mt-10 mb-10 font-[Helvetica-regular] tracking-wide">
                    <div className="">
                        <UpdateProfileInformationForm
                            mustVerifyEmail={mustVerifyEmail}
                            status={status}
                            className="max-w-xl"
                        />
                    </div>

                    <div className="">
                        <UpdatePasswordForm className="max-w-xl" />
                    </div>

                    
                </div>
                <hr />
                    <div className="">
                        <Link
                            className="text-base bg-red-500 px-5 py-3 rounded-md text-white w-full"
                            href={route("logout")}
                            method="post"
                            as="button"
                        >
                            Keluar
                        </Link>
                    </div>
            </main>
        </Guest>
    );
}

export default Profile;
