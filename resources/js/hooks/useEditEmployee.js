import { useEffect, useState } from "react";
import axios from "axios";
import { toast } from "react-hot-toast";

const useEditEmployee = (employee, onSubmit, onCancel) => {
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
    const [selectedKeys, setSelectedKeys] = useState(new Set());

    const selectedValue =
        roles.find((role) => role.id.toString() === form.role_id)?.role_name ||
        "Pilih peran";

    const fetchRoles = async () => {
        try {
            const res = await axios.get("/api/roles");
            setRoles(res.data);
        } catch (error) {
            toast.error("Gagal memuat data peran");
        }
    };

    useEffect(() => {
        fetchRoles();
    }, []);

    useEffect(() => {
        if (employee && roles.length > 0) {
            const updated = {
                name: employee.name ?? "",
                email: employee.email ?? "",
                phone: employee.phone ?? "",
                address: employee.address ?? "",
                position: employee.position ?? "",
                role_id: employee.role_id?.toString() ?? "",
            };

            setForm(updated);
            setSelectedKeys(new Set([employee.role_id?.toString()]));
            if (employee.avatar) setPreviewPhoto(employee.avatar);
        }
    }, [employee, roles]);

    useEffect(() => {
        if (selectedKeys.size > 0) {
            const selectedKey = Array.from(selectedKeys)[0];
            setForm((prev) => ({ ...prev, role_id: selectedKey }));
        }
    }, [selectedKeys]);

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
            if (result?.success) onCancel();
        } catch (err) {
            console.error(err);
        } finally {
            setLoading(false);
        }
    };

    return {
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
    };
};

export default useEditEmployee;
