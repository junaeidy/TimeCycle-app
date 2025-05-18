import AppSettingsForm from "@/Components/AppSettingsForm";
import Topbar from "@/Components/layouts/Topbar";
import Sidebar from "@/Components/layouts/Sidebar";
import { useState } from "react";

export default function AppSettingPage({ setting }) {
  const [activeTab, setActiveTab] = useState("Pengaturan");

  return (
    <div className="flex">
      <Sidebar activeTab={activeTab} setActiveTab={setActiveTab} />
      <div className="flex-1 flex flex-col min-h-screen bg-gray-50 dark:bg-gray-900">
        <Topbar />
        <main className="flex-1 p-8">
          <h1 className="text-2xl font-bold mb-6 text-gray-800 dark:text-white">
            Pengaturan Aplikasi
          </h1>
          <AppSettingsForm setting={setting} />
        </main>
      </div>
    </div>
  );
}