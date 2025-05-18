import { useEffect, useRef, useState } from "react";
import { useForm } from "@inertiajs/react";
import { Card, CardBody, Input } from "@heroui/react";
import { toast } from "react-hot-toast";
import { XMarkIcon } from "@heroicons/react/24/solid";

import TextInput from "./UI/TextInput";
import InputError from "./UI/InputError";
import PrimaryButton from "./UI/PrimaryButton";

export default function AppSettingsForm({ setting }) {
    const fileInputRef = useRef();

    // Form State
    const { data, setData, post, processing, errors } = useForm({
        app_name: setting?.data?.app_name || "",
        app_logo: null,
        remove_logo: false,
    });

    // Preview logo state
    const [preview, setPreview] = useState(setting?.data?.app_logo_url || null);

    useEffect(() => {
        if (setting?.data) {
            setData((prev) => ({
                ...prev,
                app_name: setting.data.app_name || "",
                // Jangan reset app_logo dan remove_logo karena kita gak mau override saat edit
            }));
            setPreview(setting.data.app_logo_url || null);
        }
    }, [setting]);

    const handleLogoChange = (e) => {
        const file = e.target.files[0];
        if (!file) return;
        // Contoh validasi ukuran max 2MB
        if (file.size > 2 * 1024 * 1024) {
            toast.error("Ukuran file maksimal 2MB");
            e.target.value = "";
            return;
        }

        setData("app_logo", file);
        setData("remove_logo", false);
        setPreview(URL.createObjectURL(file));
    };

    const handleRemoveLogo = () => {
        setData("app_logo", null);
        setData("remove_logo", true);
        setPreview(null);
        if (fileInputRef.current) {
            fileInputRef.current.value = "";
        }
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        post(route("app-setting.update"), {
            onSuccess: () => toast.success("Data berhasil disimpan!"),
            onError: () => toast.error("Terjadi kesalahan saat menyimpan!"),
        });
    };

    return (
        <Card className="w-[550px]">
            <CardBody>
                <form onSubmit={handleSubmit} className="space-y-6 w-[500px]">
                    {/* Nama Aplikasi */}
                    <div>
                        <label
                            htmlFor="app_name"
                            className="block font-medium text-sm text-gray-700 dark:text-gray-300"
                        >
                            Nama Aplikasi
                        </label>
                        <TextInput
                            id="app_name"
                            value={data.app_name}
                            onChange={(e) =>
                                setData("app_name", e.target.value)
                            }
                            className={`mt-1 block w-full ${
                                errors.app_name ? "border-red-500" : ""
                            }`}
                            disabled={processing}
                            placeholder="Masukkan nama aplikasi"
                        />
                        <InputError
                            message={errors.app_name}
                            className="mt-1"
                        />
                    </div>

                    {/* Logo Aplikasi */}
                    <div>
                        <label className="block font-medium text-sm text-gray-700 dark:text-gray-300">
                            Logo Aplikasi
                        </label>

                        {preview ? (
                            <div
                                className="relative inline-block mt-4 cursor-pointer"
                                onClick={() => fileInputRef.current.click()}
                            >
                                <img
                                    src={preview}
                                    alt="Preview Logo"
                                    className="h-20 max-w-xs border rounded shadow object-contain"
                                    title="Klik untuk ganti logo"
                                />
                                <button
                                    type="button"
                                    onClick={(e) => {
                                        e.stopPropagation();
                                        handleRemoveLogo();
                                    }}
                                    className="absolute -top-2 -right-2 bg-white rounded-full shadow p-1 hover:bg-gray-100 transition"
                                    title="Hapus logo"
                                    disabled={processing}
                                >
                                    <XMarkIcon className="h-4 w-4 text-gray-600" />
                                </button>
                            </div>
                        ) : (
                            <div className="mt-4 text-gray-500 italic text-sm">
                                Belum ada logo
                            </div>
                        )}

                        <Input
                            type="file"
                            accept="image/*"
                            onChange={handleLogoChange}
                            ref={fileInputRef}
                            className="mt-2"
                            disabled={processing}
                            aria-describedby="logoHelp"
                        />
                        <div
                            id="logoHelp"
                            className="text-xs text-gray-400 mt-1"
                        >
                            Maksimal 2MB, format gambar (png, jpg, jpeg)
                        </div>
                        <InputError
                            message={errors.app_logo}
                            className="mt-1"
                        />
                    </div>

                    {/* Submit */}
                    <PrimaryButton
                        type="submit"
                        loading={processing}
                        disabled={processing}
                    >
                        Simpan
                    </PrimaryButton>
                </form>
            </CardBody>
        </Card>
    );
}