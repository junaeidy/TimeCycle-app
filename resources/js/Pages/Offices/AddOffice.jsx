import React, { useState, useEffect } from "react";
import {
    MapContainer,
    TileLayer,
    Marker,
    Circle,
    useMapEvents,
    useMap,
} from "react-leaflet";
import L from "leaflet";
import "leaflet/dist/leaflet.css";
import TextInput from "@/Components/UI/TextInput";
import PrimaryButton from "@/Components/UI/PrimaryButton";
import { toast } from "react-hot-toast";
import axios from "axios";

delete L.Icon.Default.prototype._getIconUrl;
L.Icon.Default.mergeOptions({
    iconUrl: "https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon.png",
    iconRetinaUrl:
        "https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon-2x.png",
    shadowUrl: "https://unpkg.com/leaflet@1.9.4/dist/images/marker-shadow.png",
});

function LocationPicker({ setPosition }) {
    useMapEvents({
        click(e) {
            setPosition([e.latlng.lat, e.latlng.lng]);
        },
    });
    return null;
}

function MapRefresher() {
    const map = useMap();
    useEffect(() => {
        setTimeout(() => map.invalidateSize(), 300);
    }, [map]);
    return null;
}

export default function AddOffice({
    mode = "add",
    initialData = {},
    onSubmit,
    onCancel,
}) {
    const [locationName, setLocationName] = useState(
        initialData?.location_name || ""
    );
    const [position, setPosition] = useState(
        initialData.latitude && initialData.longitude
            ? [initialData.latitude, initialData.longitude]
            : null
    );
    const [radius, setRadius] = useState(initialData.radius_meter || 80);
    const [isLoading, setIsLoading] = useState(mode === "add");
    const [geoError, setGeoError] = useState(false);
    const [isSubmitting, setIsSubmitting] = useState(false);

    useEffect(() => {
        if (mode === "add" && navigator.geolocation) {
            navigator.geolocation.getCurrentPosition(
                (pos) => {
                    setPosition([pos.coords.latitude, pos.coords.longitude]);
                    setIsLoading(false);
                },
                (err) => {
                    console.error("Gagal mengambil lokasi perangkat:", err);
                    setIsLoading(false);
                    setGeoError(true);
                }
            );
        } else {
            setIsLoading(false);
        }
    }, [mode]);

    const handleSubmit = (e) => {
        e.preventDefault();
        if (!position) return;

        const data = {
            location_name: locationName,
            latitude: position[0],
            longitude: position[1],
            radius_meter: Number(radius),
        };

        onSubmit?.(data);
    };

    return (
        <form onSubmit={handleSubmit} className="space-y-6 p-6">
            <div>
                <h2 className="text-xl font-semibold text-gray-800">
                    {mode === "add" ? "Tambah Kantor Baru" : "Edit Kantor"}
                </h2>
            </div>

            <TextInput
                label="Nama Kantor"
                value={locationName}
                onChange={(e) => setLocationName(e.target.value)}
                isRequired
                placeholder="Contoh: Kantor Surabaya"
            />

            <div className="grid grid-cols-2 gap-4">
                <TextInput
                    label="Latitude"
                    value={position?.[0] || ""}
                    readOnly
                />
                <TextInput
                    label="Longitude"
                    value={position?.[1] || ""}
                    readOnly
                />
            </div>

            <TextInput
                label="Radius (meter)"
                type="number"
                min={1}
                value={radius}
                onChange={(e) => setRadius(e.target.value)}
                isRequired
            />

            <div>
                <label className="block font-medium text-gray-700 mb-2">
                    Lokasi Kantor (Map)
                </label>
                <div className="rounded-lg overflow-hidden shadow border border-gray-200 h-64">
                    {isLoading ? (
                        <div className="flex justify-center items-center h-full text-gray-500 animate-pulse">
                            Memuat lokasi perangkat...
                        </div>
                    ) : geoError ? (
                        <div className="flex justify-center items-center h-full text-red-600 text-sm text-center px-4">
                            Gagal mendapatkan lokasi perangkat. Pastikan izin
                            lokasi aktif di browser Anda.
                        </div>
                    ) : (
                        <MapContainer
                            center={position}
                            zoom={16}
                            scrollWheelZoom={true}
                            className="h-full w-full"
                        >
                            <MapRefresher />
                            <TileLayer
                                attribution='&copy; <a href="https://www.openstreetmap.org/">OpenStreetMap</a> contributors'
                                url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                            />
                            {mode === "add" && (
                                <LocationPicker setPosition={setPosition} />
                            )}
                            <Marker position={position} />
                            <Circle center={position} radius={Number(radius)} />
                        </MapContainer>
                    )}
                </div>
            </div>

            <div className="pt-4 flex justify-end space-x-3">
                <button
                    type="button"
                    onClick={onCancel}
                    className="px-4 py-2 rounded border border-gray-300 text-gray-600 hover:bg-gray-100 text-sm"
                >
                    Batal
                </button>
                <PrimaryButton
                    type="submit"
                    disabled={!position || isSubmitting}
                >
                    {isSubmitting
                        ? "Menyimpan..."
                        : mode === "add"
                        ? "Simpan Kantor"
                        : "Update Kantor"}
                </PrimaryButton>
            </div>
        </form>
    );
}
