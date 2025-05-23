import Topbar from "@/Components/layouts/Topbar";
import Sidebar from "@/Components/layouts/Sidebar";
import { useState } from "react";
import { Head } from "@inertiajs/react";
import OfficeList from "@/Pages/Offices/OfficeList";

export default function OfficePage({ setting }) {
    const [activeTab, setActiveTab] = useState("Kantor");

    return (
        <div className="flex">
            <Head title="Management Kantor" />
            <Sidebar activeTab={activeTab} setActiveTab={setActiveTab} />
            <div className="flex-1 flex flex-col min-h-screen bg-gray-50 dark:bg-gray-900">
                <Topbar />
                <main className="flex-1 p-8">
                    <h1 className="text-2xl font-bold mb-6 text-gray-800 dark:text-white">
                        Manajemen Kantor
                    </h1>
                    <OfficeList />
                </main>
            </div>
        </div>
    );
}
