"use client";

import { useState } from "react";
import Link from "next/link";
import { signOut, useSession } from "@/lib/auth-client";
import Image from "next/image";

export default function AuthLinks() {
    const { data: session, isPending } = useSession();
    const [isOpen, setIsOpen] = useState(false);

    const handleSignOut = async () => {
        await signOut({
            fetchOptions: {
                onSuccess: () => {
                    window.location.href = "/";
                },
            },
        });
    };

    if (!session?.user) {
        return (<div className="flex items-center gap-2"> <Link
            href="/sign-in"
            className="px-4 py-3 font-semibold text-gray-800"
        >
            সাইন ইন </Link>
            <Link
                href="/sign-up"
                className="rounded-[22px] bg-emerald-700 px-4 py-3 font-semibold text-white shadow-md transition hover:bg-emerald-800"
            >
                সাইন আপ
            </Link>
        </div>
        );

    }

    return (<div className="relative">
        <button
            type="button"
            onClick={() => setIsOpen((prev) => !prev)}
            className="flex items-center gap-3 rounded-xl p-2 hover:bg-gray-100"
        >
            {session.user.image ? (
                <Image
                    src={session.user.image}
                    alt={session.user.name || "User"}
                    className="h-12 w-12 rounded-full object-cover"
                />
            ) : (<div className="flex h-12 w-12 items-center justify-center rounded-full bg-emerald-100">
                👤 </div>
            )}

            <span className="font-semibold text-gray-800">
                {session.user.name}
            </span>

            <span className="text-gray-500">⌄</span>
        </button>

        {isOpen && (
            <div className="absolute right-0 top-full z-50 mt-3 w-80 max-w-[calc(100vw-2rem)] rounded-2xl border border-gray-200 bg-white p-5 shadow-xl">
                <h3 className="font-bold text-gray-900">
                    {session.user.name}
                </h3>

                <p className="break-all text-sm text-gray-500">
                    {session.user.email}
                </p>

                <Link
                    href="/profile"
                    onClick={() => setIsOpen(false)}
                    className="mt-4 block rounded-lg py-2 text-gray-800 hover:bg-gray-50"
                >
                    👤 আমার প্রোফাইল
                </Link>

                <button
                    type="button"
                    onClick={handleSignOut}
                    className="mt-2 w-full rounded-lg py-2 text-left text-red-500 hover:bg-red-50"
                >
                    ↪ সাইন আউট
                </button>
            </div>
        )}
    </div>
    );
}
