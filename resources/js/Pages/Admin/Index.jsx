import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";
import { Head } from "@inertiajs/react";
const Index = ({ auth }) => {
    return (
        <AuthenticatedLayout
            user={auth.user}
            header={
                <h2 className="font-[Helvetica-Bold] text-xl text-gray-800 leading-tight">
                    Dashboard
                </h2>
            }
        >
            <Head title="Dashboard" />

            <div className="">
                <h1 className="p-6 text-black text-3xl font-[Helvetica-Regular]">
                    Dashboard
                </h1>
                {/* <div className="sm:px-6 lg:px-8">
                    <div className="bg-white overflow-hidden shadow rounded-lg">
                        <h1 className="p-6 text-black text-3xl font-[Helvetica-Regular]">
                            Dashboard
                        </h1>
                    </div>
                </div> */}
            </div>
        </AuthenticatedLayout>
    );
};

export default Index;
