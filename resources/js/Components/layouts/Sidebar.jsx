import {
  ChartBarIcon,
  DocumentTextIcon,
  CalendarIcon,
  Cog6ToothIcon,
  BellIcon,
  UserGroupIcon,
  ArrowRightOnRectangleIcon,
  ClockIcon,
} from "@heroicons/react/24/solid";

const navItems = [
  { name: "Dashboard", icon: ChartBarIcon },
  { name: "Absensi", icon: ClockIcon },
  { name: "Laporan", icon: DocumentTextIcon },
  { name: "Jadwal Kerja", icon: CalendarIcon },
  { name: "Karyawan", icon: UserGroupIcon },
  { name: "Pengaturan", icon: Cog6ToothIcon },
];

export default function Sidebar({ activeTab, setActiveTab }) {
  return (
    <aside className="w-64 bg-white shadow-lg p-4 flex flex-col h-screen">
      <div className="text-2xl font-bold text-blue-600 mb-8">TimeCycle</div>
      <nav className="flex-1 space-y-2">
        {navItems.map((item) => (
          <div
            key={item.name}
            onClick={() => setActiveTab(item.name)}
            className={`flex items-center p-3 rounded-lg cursor-pointer hover:bg-blue-100 transition-colors ${
              activeTab === item.name
                ? "bg-blue-100 text-blue-600 font-semibold"
                : "text-gray-700"
            }`}
          >
            <item.icon className="w-6 h-6 mr-3" />
            <span>{item.name}</span>
            {item.badge && (
              <span className="ml-auto text-xs bg-red-500 text-white rounded-full px-2">
                {item.badge}
              </span>
            )}
          </div>
        ))}
      </nav>
      <div className="mt-auto pt-6 border-t border-gray-200">
        <span>
          Created with ❤️ TimeCycle
        </span>
      </div>
    </aside>
  );
}
