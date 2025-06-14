import { Link, usePage } from "@inertiajs/react";
import {
    ChartBarIcon,
    DocumentTextIcon,
    CalendarIcon,
    Cog6ToothIcon,
    BellIcon,
    UserGroupIcon,
    ArrowRightOnRectangleIcon,
    ClockIcon,
    BuildingOffice2Icon,
    FolderIcon,
} from "@heroicons/react/24/solid";

const navItems = [
    { name: "Dashboard", icon: ChartBarIcon, href: route("dashboard") },
    { name: "Kantor", icon: BuildingOffice2Icon, href: route("offices.index") },
    { name: "Divisi", icon: FolderIcon, href: route("divisions.index") },
    { name: "Absensi", icon: ClockIcon },
    { name: "Laporan", icon: DocumentTextIcon },
    { name: "Jadwal Kerja", icon: CalendarIcon },
    { name: "Karyawan", icon: UserGroupIcon, href: route("employees.index") },
    {
        name: "Pengaturan",
        icon: Cog6ToothIcon,
        href: route("app-setting.show"),
    },
];

export default function Sidebar({ activeTab, setActiveTab }) {
    const { app_name } = usePage().props;

    return (
        <aside className="w-64 bg-white shadow-lg p-4 flex flex-col h-screen">
            <div className="text-2xl font-bold text-blue-600 mb-8">
                {app_name || "TimeCycle"}
            </div>
            <nav className="flex-1 space-y-2">
                {navItems.map((item) =>
                    item.href ? (
                        <Link
                            key={item.name}
                            href={item.href}
                            className={`flex items-center p-3 rounded-lg transition-colors hover:bg-blue-100 ${
                                activeTab === item.name
                                    ? "bg-blue-100 text-blue-600 font-semibold"
                                    : "text-gray-700"
                            }`}
                        >
                            <item.icon className="w-6 h-6 mr-3" />
                            <span>{item.name}</span>
                        </Link>
                    ) : (
                        <div
                            key={item.name}
                            onClick={() => setActiveTab(item.name)}
                            className={`flex items-center p-3 rounded-lg cursor-pointer transition-colors hover:bg-blue-100 ${
                                activeTab === item.name
                                    ? "bg-blue-100 text-blue-600 font-semibold"
                                    : "text-gray-700"
                            }`}
                        >
                            <item.icon className="w-6 h-6 mr-3" />
                            <span>{item.name}</span>
                        </div>
                    )
                )}
            </nav>
            <div className="mt-auto pt-6 border-t border-gray-200 text-sm text-gray-500">
                Created with ❤️ {app_name || "TimeCycle"}
            </div>
        </aside>
    );
}
