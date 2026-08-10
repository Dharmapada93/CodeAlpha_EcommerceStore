import React, { useState } from "react";
import { useAuth } from "../context/AuthContext";
import api from "../services/api";

function Login({ onClose, onSwitchToRegister }) {
    const { login } = useAuth();
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState("");

    const handleSubmit = async (e) => {
        e.preventDefault();
        
        if (!email.trim() || !password.trim()) {
            setError("Please fill in all fields");
            return;
        }

        setLoading(true);
        setError("");

        try {
            const response = await api.post("/auth/login", {
                email,
                password,
            });

            if (response.data.token) {
                login(response.data.user, response.data.token);
                onClose();
            }
        } catch (error) {
            setError(error.response?.data?.message || "Invalid email or password");
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="modal-backdrop" onClick={onClose}>
            <div className="modal-content-wrapper auth-modal" onClick={(e) => e.stopPropagation()}>
                <button className="modal-close-btn" onClick={onClose}>&times;</button>
                
                <h2 style={{ fontSize: "24px", fontWeight: "600", marginBottom: "10px", textAlign: "center" }}>
                    Sign In
                </h2>
                <p style={{ color: "#716d68", fontSize: "14px", marginBottom: "25px", textAlign: "center" }}>
                    Welcome back! Please enter your details.
                </p>

                {error && <div className="error-message" style={{ marginBottom: "20px" }}>{error}</div>}

                <form onSubmit={handleSubmit} style={{ display: "flex", flexDirection: "column", gap: "15px" }}>
                    <div style={{ display: "flex", flexDirection: "column", gap: "5px" }}>
                        <label htmlFor="login-email" style={{ fontSize: "12px", fontWeight: 600 }}>Email Address</label>
                        <input
                            id="login-email"
                            type="email"
                            placeholder="your.email@example.com"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            style={{ padding: "10px 12px", border: "1px solid #e9e5df" }}
                            required
                        />
                    </div>

                    <div style={{ display: "flex", flexDirection: "column", gap: "5px" }}>
                        <label htmlFor="login-password" style={{ fontSize: "12px", fontWeight: 600 }}>Password</label>
                        <input
                            id="login-password"
                            type="password"
                            placeholder="••••••••"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            style={{ padding: "10px 12px", border: "1px solid #e9e5df" }}
                            required
                        />
                    </div>

                    <button 
                        type="submit" 
                        className="primary-btn" 
                        disabled={loading}
                        style={{ padding: "12px", marginTop: "10px" }}
                    >
                        {loading ? "Signing In..." : "Sign In"}
                    </button>
                </form>

                <p style={{ marginTop: "25px", fontSize: "14px", textAlign: "center", color: "#716d68" }}>
                    Don't have an account?{" "}
                    <button 
                        onClick={onSwitchToRegister}
                        style={{ background: "none", border: "none", color: "#171717", fontWeight: 600, cursor: "pointer", textDecoration: "underline", padding: 0 }}
                    >
                        Sign up for free
                    </button>
                </p>
            </div>
        </div>
    );
}

export default Login;
