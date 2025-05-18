// AddEmployeeForm.jsx
import React, { useState } from "react";
import TextInput from "@/Components/UI/TextInput";
import PrimaryButton from "@/Components/UI/PrimaryButton";
import { Select, SelectItem } from "@heroui/react";
import InputError from "@/Components/UI/InputError"; // import komponen InputError
import SecondaryButton from "@/Components/UI/SecondaryButton";

const initialForm = {
    name: "",
    nik: "",
    birth_date: "",
    gender: "",
    email: "",
    phone: "",
    address: "",
    position: "",
};

const AddEmployeeForm = ({ onSubmit, onCancel }) => {
    const [step, setStep] = useState(1);
    const [form, setForm] = useState(initialForm);
    const [errors, setErrors] = useState({});

    const genderOptions = [
        { uid: "male", label: "Laki-laki" },
        { uid: "female", label: "Perempuan" },
        { uid: "other", label: "Lainnya" },
    ];

    const validateStep = () => {
        const newErrors = {};
        if (step === 1) {
            if (!form.name) newErrors.name = "Nama wajib diisi";
            if (!form.nik) newErrors.nik = "NIK wajib diisi";
            if (!form.birth_date) newErrors.birth_date = "Tanggal lahir wajib diisi";
            if (!form.gender) newErrors.gender = "Jenis kelamin wajib diisi";
             setErrors(newErrors);
  console.log("form:", form);
  console.log("errors:", newErrors);
  return Object.keys(newErrors).length === 0;
        } else if (step === 2) {
            if (!form.email) newErrors.email = "Email wajib diisi";
            if (!form.phone) newErrors.phone = "Nomor HP wajib diisi";
        } else if (step === 3) {
            if (!form.address) newErrors.address = "Alamat wajib diisi";
            if (!form.position) newErrors.position = "Jabatan wajib diisi";
        }

        setErrors(newErrors);
        return Object.keys(newErrors).length === 0;
    };

    const handleNext = () => {
        if (validateStep()) setStep(step + 1);
    };

    const handlePrev = () => setStep(step - 1);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setForm((prev) => ({ ...prev, [name]: value }));
    };

    const onGenderChange = (value) => {
        if (typeof value === "string") {
            setForm((prev) => ({ ...prev, gender: value }));
        } else if (Array.isArray(value)) {
            setForm((prev) => ({ ...prev, gender: value[0] }));
        } else if (value && typeof value === "object") {
            if ("uid" in value) {
                setForm((prev) => ({ ...prev, gender: value.uid }));
            } else {
                setForm((prev) => ({ ...prev, gender: JSON.stringify(value) }));
            }
        }
    };

    const handleFinish = () => {
        if (validateStep()) {
            onSubmit(form);
            setForm(initialForm);
            setStep(1);
        }
    };

    return (
        <div className="p-6">
            <h2 className="text-lg font-semibold mb-4">
                Tambah Karyawan - Langkah {step} dari 3
            </h2>

            {step === 1 && (
                <div className="space-y-4">
                    <TextInput
                        label="Nama Lengkap"
                        name="name"
                        value={form.name}
                        onChange={handleChange}
                        error={errors.name}
                        type="text" 
                    />
                    <InputError message={errors.name} />

                    <TextInput
                        label="NIK"
                        name="nik"
                        value={form.nik}
                        onChange={handleChange}
                        error={errors.nik}
                        type="number"
                        minLength="0"
                        maxLength="16"
                    />
                    <InputError message={errors.nik} />

                    <TextInput
                        type="date"
                        label="Tanggal Lahir"
                        name="birth_date"
                        value={form.birth_date}
                        onChange={handleChange}
                        error={errors.birth_date}
                    />
                    <InputError message={errors.birth_date} />

                    <Select
                        items={genderOptions}
                        label="Jenis Kelamin"
                        placeholder="Pilih jenis kelamin"
                        selectedKey={form.gender}
                        onSelectionChange={onGenderChange}
                    >
                        {(gender) => (
                            <SelectItem key={gender.uid}>{gender.label}</SelectItem>
                        )}
                    </Select>
                    <InputError message={errors.gender} />
                </div>
            )}

            {step === 2 && (
                <div className="space-y-4">
                    <TextInput
                        label="Email"
                        name="email"
                        value={form.email}
                        onChange={handleChange}
                        error={errors.email}
                    />
                    <InputError message={errors.email} />

                    <TextInput
                        label="Nomor Telepon"
                        name="phone"
                        value={form.phone}
                        onChange={handleChange}
                        error={errors.phone}
                    />
                    <InputError message={errors.phone} />
                </div>
            )}

            {step === 3 && (
                <div className="space-y-4">
                    <TextInput
                        label="Alamat"
                        name="address"
                        value={form.address}
                        onChange={handleChange}
                        error={errors.address}
                    />
                    <InputError message={errors.address} />

                    <TextInput
                        label="Jabatan"
                        name="position"
                        value={form.position}
                        onChange={handleChange}
                        error={errors.position}
                    />
                    <InputError message={errors.position} />
                </div>
            )}

            <div className="flex justify-between items-center mt-6">
                {step > 1 && (
                    <button
                        onClick={handlePrev}
                        className="text-sm text-gray-600 hover:underline"
                    >
                        &larr; Kembali
                    </button>
                )}
                <div className="ml-auto flex gap-2">
                    {onCancel && (
                        <SecondaryButton
                            onClick={onCancel}
                        >
                            Batal
                        </SecondaryButton>
                    )}
                    {step < 3 ? (
                        <PrimaryButton onClick={handleNext}>Lanjut</PrimaryButton>
                    ) : (
                        <PrimaryButton onClick={handleFinish}>Simpan</PrimaryButton>
                    )}
                </div>
            </div>
        </div>
    );
};

export default AddEmployeeForm;