import TextInput from "@/Components/UI/TextInput";
import PrimaryButton from "@/Components/UI/PrimaryButton";
import { Input } from "@heroui/react";
import RoleDropdown from "./RoleDropdown";
import PhotoPreview from "./PhotoPreview";
import useEditEmployee from "@/hooks/useEditEmployee";

const EditEmployee = ({ employee, onSubmit, onCancel }) => {
    const {
        form,
        errors,
        handleChange,
        handleFileChange,
        handleSubmit,
        loading,
        roles,
        selectedValue,
        selectedKeys,
        setSelectedKeys,
        previewPhoto,
        setPreviewPhoto,
        setProfilePhotoFile,
        setRemovePhoto,
    } = useEditEmployee(employee, onSubmit, onCancel);

    if (!employee) return null;

    return (
        <form
            onSubmit={handleSubmit}
            className="space-y-6 bg-white p-6 rounded-2xl shadow-md max-w-2xl mx-auto"
        >
            <h2 className="text-xl font-semibold text-gray-800 mb-4">
                Edit Data Karyawan
            </h2>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
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
                />
                <TextInput
                    label="Alamat"
                    name="address"
                    value={form.address}
                    onChange={handleChange}
                />
                <TextInput
                    label="Posisi"
                    name="position"
                    value={form.position}
                    onChange={handleChange}
                />
                <RoleDropdown
                    roles={roles}
                    selectedValue={selectedValue}
                    selectedKeys={selectedKeys}
                    setSelectedKeys={setSelectedKeys}
                    error={errors.role_id}
                />
            </div>

            <div>
                <label className="block font-medium text-sm text-gray-700 mb-1">
                    Foto Profil
                </label>
                <PhotoPreview
                    previewPhoto={previewPhoto}
                    onRemove={() => {
                        setPreviewPhoto(null);
                        setProfilePhotoFile(null);
                        setRemovePhoto(true);
                    }}
                />
                <Input
                    type="file"
                    accept="image/*"
                    onChange={handleFileChange}
                    className="mt-2"
                />
            </div>

            <div className="flex justify-end gap-3 pt-4">
                <button
                    type="button"
                    onClick={onCancel}
                    className="border border-gray-300 text-gray-700 px-4 py-2 rounded-md hover:bg-gray-100 transition"
                >
                    Batal
                </button>
                <PrimaryButton type="submit" disabled={loading}>
                    {loading ? "Menyimpan..." : "Simpan Perubahan"}
                </PrimaryButton>
            </div>
        </form>
    );
};

export default EditEmployee;
