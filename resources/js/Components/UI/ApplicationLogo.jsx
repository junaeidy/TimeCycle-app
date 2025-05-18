import { Image } from "@heroui/react";
import { usePage } from "@inertiajs/react";

export default function ApplicationLogo({ className = "", ...props }) {
    const { app_logo_url } = usePage().props;

    return (
        <Image
            src={app_logo_url}
            alt="Logo"
            {...props}
            className={className}
        />
    );
}