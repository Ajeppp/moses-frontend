"use client";

import { useState } from "react";
import { registerApi } from "@/lib/apiAuth";
import { useRouter } from "next/navigation";

export default function RegisterPage() {
    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [loading, setLoading] = useState(false);
    const router = useRouter();

    const handleRegister = async () => {
        try {
            setLoading(true);
            await registerApi(name, email, password);
            router.push("/login");
        } catch (err) {
            alert("Registration failed");
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="min-h-screen flex items-center justify-center bg-linear-to-tr from-[#003B44] from-20% to-transparent">
            <div className="w-full max-w-md bg-slate-900/80 backdrop-blur-xl p-8 rounded-2xl shadow-2xl border border-slate-700">

                <h1 className="text-2xl font-bold text-white mb-2 text-center">
                    Create Account
                </h1>
                <p className="text-slate-400 text-center mb-6">
                    Join Moses Platform
                </p>

                <div className="space-y-4">
                    <input
                        placeholder="Full name"
                        className="w-full px-4 py-3 rounded-xl bg-slate-800 text-white border border-slate-700 focus:outline-none focus:ring-2 focus:ring-indigo-500"
                        onChange={(e) => setName(e.target.value)}
                    />

                    <input type="email" placeholder="Email" className="w-full px-4 py-3 rounded-xl bg-slate-800 text-white border border-slate-700 focus:outline-none focus:ring-2 focus:ring-indigo-500" onChange={(e) => setEmail(e.target.value)} />

                    <input type="password" placeholder="Password" className="w-full px-4 py-3 rounded-xl bg-slate-800 text-white border border-slate-700 focus:outline-none focus:ring-2 focus:ring-indigo-500" onChange={(e) => setPassword(e.target.value)} />

                    <button
                        onClick={handleRegister}
                        disabled={loading}
                        className="w-full py-3 rounded-xl bg-indigo-600 hover:bg-indigo-700 transition text-white font-semibold">
                        {loading ? "Creating account..." : "Create Account"}
                    </button>
                </div>

                <div className="mt-6 text-center text-slate-400 text-sm">
                    Already have an account?{" "}
                    <span
                        className="text-indigo-400 hover:underline cursor-pointer"
                        onClick={() => router.push("/login")}
                    >
                        Login here!
                    </span>
                </div>

            </div>
        </div>
    );
}