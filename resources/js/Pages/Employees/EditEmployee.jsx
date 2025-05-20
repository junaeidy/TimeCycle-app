import { useEffect, useState } from "react";
import { toast } from "react-hot-toast";
import { Select, SelectItem } from "@heroui/react";
import TextInput from "@/Components/UI/TextInput";
import PrimaryButton from "@/Components/UI/PrimaryButton";

const EditEmployee = ({ employee, onSubmit, onCancel }) => {
    const [form, setForm] = useState({
        name: "",
        email: "",
        phone: "",
        address: "",
        position: "",
        role_id: "",
    });

    const [errors, setErrors] = useState({});
    const [roles, setRoles] = useState([]);
    const [loading, setLoading] = useState(false);

    const [previewPhoto, setPreviewPhoto] = useState(null);
    const [profilePhotoFile, setProfilePhotoFile] = useState(null);
    const [removePhoto, setRemovePhoto] = useState(false);

    useEffect(() => {
        if (employee) {
            setForm({
                name: employee.name || "",
                email: employee.email || "",
                phone: employee.phone || "",
                address: employee.address || "",
                position: employee.position || "",
                role_id: employee.role_id || "",
            });

            if (employee.profile_photo_path) {
                setPreviewPhoto(`/storage/${employee.profile_photo_path}`);
            }
        }
    }, [employee]);

    useEffect(() => {
        fetchRoles();
    }, []);

    const fetchRoles = async () => {
        try {
            const res = await axios.get("/api/roles");
            setRoles(res.data);
        } catch (error) {
            toast.error("Gagal memuat data peran");
        }
    };

    const handleChange = (e) => {
        setForm({ ...form, [e.target.name]: e.target.value });
    };

    const handleFileChange = (e) => {
        const file = e.target.files[0];
        if (file) {
            setProfilePhotoFile(file);
            setPreviewPhoto(URL.createObjectURL(file));
            setRemovePhoto(false);
        }
    };

    const validate = () => {
        const errs = {};
        if (!form.name) errs.name = "Nama wajib diisi";
        if (!form.email) errs.email = "Email wajib diisi";
        if (!form.role_id) errs.role_id = "Peran wajib dipilih";
        return errs;
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        const errs = validate();
        if (Object.keys(errs).length > 0) {
            setErrors(errs);
            return;
        }

        setLoading(true);
        const formData = new FormData();
        Object.entries(form).forEach(([key, val]) => {
            formData.append(key, val);
        });

        if (profilePhotoFile) {
            formData.append("profile_photo", profilePhotoFile);
        } else if (removePhoto) {
            formData.append("remove_photo", "1");
        }

        try {
            const result = await onSubmit({
                ...form,
                id: employee.id,
                formData,
            });
            if (result?.success) {
                toast.success("Data berhasil diperbarui");
                onCancel();
            }
        } catch (err) {
            toast.error("Gagal menyimpan perubahan");
        } finally {
            setLoading(false);
        }
    };

    if (!employee) return null; 

    return (
        <form onSubmit={handleSubmit} className="space-y-4">
            <TextInput
                label="Nama"
                name="name"
                value={form.name}
                onChange={handleChange}
                error={errors.name}
            />
            <TextInput
                label="Email"
                name="email"
                value={form.email}
                onChange={handleChange}
                error={errors.email}
            />
            <TextInput
                label="Nomor HP"
                name="phone"
                value={form.phone}
                onChange={handleChange}
                error={errors.phone}
            />
            <TextInput
                label="Alamat"
                name="address"
                value={form.address}
                onChange={handleChange}
                error={errors.address}
            />
            <TextInput
                label="Posisi"
                name="position"
                value={form.position}
                onChange={handleChange}
                error={errors.position}
            />

            <div className="max-w-xs">
                <Select
                    label="Peran"
                    value={form.role_id}
                    onChange={(val) => setForm({ ...form, role_id: val })}
                    placeholder="Pilih peran"
                >
                    {roles.map((role) => (
                        <SelectItem key={role.id} value={role.id}>
                            {role.role_name}
                        </SelectItem>
                    ))}
                </Select>
                {errors.role_id && (
                    <div className="text-red-500 text-sm mt-1">
                        {errors.role_id}
                    </div>
                )}
            </div>

            <div>
                <label className="block mb-1 font-medium">Foto Profil</label>
                {previewPhoto && (
                    <div className="mb-2">
                        <img
                            src={previewPhoto}
                            alt="Foto profil"
                            className="w-24 h-24 object-cover rounded"
                        />
                        <button
                            type="button"
                            onClick={() => {
                                setPreviewPhoto(null);
                                setProfilePhotoFile(null);
                                setRemovePhoto(true);
                            }}
                            className="text-red-500 text-sm mt-1"
                        >
                            Hapus Foto
                        </button>
                    </div>
                )}
                <input
                    type="file"
                    accept="image/*"
                    onChange={handleFileChange}
                />
            </div>

            <div className="flex gap-2">
                <PrimaryButton type="submit" disabled={loading}>
                    {loading ? "Menyimpan..." : "Simpan Perubahan"}
                </PrimaryButton>
                <button
                    type="button"
                    onClick={onCancel}
                    className="text-gray-500 border border-gray-300 rounded px-4 py-2"
                >
                    Batal
                </button>
            </div>
        </form>
    );
};

export default EditEmployee;
