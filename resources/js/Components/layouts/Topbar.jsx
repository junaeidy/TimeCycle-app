import { useEffect, useRef, useState } from "react";
import { BellIcon, MagnifyingGlassIcon } from "@heroicons/react/24/outline";
import { Transition } from "@headlessui/react";
import Dropdown from "@/Components/UI/Dropdown";
import { usePage } from "@inertiajs/react";

const dummyNotifications = [
  { id: 1, message: "Karyawan A melakukan check-in", time: "2 menit lalu" },
  { id: 2, message: "Karyawan B mengajukan izin", time: "10 menit lalu" },
  { id: 3, message: "Laporan absensi tersedia", time: "1 jam lalu" },
];

export default function Topbar() {
  const user = usePage().props.auth.user;
  const [showNotif, setShowNotif] = useState(false);
  const notifRef = useRef();

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (notifRef.current && !notifRef.current.contains(event.target)) {
        setShowNotif(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  return (
    <div className="flex items-center justify-between bg-white p-4 shadow-sm sticky top-0 z-10">
      {/* Search */}
      <div className="relative w-full max-w-md">
        <input
          type="text"
          placeholder="Search"
          className="w-full pl-10 pr-4 py-2 rounded-lg border border-gray-200 focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
        <MagnifyingGlassIcon className="w-5 h-5 text-gray-400 absolute left-3 top-2.5" />
      </div>

      {/* Right: Notification + Profile */}
      <div className="flex items-center space-x-4 ms-4 relative">
        {/* Notification */}
        <div className="relative" ref={notifRef}>
          <button onClick={() => setShowNotif((prev) => !prev)}>
            <BellIcon className="w-6 h-6 text-gray-600" />
            <span className="absolute -top-1 -right-1 bg-red-500 text-white text-xs w-4 h-4 rounded-full flex items-center justify-center">
              {dummyNotifications.length}
            </span>
          </button>

          <Transition
            show={showNotif}
            enter="transition ease-out duration-200"
            enterFrom="opacity-0 -translate-y-2 scale-95"
            enterTo="opacity-100 translate-y-0 scale-100"
            leave="transition ease-in duration-150"
            leaveFrom="opacity-100 translate-y-0 scale-100"
            leaveTo="opacity-0 -translate-y-2 scale-95"
          >
            <div className="absolute right-0 mt-2 w-80 bg-white shadow-lg rounded-md border z-50">
              <div className="p-2 text-sm font-semibold border-b">Notifikasi</div>
              {dummyNotifications.map((notif) => (
                <div key={notif.id} className="p-3 hover:bg-gray-100 cursor-pointer">
                  <div className="text-gray-800">{notif.message}</div>
                  <div className="text-xs text-gray-500">{notif.time}</div>
                </div>
              ))}
              <div className="text-center p-2 text-sm text-blue-600 hover:underline cursor-pointer border-t">
                Lihat semua
              </div>
            </div>
          </Transition>
        </div>

        {/* Profile */}
        <Dropdown>
          <Dropdown.Trigger>
            <button className="inline-flex items-center rounded-full focus:outline-none">
              <img
        src={
          user.profile_photo_path
            ? `/storage/${user.profile_photo_path}`
            : `https://ui-avatars.com/api/?name=${encodeURIComponent(user.name)}`
        }
        alt="User"
        className="w-8 h-8 rounded-full object-cover"
      />
              <svg
                className="ms-2 h-4 w-4 text-gray-500"
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 20 20"
                fill="currentColor"
              >
                <path
                  fillRule="evenodd"
                  d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z"
                  clipRule="evenodd"
                />
              </svg>
            </button>
          </Dropdown.Trigger>
          <Dropdown.Content>
            <Dropdown.Link href={route("profile.edit")}>Profile</Dropdown.Link>
            <Dropdown.Link href={route("logout")} method="post" as="button">
              Log Out
            </Dropdown.Link>
          </Dropdown.Content>
        </Dropdown>
      </div>
    </div>
  );
}