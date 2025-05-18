import {
  PieChart,
  Pie,
  Cell,
  ResponsiveContainer,
  Tooltip,
} from "recharts";

const data = [
  { name: "Hadir", value: 53 },
  { name: "Izin", value: 7 },
  { name: "Tidak Hadir", value: 5 },
];

const COLORS = ["#10B981", "#FACC15", "#EF4444"];

export default function AnalyticsChart() {
  const total = data.reduce((acc, item) => acc + item.value, 0);
  const hadirValue = data.find((item) => item.name === "Hadir")?.value || 0;
  const hadirPercent = Math.round((hadirValue / total) * 100);

  return (
    <div className="bg-white dark:bg-gray-800 p-6 rounded-xl shadow w-full">
      <h2 className="text-lg font-semibold mb-4 text-gray-800 dark:text-white">
        Distribusi Status Absensi
      </h2>
      <div className="flex justify-center items-center relative">
        <ResponsiveContainer width={180} height={180}>
          <PieChart>
            <Pie
              data={data}
              cx="50%"
              cy="50%"
              innerRadius={50}
              outerRadius={70}
              paddingAngle={3}
              dataKey="value"
            >
              {data.map((entry, index) => (
                <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
              ))}
            </Pie>
            <Tooltip formatter={(value, name) => [`${value} Orang`, name]} />
          </PieChart>
        </ResponsiveContainer>
        <div className="absolute text-center">
          <div className="text-2xl font-bold text-gray-800 dark:text-white">
            {hadirPercent}%
          </div>
          <div className="text-sm text-gray-500 dark:text-gray-400">Hadir</div>
        </div>
      </div>
    </div>
  );
}