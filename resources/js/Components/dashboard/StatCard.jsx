export default function StatCard({ icon, label, value }) {
  return (
    <div className="bg-white p-4 rounded-xl shadow flex items-center space-x-4">
      <div>{icon}</div>
      <div>
        <div className="text-xl font-semibold">{value}</div>
        <div className="text-sm text-gray-500">{label}</div>
      </div>
    </div>
  );
}