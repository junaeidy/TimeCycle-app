import React from 'react';

const mockNotifikasi = [
  { id: 1, pesan: 'Kontrak Andi berakhir dalam 7 hari' },
  { id: 2, pesan: 'Ulang tahun Budi hari ini 🎉' },
  { id: 3, pesan: 'Pengajuan cuti dari Sari menunggu persetujuan' },
];

const NotificationList = () => {
  return (
    <ul className="space-y-3">
      {mockNotifikasi.map((notif) => (
        <li
          key={notif.id}
          className="bg-gray-50 px-4 py-3 rounded-md border border-gray-200 text-sm text-gray-700"
        >
          {notif.pesan}
        </li>
      ))}
    </ul>
  );
};

export default NotificationList;