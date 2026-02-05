"use client";

import { useState } from "react";
import { login } from "@/lib/auth";
import { useRouter } from "next/navigation";

export default function LoginPage() {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [loading, setLoading] = useState(false);
    const router = useRouter();

    const handleLogin = async () => {
        try {
            setLoading(true);
            const res = await login(email, password);
            localStorage.setItem("token", res.token);
            router.push("/dashboard");
        } catch (err) {
            alert("Invalid email or password");
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="min-h-screen flex items-center justify-center bg-linear-to-tr from-[#003B44] from-20% to-transparent">
            <div className="w-full max-w-md bg-slate-900/80 backdrop-blur-xl p-8 rounded-2xl shadow-2xl border border-slate-700">

                <h1 className="text-2xl font-bold text-white mb-2 text-center">
                    Moses Platform
                </h1>
                <p className="text-slate-400 text-center mb-6">
                    Sign in to your dashboard
                </p>

                <div className="space-y-4">
                    <div>
                        <label className="text-sm text-slate-400">Email</label>
                        <input
                            type="email"
                            placeholder="you@example.com"
                            className="w-full mt-1 px-4 py-3 rounded-xl bg-slate-800 text-white border border-slate-700 focus:outline-none focus:ring-2 focus:ring-indigo-500"
                            onChange={(e) => setEmail(e.target.value)}
                        />
                    </div>

                    <div>
                        <label className="text-sm text-slate-400">Password</label>
                        <input
                            type="password"
                            placeholder="••••••••"
                            className="w-full mt-1 px-4 py-3 rounded-xl bg-slate-800 text-white border border-slate-700 focus:outline-none focus:ring-2 focus:ring-indigo-500"
                            onChange={(e) => setPassword(e.target.value)}
                        />
                    </div>

                    <button
                        onClick={handleLogin}
                        disabled={loading}
                        className="w-full py-3 rounded-xl bg-indigo-600 hover:bg-indigo-700 transition text-white font-semibold"
                    >
                        {loading ? "Signing in..." : "Sign In"}
                    </button>
                </div>

                <div className="mt-6 text-center text-slate-400 text-sm">
                    Don't have an account?{" "}
                    <span
                        className="text-indigo-400 hover:underline cursor-pointer"
                        onClick={() => router.push("/register")}
                    >
                        Register
                    </span>
                </div>

            </div>
        </div>
    );
}
