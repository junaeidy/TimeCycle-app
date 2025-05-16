import { Image } from "@heroui/react";

export default function ApplicationLogo({ className = "", ...props }) {
    return (
        <Image
            src="/image/Logo.png"
            alt="Logo"
            {...props}
            className={className}
        />
    );
}
