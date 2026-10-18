
import { useState } from "react";
import { Link, useNavigate, useLocation } from "react-router-dom";
import "./Auth.css";
const API_URL = (
    import.meta.env.VITE_API_URL || ""
).replace(/\/$/, "");

function Login() {
    const navigate = useNavigate();
    const location = useLocation();

    const [email, setEmail] = useState(location.state?.email || "");
    const [password, setPassword] = useState("");
    const [error, setError] = useState("");
    const [loading, setLoading] = useState(false);

    const handleLogin = async (e) => {
        e.preventDefault();
        setError("");
        setLoading(true);

        try {
            const response = await fetch(
               `${API_URL}/api/auth/login`,
                {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json",
                    },
                    body: JSON.stringify({
                        email: email.trim().toLowerCase(),
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
                throw new Error(data.message || "Login failed");
            }

            if (!data.token || !data.user?.email) {
                throw new Error("Invalid response from server");
            }

            sessionStorage.setItem("token", data.token);
            sessionStorage.setItem("user", JSON.stringify(data.user));

            navigate("/");
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

            <form className="auth-card" onSubmit={handleLogin}>
                <h1>Sign In</h1>

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
                    placeholder="Password"
                    autoComplete="current-password"
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
                    {loading ? "Signing in..." : "Sign In"}
                </button>

                <p>
                    New to Netflix Clone?{" "}
                    <Link to="/register">Sign up now</Link>
                </p>

                <Link to="/" className="back-home">
                    ← Back to home
                </Link>
            </form>
        </main>
    );
}

export default Login;
