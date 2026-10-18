
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import "./Auth.css";
const API_URL = (
    import.meta.env.VITE_API_URL ||
    (typeof window !== "undefined" &&
    (window.location.hostname === "localhost" ||
     window.location.hostname === "127.0.0.1")
        ? "http://localhost:5000"
        : "https://netflix-clone-hvfb.vercel.app")
).replace(/\/$/, "");

function Register() {
    const navigate = useNavigate();

    const searchParams = typeof window !== "undefined" ? new URLSearchParams(window.location.search) : null;
    const initialEmail = searchParams?.get("email") || "";

    const [name, setName] = useState("");
    const [email, setEmail] = useState(initialEmail);
    const [password, setPassword] = useState("");
    const [error, setError] = useState("");
    const [loading, setLoading] = useState(false);

    const handleRegister = async (e) => {
        e.preventDefault();
        setError("");

        const cleanName = name.trim();
        const cleanEmail = email.trim().toLowerCase();

        if (!cleanName) {
            setError("Please enter your name.");
            return;
        }

        if (password.length < 8) {
            setError("Password must contain at least 8 characters.");
            return;
        }

        setLoading(true);

        try {
            const response = await fetch(
              `${API_URL}/api/auth/register`,
                {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json",
                    },
                    body: JSON.stringify({
                        name: cleanName,
                        email: cleanEmail,
                        password,
                    }),
                }
            );

            let data;
            const text = await response.text();
            try {
                data = JSON.parse(text);
            } catch {
                throw new Error(text || `Server error (${response.status})`);
            }

            if (!response.ok || !data.success) {
                throw new Error(
                    data.message || "Registration failed"
                );
            }

            // Registration succeeded. Continue to login.
            navigate("/login", {
                state: { email: cleanEmail },
            });
        } catch (err) {
            const msg = err.message || "";
            setError(
                msg === "Failed to fetch" || msg.includes("NetworkError") || msg.includes("Failed to fetch")
                    ? "Cannot connect to the server. Please try again."
                    : msg
            );
        } finally {
            setLoading(false);
        }
    };

    return (
        <main className="auth-page">
            <Link to="/" className="auth-logo">
                NETFLIX
            </Link>

            <form className="auth-card" onSubmit={handleRegister}>
                <h1>Create Account</h1>

                <input
                    type="text"
                    placeholder="Full name"
                    autoComplete="name"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    required
                />

                <input
                    type="email"
                    placeholder="Email address"
                    autoComplete="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                />

                <input
                    type="password"
                    placeholder="Password (minimum 8 characters)"
                    autoComplete="new-password"
                    minLength={8}
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    required
                />

                {error && (
                    <p className="auth-error" role="alert">
                        {error}
                    </p>
                )}

                <button type="submit" disabled={loading}>
                    {loading ? "Creating account..." : "Sign Up"}
                </button>

                <p>
                    Already have an account?{" "}
                    <Link to="/login">Sign in</Link>
                </p>

                <Link to="/" className="back-home">
                    ← Back to home
                </Link>
            </form>
        </main>
    );
}

export default Register;
