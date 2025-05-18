import "../css/app.css";
import "./bootstrap";

import { createInertiaApp } from "@inertiajs/react";
import { resolvePageComponent } from "laravel-vite-plugin/inertia-helpers";
import { createRoot, hydrateRoot } from "react-dom/client";
import { HeroUIProvider } from "@heroui/react";
import { Toaster } from "react-hot-toast";

const appName = import.meta.env.VITE_APP_NAME || "TimeCycle";

createInertiaApp({
    title: (title) => `${title} - ${appName}`,
    resolve: (name) =>
        resolvePageComponent(
            `./Pages/${name}.jsx`,
            import.meta.glob("./Pages/**/*.jsx")
        ),
    setup({ el, App, props }) {
        if (import.meta.env.SSR) {
            hydrateRoot(el, <App {...props} />);
            return;
        }

        createRoot(el).render(
            <HeroUIProvider>
                <Toaster position="top-right" />
                <App {...props} />
            </HeroUIProvider>
        );
    },
    progress: {
        color: "#0394fc",
        showSpinner: true,
    },
});