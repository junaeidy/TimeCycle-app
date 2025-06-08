import { useEffect, useState } from "react";
import axios from "axios";
import Modal from "./../UI/Modal";
import TextInput from "../UI/TextInput";
import PrimaryButton from "../UI/PrimaryButton";
import SecondaryButton from "../UI/SecondaryButton";
import { Textarea } from "@heroui/react";
import toast from "react-hot-toast";

export default function DivisionForm({
    show,
    onClose,
    division = null,
    onSuccess,
}) {
    const isEdit = !!division;

    const [form, setForm] = useState({
        division_name: "",
        description: "",
    });

    const [errors, setErrors] = useState({});

    useEffect(() => {
        if (isEdit) {
            setForm({
                division_name: division.division_name || "",
                description: division.description || "",
            });
        } else {
            setForm({
                division_name: "",
                description: "",
            });
        }
        setErrors({});
    }, [division, show]);

    const handleChange = (e) => {
        setForm({ ...form, [e.target.name]: e.target.value });
    };

    const handleSubmit = async () => {
        try {
            if (isEdit) {
                await axios.put(`/api/divisions/${division.id}`, form);
                toast.success("Divisi berhasil diperbarui.");
                onSuccess();
            } else {
                await axios.post("/api/divisions", form);
                toast.success("Divisi berhasil ditambahkan.");
                onSuccess();
            }
            onClose();
        } catch (error) {
            if (error.response?.status === 422) {
                setErrors(error.response.data.errors);
            }
        }
    };

    return (
        <Modal show={show} onClose={onClose} maxWidth="md">
            <div className="p-6">
                <h2 className="text-lg font-semibold mb-4">
                    {isEdit ? "Edit Divisi" : "Tambah Divisi"}
                </h2>

                <div className="space-y-4">
                    <div>
                        <label className="block text-sm font-medium text-gray-700 dark:text-gray-200">
                            Nama Divisi
                        </label>
                        <TextInput
                            type="text"
                            name="division_name"
                            value={form.division_name}
                            onChange={handleChange}
                            className="mt-1 block w-full rounded border-gray-300 shadow-sm dark:bg-gray-700 dark:text-white"
                        />
                        {errors.division_name && (
                            <p className="text-sm text-red-500 mt-1">
                                {errors.division_name[0]}
                            </p>
                        )}
                    </div>

                    <div>
                        <label className="block text-sm font-medium text-gray-700 dark:text-gray-200">
                            Deskripsi
                        </label>
                        <Textarea
                            name="description"
                            value={form.description}
                            onChange={handleChange}
                            className="mt-1 block w-full rounded border-gray-300 shadow-sm dark:bg-gray-700 dark:text-white"
                        />
                    </div>
                </div>

                <div className="mt-6 flex justify-end space-x-2">
                    <SecondaryButton
                        onClick={onClose}
                        className="px-4 py-2 rounded bg-gray-200 hover:bg-gray-300 dark:bg-gray-600 dark:text-white dark:hover:bg-gray-500"
                    >
                        Batal
                    </SecondaryButton>
                    <PrimaryButton
                        onClick={handleSubmit}
                        className="px-4 py-2 rounded bg-blue-600 text-white hover:bg-blue-700"
                    >
                        {isEdit ? "Simpan" : "Tambah"}
                    </PrimaryButton>
                </div>
            </div>
        </Modal>
    );
}
