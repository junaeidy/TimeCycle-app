const topEmployees = [
  {
    name: "Budi Hartono",
    attendance: 22,
    rating: 5,
    img: "👨‍💼",
  },
  {
    name: "Sari Lestari",
    attendance: 21,
    rating: 4,
    img: "👩‍💼",
  },
];

export default function TopAttendance() {
  return (
    <div className="bg-white dark:bg-gray-800 p-6 rounded-xl shadow w-full">
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-lg font-semibold text-gray-800 dark:text-white">Karyawan dengan Kehadiran Terbaik</h2>
        <span className="text-gray-400 cursor-pointer">...</span>
      </div>
      {topEmployees.map((employee, index) => (
        <div key={index} className="flex items-center space-x-4 mb-4">
          <div className="w-14 h-14 rounded-xl flex items-center justify-center bg-blue-100 text-2xl">
            {employee.img}
          </div>
          <div>
            <div className="font-medium text-gray-800 dark:text-white">{employee.name}</div>
            <div className="flex text-yellow-400 text-sm">
              {"★".repeat(employee.rating)} {/* Menampilkan rating kehadiran */}
            </div>
            <div className="text-sm font-semibold text-gray-500 dark:text-gray-300">
              Kehadiran: {employee.attendance} hari
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}