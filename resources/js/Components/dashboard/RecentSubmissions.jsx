const submissions = [
  { id: "#IZ001", name: "Budi Hartono", type: "Izin", date: "2025-05-17", status: "Diproses", icon: "📄" },
  { id: "#CU002", name: "Sari Lestari", type: "Cuti", date: "2025-05-16", status: "Disetujui", icon: "🌴" },
  { id: "#LE003", name: "Andi Saputra", type: "Lembur", date: "2025-05-15", status: "Ditolak", icon: "💼" },
  { id: "#CU004", name: "Dewi Rahma", type: "Cuti", date: "2025-05-14", status: "Diproses", icon: "🌴" },
];

export default function RecentSubmissions() {
  return (
    <div className="bg-white dark:bg-gray-800 p-6 rounded-xl shadow w-full">
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-lg font-semibold text-gray-800 dark:text-white">Pengajuan Terbaru</h2>
        <input
          type="text"
          placeholder="Cari karyawan..."
          className="border rounded-lg px-3 py-1 text-sm dark:bg-gray-700 dark:text-white"
        />
      </div>
      <table className="w-full text-sm text-left">
        <thead className="text-gray-400 border-b dark:text-gray-300">
          <tr>
            <th></th>
            <th>ID</th>
            <th>Nama</th>
            <th>Jenis</th>
            <th>Tanggal</th>
            <th>Status</th>
          </tr>
        </thead>
        <tbody>
          {submissions.map((item, index) => (
            <tr key={item.id} className={`border-b dark:border-gray-700 ${index % 2 === 1 ? "bg-gray-50 dark:bg-gray-700" : ""}`}>
              <td>
                <input type="checkbox" />
              </td>
              <td className="py-2">{item.id}</td>
              <td className="flex items-center py-2">
                <span className="text-xl mr-2">{item.icon}</span> {item.name}
              </td>
              <td>{item.type}</td>
              <td>{item.date}</td>
              <td>
                <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                  item.status === "Disetujui" ? "bg-green-100 text-green-600" :
                  item.status === "Ditolak" ? "bg-red-100 text-red-600" :
                  "bg-yellow-100 text-yellow-600"
                }`}>
                  {item.status}
                </span>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      <div className="flex justify-between items-center mt-4 text-sm text-gray-500 dark:text-gray-300">
        <span>1-4 dari 12</span>
        <div className="flex space-x-2">
          {[1, 2, 3].map((p) => (
            <button
              key={p}
              className={`w-7 h-7 flex items-center justify-center rounded-full ${
                p === 1 ? "bg-blue-600 text-white" : "bg-gray-200 dark:bg-gray-600"
              }`}
            >
              {p}
            </button>
          ))}
          <span className="cursor-pointer">&rsaquo;</span>
        </div>
      </div>
    </div>
  );
}
