import React, { useState } from 'react'
import Sidebar from '@/Components/layouts/Sidebar';
import Topbar from '@/Components/layouts/Topbar';
import { Head } from '@inertiajs/react';
import EmployeeList from './EmployeeList';

const Index = () => {
    const [activeTab, setActiveTab] = useState("Karyawan");
  return (
    <div className="flex h-screen bg-gray-100 dark:bg-gray-900">
  <Head title="Managemen Karyawan" />
  
  {/* Sidebar with fixed width */}
  <div className="w-64">
    <Sidebar activeTab={activeTab} setActiveTab={setActiveTab} />
  </div>
  
  {/* Main content takes the rest */}
  <div className="flex-1 flex flex-col overflow-hidden">
    <Topbar />
    <main className="flex-1 p-8 overflow-y-auto">
      <h1 className="text-2xl font-bold mb-6 text-gray-800 dark:text-white">
        Managemen Karyawan
      </h1>
      <EmployeeList />
    </main>
  </div>
</div>

  )
}

export default Index