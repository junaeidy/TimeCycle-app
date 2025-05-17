import { Link } from "@inertiajs/react";
import { Head } from "@inertiajs/react";

export default function Error403() {
    return (
        <>
            <Head title="403 Unauthorized" />
            <div className="min-h-screen flex flex-col items-center justify-center bg-gradient-to-r from-indigo-600 to-purple-600 px-6 text-white text-center">
                <svg
                    className="w-52 h-52 mb-8"
                    viewBox="0 0 512 512"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                >
                    <path
                        d="M256 0C114.615 0 0 114.617 0 256C0 397.383 114.615 512 256 512C397.384 512 512 397.383 512 256C512 114.617 397.384 0 256 0ZM256 472C132.29 472 40 379.711 40 256C40 132.29 132.29 40 256 40C379.711 40 472 132.29 472 256C472 379.711 379.711 472 256 472Z"
                        fill="white"
                    />
                    <path
                        d="M336 176H176C167.164 176 160 183.164 160 192V320C160 328.836 167.164 336 176 336H336C344.836 336 352 328.836 352 320V192C352 183.164 344.836 176 336 176ZM256 296C247.164 296 240 288.836 240 280C240 271.164 247.164 264 256 264C264.836 264 272 271.164 272 280C272 288.836 264.836 296 256 296ZM272 240H240V208H272V240Z"
                        fill="white"
                    />
                </svg>

                <h1 className="text-5xl font-bold mb-4">403 Unauthorized</h1>
                <p className="text-lg mb-6">
                    You don’t have permission to access this page.
                </p>
                <Link
                    href={window.history.state?.url ?? "/"}
                    className="inline-block bg-white text-indigo-600 font-semibold px-6 py-3 rounded-lg shadow hover:bg-gray-100 transition"
                >
                    Go Back
                </Link>
            </div>
        </>
    );
}