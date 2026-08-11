import React, { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import api from "../services/api";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";

function Login({ onClose, onSwitchToRegister }) {
    const { login } = useAuth();
    const navigate = useNavigate();
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState("");

    const isModal = !!onClose;

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
                if (onClose) {
                    onClose();
                } else {
                    navigate("/");
                }
            }
        } catch (error) {
            setError(error.response?.data?.message || "Invalid email or password");
        } finally {
            setLoading(false);
        }
    };

    const handleSwitchToRegister = (e) => {
        if (onSwitchToRegister) {
            e.preventDefault();
            onSwitchToRegister();
        } else {
            navigate("/signup");
        }
    };

    const renderForm = () => {
        return (
            <>
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
                        style={{ padding: "12px", marginTop: "10px", border: "none", cursor: "pointer", fontWeight: "600" }}
                    >
                        {loading ? "Signing In..." : "Sign In"}
                    </button>
                </form>

                <p style={{ marginTop: "25px", fontSize: "14px", textAlign: "center", color: "#716d68" }}>
                    Don't have an account?{" "}
                    <button 
                        onClick={handleSwitchToRegister}
                        style={{ background: "none", border: "none", color: "#171717", fontWeight: 600, cursor: "pointer", textDecoration: "underline", padding: 0 }}
                    >
                        Sign up for free
                    </button>
                </p>
            </>
        );
    };

    if (isModal) {
        return (
            <div className="modal-backdrop" onClick={onClose}>
                <div className="modal-content-wrapper auth-modal" onClick={(e) => e.stopPropagation()}>
                    <button className="modal-close-btn" onClick={onClose}>&times;</button>
                    {renderForm()}
                </div>
            </div>
        );
    }

    return (
        <div style={{ display: "flex", flexDirection: "column", minHeight: "100vh" }}>
            <Navbar />
            <main style={{ flex: 1, display: "flex", alignItems: "center", justifyContent: "center", padding: "80px 20px" }}>
                <div className="modal-content-wrapper auth-modal" style={{ animation: "none", boxShadow: "0 10px 30px rgba(0,0,0,0.05)", position: "static", border: "1px solid #e9e5df" }}>
                    {renderForm()}
                </div>
            </main>
            <Footer />
        </div>
    );
}

export default Login;
