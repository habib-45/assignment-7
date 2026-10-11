"use client";

import { useState } from "react";
import Image from "next/image";
import { signOut } from "@/lib/auth-client";

export default function ProfilePage() {
    const [name, setName] = useState("");
    const [currentName, setCurrentName] = useState("Rezwan Ahmed");
    const email = "rezwanahmed@gmail.com";

    const handleUpdate = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();

        if (!name.trim()) {
            alert("আপনার নাম লিখুন");
            return;
        }

        setCurrentName(name.trim());
        alert("নাম সফলভাবে আপডেট হয়েছে");
        setName("");
    };
    const handleSignOut = async () => {
            await signOut({
                fetchOptions: {
                    onSuccess: () => {
                        window.location.href = "/";
                    },
                },
            });
        };

    return (
        <main className="min-h-screen bg-[#f1f6f1] px-4 py-10">
            <div className="mx-auto max-w-[575px]">
                {/* Page Heading */}
                <div className="mb-5">
                    <h1 className="text-xl font-bold text-[#26352b]">
                        আমার প্রোফাইল
                    </h1>

                    <p className="mt-1 text-xs text-gray-500">
                        আপনার অ্যাকাউন্টের তথ্য এখানে দেখুন
                    </p>
                </div>

                {/* Profile Card */}
                <section className="flex flex-col items-start justify-between gap-4 rounded-xl border border-[#e0e9e0] bg-white/70 p-4 sm:flex-row sm:items-center sm:p-5">
                    <div className="flex items-center gap-3">
                        <div className="relative h-[52px] w-[60px] shrink-0 overflow-hidden rounded-xl bg-gray-100">
                            <Image
                                src="/images/profile.jpg"
                                alt="Profile picture"
                                fill
                                sizes="60px"
                                className="object-cover"
                            />
                        </div>

                        <div>
                            <h2 className="font-semibold text-[#26352b]">
                                {currentName}
                            </h2>

                            <p className="text-xs text-gray-500 sm:text-sm">
                                {email}
                            </p>
                        </div>
                    </div>

                    <button
                        onClick={handleSignOut}
                        className="rounded-md border border-red-400 px-3 py-2 text-xs font-medium text-red-500 transition hover:bg-red-50"
                    >
                        ↪ সাইন আউট
                    </button>
                </section>

                {/* Information Card */}
                <section className="mt-[18px] rounded-xl border border-[#e0e9e0] bg-white/70 p-5 sm:p-[14px]">
                    <h2 className="mb-7 font-semibold text-[#26352b]">
                        তথ্য
                    </h2>

                    <form onSubmit={handleUpdate} className="px-0 sm:px-[18px]">
                        <label
                            htmlFor="name"
                            className="mb-1 block text-xs text-[#26352b]"
                        >
                            নাম
                        </label>

                        <input
                            id="name"
                            type="text"
                            value={name}
                            onChange={(e) => setName(e.target.value)}
                            placeholder={currentName}
                            className="h-[30px] w-full rounded-md border border-[#dfe8df] bg-transparent px-3 text-sm outline-none transition focus:border-green-600 focus:ring-1 focus:ring-green-600"
                        />

                        <button
                            type="submit"
                            className="mt-3 h-[30px] w-full rounded-md bg-green-700 text-xs font-medium text-white shadow-md transition hover:bg-green-800 active:scale-[0.99]"
                        >
                            আপডেট
                        </button>
                    </form>
                </section>
            </div>
        </main>
    );
}