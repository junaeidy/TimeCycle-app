import React from 'react';
import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer } from 'recharts';

const data = [
  { name: 'Sen', hadir: 100, tidak: 5 },
  { name: 'Sel', hadir: 95, tidak: 10 },
  { name: 'Rab', hadir: 98, tidak: 7 },
  { name: 'Kam', hadir: 97, tidak: 8 },
  { name: 'Jum', hadir: 92, tidak: 13 },
];

const ChartAbsensi = () => {
  return (
    <ResponsiveContainer width="100%" height={240}>
      <BarChart data={data} margin={{ top: 10, right: 30, left: 0, bottom: 0 }}>
        <XAxis dataKey="name" />
        <YAxis />
        <Tooltip />
        <Bar dataKey="hadir" fill="#4ade80" name="Hadir" />
        <Bar dataKey="tidak" fill="#f87171" name="Tidak Hadir" />
      </BarChart>
    </ResponsiveContainer>
  );
};

export default ChartAbsensi;