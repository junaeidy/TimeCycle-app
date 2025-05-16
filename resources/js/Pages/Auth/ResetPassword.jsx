import InputError from "@/Components/InputError";
import PrimaryButton from "@/Components/PrimaryButton";
import TextInput from "@/Components/TextInput";
import ApplicationLogo from "@/Components/ApplicationLogo";
import { Head, useForm } from "@inertiajs/react";
import InputLabel from "@/Components/InputLabel";

export default function ResetPassword({ token, email: defaultEmail }) {
    const { data, setData, post, processing, errors } = useForm({
        token,
        email: defaultEmail || "",
        password: "",
        password_confirmation: "",
    });

    const submit = (e) => {
        e.preventDefault();
        post(route("password.store"));
    };

    return (
        <>
            <Head title="Reset Password" />

            <div className="min-h-screen flex flex-col md:flex-row">
                {/* Left side - illustration / text */}
                <div
                    className="hidden md:flex flex-1 items-center justify-center bg-cover bg-center p-8"
                    style={{
                        backgroundImage:
                            "url(https://images.pexels.com/photos/3183183/pexels-photo-3183183.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1)",
                    }}
                >
                    <div className="text-white text-center max-w-md bg-black/40 p-6 rounded-xl">
                        <h1 className="text-4xl font-bold mb-4">
                            Reset your password
                        </h1>
                        <p className="text-lg">
                            Set a new password to get back into your account.
                        </p>
                    </div>
                </div>

                {/* Right side - form */}
                <div className="flex-1 flex items-center justify-center bg-white dark:bg-gray-900">
                    <div className="w-full max-w-md p-8">
                        <div className="flex flex-col items-center mb-8">
                            <ApplicationLogo className="h-16 w-16 sm:h-20 sm:w-20" />
                            <h2 className="text-2xl font-semibold mt-4 text-gray-800 dark:text-gray-100">
                                Create a New Password
                            </h2>
                        </div>

                        <form onSubmit={submit} className="space-y-6">
                            <div>
                                <InputLabel htmlFor="email" value="Email" />

                                <TextInput
                                    id="email"
                                    type="email"
                                    name="email"
                                    value={data.email}
                                    className="mt-1 block w-full"
                                    autoComplete="username"
                                    onChange={(e) =>
                                        setData("email", e.target.value)
                                    }
                                />

                                <InputError
                                    message={errors.email}
                                    className="mt-2"
                                />
                            </div>

                            <div className="mt-4">
                                <InputLabel
                                    htmlFor="password"
                                    value="Password"
                                />

                                <TextInput
                                    id="password"
                                    type="password"
                                    name="password"
                                    value={data.password}
                                    className="mt-1 block w-full"
                                    autoComplete="new-password"
                                    isFocused={true}
                                    onChange={(e) =>
                                        setData("password", e.target.value)
                                    }
                                />

                                <InputError
                                    message={errors.password}
                                    className="mt-2"
                                />
                            </div>

                            <div className="mt-4">
                                <InputLabel
                                    htmlFor="password_confirmation"
                                    value="Confirm Password"
                                />

                                <TextInput
                                    type="password"
                                    id="password_confirmation"
                                    name="password_confirmation"
                                    value={data.password_confirmation}
                                    className="mt-1 block w-full"
                                    autoComplete="new-password"
                                    onChange={(e) =>
                                        setData(
                                            "password_confirmation",
                                            e.target.value
                                        )
                                    }
                                />

                                <InputError
                                    message={errors.password_confirmation}
                                    className="mt-2"
                                />
                            </div>

                            <div>
                                <PrimaryButton
                                    type="submit"
                                    className="w-full justify-center"
                                    disabled={processing}
                                >
                                    {processing
                                        ? "Resetting..."
                                        : "Reset Password"}
                                </PrimaryButton>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </>
    );
}