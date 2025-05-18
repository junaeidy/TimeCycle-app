import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from "recharts";

const data = [
  { time: "08:00", hadir: 5 },
  { time: "09:00", hadir: 18 },
  { time: "10:00", hadir: 35 },
  { time: "11:00", hadir: 42 },
  { time: "12:00", hadir: 47 },
  { time: "13:00", hadir: 50 },
  { time: "14:00", hadir: 52 },
  { time: "15:00", hadir: 53 },
  { time: "16:00", hadir: 53 },
  { time: "17:00", hadir: 53 },
];

export default function ReportsChart() {
  return (
    <div className="bg-white dark:bg-gray-800 p-6 rounded-xl shadow w-full">
      <h2 className="text-lg font-semibold mb-4 text-gray-800 dark:text-white">
        Riwayat Kehadiran Harian
      </h2>
      <ResponsiveContainer width="100%" height={240}>
        <LineChart data={data}>
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="time" />
          <YAxis label={{ value: 'Jumlah Hadir', angle: -90, position: 'insideLeft' }} />
          <Tooltip formatter={(value) => [`${value} Karyawan`, 'Jumlah']} />
          <Line
            type="monotone"
            dataKey="hadir"
            stroke="#4f46e5"
            strokeWidth={2}
            activeDot={{ r: 6 }}
          />
        </LineChart>
      </ResponsiveContainer>
    </div>
  );
}
