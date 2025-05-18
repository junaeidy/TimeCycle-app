import InputError from "@/Components/UI/InputError";
import InputLabel from "@/Components/UI/InputLabel";
import PrimaryButton from "@/Components/UI/PrimaryButton";
import SecondaryButton from "@/Components/UI/SecondaryButton";
import TextInput from "@/Components/UI/TextInput";
import { Transition } from "@headlessui/react";
import { Link, useForm, usePage } from "@inertiajs/react";
import { useRef, useState, useEffect } from "react";
import { toast } from "react-hot-toast";

export default function UpdateProfileInformation({
    mustVerifyEmail,
    status,
    className = "",
}) {
    const user = usePage().props.auth.user;
    const photoInput = useRef();
    const [preview, setPreview] = useState("");
    const [newPhoto, setNewPhoto] = useState(null);
    const deletePhotoForm = useForm({});
    const { data, setData, patch, errors, processing, recentlySuccessful } =
        useForm({
            name: user.name,
            email: user.email,
        });

    useEffect(() => {
        if (user.profile_photo_path) {
            setPreview(`/storage/${user.profile_photo_path}`);
        } else {
            setPreview(
                `https://ui-avatars.com/api/?name=${encodeURIComponent(
                    user.name
                )}`
            );
        }
    }, [user.profile_photo_path, user.name]);

    const photoForm = useForm({
        photo: null,
    });

    const submit = (e) => {
        e.preventDefault();
        patch(route("profile.update"), {
            preserveScroll: true,
            onSuccess: () => {
                toast.success("Profil berhasil diperbarui.");
            },
            onError: () => {
                toast.error("Gagal memperbarui profil.");
            },
        });
    };

    const handlePhotoChange = (e) => {
        const file = e.target.files[0];
        if (!file) return;

        const validTypes = [
            "image/jpeg",
            "image/png",
            "image/gif",
            "image/webp",
        ];
        if (!validTypes.includes(file.type)) {
            toast.error(
                "Format file tidak didukung. Gunakan JPG, PNG, GIF, atau WEBP."
            );
            return;
        }

        if (file.size > 2 * 1024 * 1024) {
            toast.error("Ukuran file terlalu besar. Maksimal 2MB.");
            return;
        }

        setNewPhoto(file);
        setPreview(URL.createObjectURL(file));
        photoForm.setData("photo", file);
    };

    const submitPhoto = () => {
        if (!photoForm.data.photo) return;

        photoForm.post(route("profile.photo.update"), {
            preserveScroll: true,
            onSuccess: () => {
                toast.success("Foto profil berhasil diperbarui.");
                setNewPhoto(null);
                photoInput.current.value = null;
            },
            onError: () => {
                toast.error("Gagal mengunggah foto.");
            },
        });
    };

    const deletePhoto = () => {
        deletePhotoForm.delete(route("profile.photo.destroy"), {
            preserveScroll: true,
            onSuccess: () => {
                toast.success("Foto profil berhasil dihapus.");
                setPreview(
                    `https://ui-avatars.com/api/?name=${encodeURIComponent(
                        user.name
                    )}`
                );
                photoInput.current.value = null;
            },
            onError: () => {
                toast.error("Gagal menghapus foto.");
            },
        });
    };
    return (
        <section className={className}>
            {/* Foto Profil */}
            <header>
                <h2 className="text-lg font-medium text-gray-900 dark:text-gray-100">
                    Profile Photo
                </h2>
                <p className="mt-1 text-sm text-gray-600 dark:text-gray-400">
                    Update your profile picture.
                </p>
            </header>

            <div className="mt-4 flex items-center gap-6">
                {preview ? (
                    <img
                        src={preview}
                        alt="Profile Preview"
                        className="h-20 w-20 rounded-full object-cover ring-2 ring-indigo-500"
                    />
                ) : (
                    <div className="h-20 w-20 rounded-full bg-gray-200 dark:bg-gray-700" />
                )}

                <div>
                    <input
                        type="file"
                        className="hidden"
                        ref={photoInput}
                        onChange={handlePhotoChange}
                        accept="image/*"
                    />
                    <div className="mt-3 flex items-center gap-2">
                        <SecondaryButton
                            type="button"
                            onClick={() => photoInput.current.click()}
                            disabled={photoForm.processing}
                        >
                            Choose Photo
                        </SecondaryButton>

                        {user.profile_photo_path && !newPhoto && (
                            <button
                                type="button"
                                onClick={deletePhoto}
                                className="text-sm text-red-500 hover:underline"
                                disabled={deletePhotoForm.processing}
                            >
                                Delete Photo
                            </button>
                        )}
                    </div>

                    {newPhoto && (
                        <div className="mt-3 flex items-center gap-2">
                            <PrimaryButton
                                onClick={submitPhoto}
                                disabled={photoForm.processing}
                            >
                                Save Photo
                            </PrimaryButton>
                            <button
                                type="button"
                                onClick={() => {
                                    setNewPhoto(null);
                                    setPreview(
                                        user.profile_photo_path
                                            ? `/storage/${user.profile_photo_path}`
                                            : `https://ui-avatars.com/api/?name=${encodeURIComponent(
                                                  user.name
                                              )}`
                                    );
                                    photoInput.current.value = null;
                                }}
                                className="text-sm text-red-500 hover:underline"
                            >
                                Cancel
                            </button>
                        </div>
                    )}

                    <InputError
                        message={photoForm.errors.photo}
                        className="mt-2"
                    />
                </div>
            </div>

            <hr className="my-8 border-t border-gray-300 dark:border-gray-600" />

            {/* Info Profil */}
            <header>
                <h2 className="text-lg font-medium text-gray-900 dark:text-gray-100">
                    Profile Information
                </h2>
                <p className="mt-1 text-sm text-gray-600 dark:text-gray-400">
                    Update your account's profile information and email address.
                </p>
            </header>

            <form onSubmit={submit} className="mt-6 space-y-6">
                <div>
                    <InputLabel htmlFor="name" value="Name" />
                    <TextInput
                        id="name"
                        className="mt-1 block w-full"
                        value={data.name}
                        onChange={(e) => setData("name", e.target.value)}
                        required
                        isFocused
                        autoComplete="name"
                    />
                    <InputError className="mt-2" message={errors.name} />
                </div>

                <div>
                    <InputLabel htmlFor="email" value="Email" />
                    <TextInput
                        id="email"
                        type="email"
                        className="mt-1 block w-full"
                        value={data.email}
                        onChange={(e) => setData("email", e.target.value)}
                        required
                        autoComplete="username"
                    />
                    <InputError className="mt-2" message={errors.email} />
                </div>

                {mustVerifyEmail && user.email_verified_at === null && (
                    <div>
                        <p className="mt-2 text-sm text-gray-800 dark:text-gray-200">
                            Your email address is unverified.
                            <Link
                                href={route("verification.send")}
                                method="post"
                                as="button"
                                className="ml-2 text-sm text-gray-600 underline hover:text-gray-900 dark:text-gray-400 dark:hover:text-gray-100"
                            >
                                Click here to re-send the verification email.
                            </Link>
                        </p>

                        {status === "verification-link-sent" && (
                            <div className="mt-2 text-sm font-medium text-green-600 dark:text-green-400">
                                A new verification link has been sent to your
                                email address.
                            </div>
                        )}
                    </div>
                )}

                <div className="flex items-center gap-4">
                    <PrimaryButton type="submit" disabled={processing}>
                        Save
                    </PrimaryButton>
                    <Transition
                        show={recentlySuccessful}
                        enter="transition ease-in-out"
                        enterFrom="opacity-0"
                        leave="transition ease-in-out"
                        leaveTo="opacity-0"
                    >
                        <p className="text-sm text-gray-600 dark:text-gray-400">
                            Saved.
                        </p>
                    </Transition>
                </div>
            </form>
        </section>
    );
}