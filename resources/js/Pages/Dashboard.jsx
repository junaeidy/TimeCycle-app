import { useState } from "react";
import {
    ShoppingBagIcon,
    ArchiveBoxIcon,
    BriefcaseIcon,
    HeartIcon,
} from "@heroicons/react/24/solid";
import Sidebar from "@/Components/layouts/Sidebar";
import StatCard from "@/Components/dashboard/StatCard";
import ReportsChart from "@/Components/dashboard/ReportCharts";
import AnalyticsChart from "@/Components/dashboard/AnalyticsChart";
import TopSellingProducts from "@/Components/dashboard/TopAttendance";
import Topbar from "@/Components/layouts/Topbar";
import { Head } from "@inertiajs/react";
import RecentSubmissions from "@/Components/dashboard/RecentSubmissions";
import TopAttendance from "@/Components/dashboard/TopAttendance";

export default function Dashboard() {
    const [activeTab, setActiveTab] = useState("Dashboard");

    const stats = [
        {
            icon: <HeartIcon className="w-6 h-6 text-blue-500" />,
            label: "Total Karyawan",
            value: "178+",
        },
        {
            icon: <ArchiveBoxIcon className="w-6 h-6 text-yellow-500" />,
            label: "Karyawan Hadir Hari Ini",
            value: "20+",
        },
        {
            icon: <ShoppingBagIcon className="w-6 h-6 text-orange-500" />,
            label: "Total Kehadiran Bulan Ini",
            value: "190+",
        },
        {
            icon: <BriefcaseIcon className="w-6 h-6 text-indigo-500" />,
            label: "Permintaan Cuti/Pengajuan Izin",
            value: "12+",
        },
    ];

    return (
        <div className="flex h-screen bg-gray-50">
            <Head title="Dashboard" />
            <Sidebar activeTab={activeTab} setActiveTab={setActiveTab} />

            <div className="flex-1 flex flex-col overflow-auto">
                <Topbar />

                <main className="p-6 flex-1">
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
                        {stats.map((stat, index) => (
                            <StatCard
                                key={index}
                                icon={stat.icon}
                                label={stat.label}
                                value={stat.value}
                            />
                        ))}
                    </div>

                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 mb-6">
                        <ReportsChart />
                        <AnalyticsChart />
                    </div>

                    <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
                        <div className="lg:col-span-2">
                            <RecentSubmissions />
                        </div>
                        <TopAttendance />
                    </div>
                </main>
            </div>
        </div>
    );
}