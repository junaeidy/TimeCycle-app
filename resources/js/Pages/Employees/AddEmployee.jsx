import React, { useEffect, useState } from "react";
import axios from "axios";
import TextInput from "@/Components/UI/TextInput";
import PrimaryButton from "@/Components/UI/PrimaryButton";
import SecondaryButton from "@/Components/UI/SecondaryButton";
import InputError from "@/Components/UI/InputError";
import { Input, Select, SelectItem } from "@heroui/react";
import { EyeIcon, EyeSlashIcon } from "@heroicons/react/24/outline";
import { toast } from "react-hot-toast";

const initialForm = {
    name: "",
    nik: "",
    date_of_birth: "",
    gender: "",
    email: "",
    phone: "",
    address: "",
    role_id: "",
    place_of_birth: "",
    password: "",
    password_confirmation: "",
};

const AddEmployeeForm = ({ onSubmit, onCancel }) => {
    const [step, setStep] = useState(1);
    const [form, setForm] = useState(initialForm);
    const [errors, setErrors] = useState({});
    const [roles, setRoles] = useState([]);
    const [loadingRoles, setLoadingRoles] = useState(true);
    const [fetchError, setFetchError] = useState(null);
    const [photo, setPhoto] = useState(null);
    const [position, setPosition] = useState("");
    const [showPassword, setShowPassword] = useState(false);
    const [showPasswordConfirmation, setShowPasswordConfirmation] =
        useState(false);

    const genderOptions = [
        { uid: "male", label: "Laki-laki" },
        { uid: "female", label: "Perempuan" },
        { uid: "other", label: "Lainnya" },
    ];

    useEffect(() => {
        const fetchRoles = async () => {
            try {
                const response = await axios.get("/api/roles");
                setRoles(response.data);
                setFetchError(null);
            } catch (error) {
                setFetchError("Gagal memuat role");
            } finally {
                setLoadingRoles(false);
            }
        };

        fetchRoles();
    }, []);

    const validateStep = () => {
        const newErrors = {};
        if (step === 1) {
            if (!form.name) newErrors.name = "Nama wajib diisi";
            if (!form.nik) newErrors.nik = "NIK wajib diisi";
            if (!form.place_of_birth)
                newErrors.place_of_birth = "Tempat lahir wajib diisi";
            if (!form.date_of_birth)
                newErrors.date_of_birth = "Tanggal lahir wajib diisi";
            if (!form.gender) newErrors.gender = "Jenis kelamin wajib diisi";
        } else if (step === 2) {
            if (!form.email) newErrors.email = "Email wajib diisi";
            if (!form.phone) newErrors.phone = "Nomor HP wajib diisi";
            if (!form.address) newErrors.address = "Alamat wajib diisi";
        } else if (step === 3) {
            if (!form.role_id) newErrors.role_id = "Role wajib dipilih";
            if (!form.password) newErrors.password = "Password wajib diisi";
            if (!form.password_confirmation)
                newErrors.password_confirmation =
                    "Konfirmasi password wajib diisi";
            if (form.password !== form.password_confirmation) {
                newErrors.password_confirmation = "Konfirmasi tidak cocok";
            }
        }

        setErrors(newErrors);
        return Object.keys(newErrors).length === 0;
    };

    const handleNext = () => {
        if (validateStep()) setStep((prev) => prev + 1);
    };

    const handlePrev = () => setStep((prev) => prev - 1);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setForm((prev) => ({ ...prev, [name]: value }));
    };

    const handleGenderChange = (selectedKeys) => {
        setForm((prev) => ({ ...prev, gender: Array.from(selectedKeys)[0] }));
    };

    const handleRoleChange = (selectedKeys) => {
        setForm((prev) => ({ ...prev, role_id: Array.from(selectedKeys)[0] }));
    };

    const handleFinish = async () => {
    if (!validateStep()) return;

    const data = {
        ...form,
        role_id: parseInt(form.role_id),
        position,
        photo,
    };

    const result = await onSubmit(data);

    if (result?.success) {
        setForm(initialForm);
        setPosition("");
        setPhoto(null);
        setStep(1);
        onCancel();
    } else {
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
                        isRequired
                    />
                    <InputError message={errors.name} />

                    <TextInput
                        label="NIK"
                        name="nik"
                        value={form.nik}
                        onChange={handleChange}
                        type="number"
                        isRequired
                    />
                    <InputError message={errors.nik} />

                    <TextInput
                        label="Tempat Lahir"
                        name="place_of_birth"
                        value={form.place_of_birth}
                        onChange={handleChange}
                        isRequired
                    />
                    <InputError message={errors.place_of_birth} />

                    <TextInput
                        label="Tanggal Lahir"
                        name="date_of_birth"
                        value={form.date_of_birth}
                        onChange={handleChange}
                        type="date"
                        isRequired
                    />
                    <InputError message={errors.date_of_birth} />

                    <Select
                        items={genderOptions}
                        label="Jenis Kelamin"
                        placeholder="Pilih jenis kelamin"
                        selectedKey={form.gender}
                        onSelectionChange={handleGenderChange}
                    >
                        {(gender) => (
                            <SelectItem key={gender.uid}>
                                {gender.label}
                            </SelectItem>
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
                        isRequired
                    />
                    <InputError message={errors.email} />

                    <TextInput
                        label="Nomor Telepon"
                        name="phone"
                        value={form.phone}
                        onChange={handleChange}
                        isRequired
                    />
                    <InputError message={errors.phone} />

                    <TextInput
                        label="Alamat"
                        name="address"
                        value={form.address}
                        onChange={handleChange}
                        isRequired
                    />
                    <InputError message={errors.address} />

                    <TextInput
                        label="Posisi"
                        name="position"
                        value={position}
                        onChange={(e) => setPosition(e.target.value)}
                    />
                </div>
            )}

            {step === 3 && (
                <div className="space-y-4">
                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">
                            Foto Karyawan (Opsional)
                        </label>
                        {photo && (
                            <div className="mb-2">
                                <img
                                    src={URL.createObjectURL(photo)}
                                    alt="Preview"
                                    className="h-24 w-24 object-cover rounded"
                                />
                                <button
                                    type="button"
                                    className="text-xs text-red-500 hover:underline mt-1"
                                    onClick={() => setPhoto(null)}
                                >
                                    Hapus Foto
                                </button>
                            </div>
                        )}
                        <Input
                            type="file"
                            accept="image/*"
                            onChange={(e) => setPhoto(e.target.files[0])}
                        />
                    </div>

                    {loadingRoles ? (
                        <p className="text-sm text-gray-500">Memuat role...</p>
                    ) : fetchError ? (
                        <p className="text-sm text-red-500">{fetchError}</p>
                    ) : (
                        <Select
                            items={roles}
                            label="Role"
                            placeholder="Pilih role"
                            selectedKey={form.role_id}
                            onSelectionChange={handleRoleChange}
                        >
                            {(role) => (
                                <SelectItem key={role.id}>
                                    {role.role_name}
                                </SelectItem>
                            )}
                        </Select>
                    )}
                    <InputError message={errors.role_id} />

                    {/* Password input */}
                    <div className="relative">
                        <TextInput
                            label="Password"
                            name="password"
                            type={showPassword ? "text" : "password"}
                            value={form.password}
                            onChange={handleChange}
                            isRequired
                        />
                        <button
                            type="button"
                            className="absolute right-3 top-9 text-gray-500"
                            onClick={() => setShowPassword((prev) => !prev)}
                        >
                            {showPassword ? (
                                <EyeSlashIcon className="w-5 h-5" />
                            ) : (
                                <EyeIcon className="w-5 h-5" />
                            )}
                        </button>
                        <InputError message={errors.password} />
                    </div>

                    {/* Confirm password */}
                    <div className="relative">
                        <TextInput
                            label="Konfirmasi Password"
                            name="password_confirmation"
                            type={
                                showPasswordConfirmation ? "text" : "password"
                            }
                            value={form.password_confirmation}
                            onChange={handleChange}
                            isRequired
                        />
                        <button
                            type="button"
                            className="absolute right-3 top-9 text-gray-500"
                            onClick={() =>
                                setShowPasswordConfirmation((prev) => !prev)
                            }
                        >
                            {showPasswordConfirmation ? (
                                <EyeSlashIcon className="w-5 h-5" />
                            ) : (
                                <EyeIcon className="w-5 h-5" />
                            )}
                        </button>
                        <InputError message={errors.password_confirmation} />
                    </div>
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
                        <SecondaryButton onClick={onCancel}>
                            Batal
                        </SecondaryButton>
                    )}
                    {step < 3 ? (
                        <PrimaryButton onClick={handleNext}>
                            Lanjut
                        </PrimaryButton>
                    ) : (
                        <PrimaryButton onClick={handleFinish}>
                            Simpan
                        </PrimaryButton>
                    )}
                </div>
            </div>
        </div>
    );
};

export default AddEmployeeForm;