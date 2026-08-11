import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import api from "../services/api";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";

function Register({ onClose, onSwitchToLogin }) {
    const navigate = useNavigate();
    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");
    const [loading, setLoading] = useState(false);
    const [errors, setErrors] = useState({});
    const [submitError, setSubmitError] = useState("");
    const [success, setSuccess] = useState(false);

    const isModal = !!onClose;

    const validateForm = () => {
        const newErrors = {};
        if (!name.trim()) newErrors.name = "Name is required";
        
        if (!email.trim()) {
            newErrors.email = "Email is required";
        } else if (!/\S+@\S+\.\S+/.test(email)) {
            newErrors.email = "Please enter a valid email address";
        }

        if (!password) {
            newErrors.password = "Password is required";
        } else if (password.length < 6) {
            newErrors.password = "Password must be at least 6 characters long";
        }

        if (password !== confirmPassword) {
            newErrors.confirmPassword = "Passwords do not match";
        }

        setErrors(newErrors);
        return Object.keys(newErrors).length === 0;
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        
        if (!validateForm()) return;

        setLoading(true);
        setSubmitError("");

        try {
            await api.post("/auth/register", {
                name,
                email,
                password,
            });

            setSuccess(true);
            setTimeout(() => {
                if (onSwitchToLogin) {
                    onSwitchToLogin();
                } else {
                    navigate("/login");
                }
            }, 2000);
        } catch (error) {
            setSubmitError(error.response?.data?.message || "Registration failed. Try again.");
        } finally {
            setLoading(false);
        }
    };

    const handleSwitchToLogin = (e) => {
        if (onSwitchToLogin) {
            e.preventDefault();
            onSwitchToLogin();
        } else {
            navigate("/login");
        }
    };

    const renderForm = () => {
        return (
            <>
                <h2 style={{ fontSize: "24px", fontWeight: "600", marginBottom: "10px", textAlign: "center" }}>
                    Create Account
                </h2>
                <p style={{ color: "#716d68", fontSize: "14px", marginBottom: "25px", textAlign: "center" }}>
                    Sign up to track orders, save items, and checkout faster.
                </p>

                {submitError && <div className="error-message" style={{ marginBottom: "20px" }}>{submitError}</div>}
                
                {success && (
                    <div style={{
                        padding: "15px",
                        background: "#e8f5e9",
                        color: "#2e7d32",
                        fontSize: "14px",
                        textAlign: "center",
                        fontWeight: 600,
                        border: "1px solid #c8e6c9",
                        marginBottom: "20px"
                    }}>
                        Registration successful! Redirecting to login...
                    </div>
                )}

                {!success && (
                    <form onSubmit={handleSubmit} style={{ display: "flex", flexDirection: "column", gap: "15px" }}>
                        <div style={{ display: "flex", flexDirection: "column", gap: "5px" }}>
                            <label htmlFor="reg-name" style={{ fontSize: "12px", fontWeight: 600 }}>Full Name</label>
                            <input
                                id="reg-name"
                                type="text"
                                placeholder="John Doe"
                                value={name}
                                onChange={(e) => setName(e.target.value)}
                                style={{ padding: "10px 12px", border: "1px solid #e9e5df" }}
                                required
                            />
                            {errors.name && <span style={{ color: "#c62828", fontSize: "11px" }}>{errors.name}</span>}
                        </div>

                        <div style={{ display: "flex", flexDirection: "column", gap: "5px" }}>
                            <label htmlFor="reg-email" style={{ fontSize: "12px", fontWeight: 600 }}>Email Address</label>
                            <input
                                id="reg-email"
                                type="email"
                                placeholder="john.doe@example.com"
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                                style={{ padding: "10px 12px", border: "1px solid #e9e5df" }}
                                required
                            />
                            {errors.email && <span style={{ color: "#c62828", fontSize: "11px" }}>{errors.email}</span>}
                        </div>

                        <div style={{ display: "flex", flexDirection: "column", gap: "5px" }}>
                            <label htmlFor="reg-password" style={{ fontSize: "12px", fontWeight: 600 }}>Password</label>
                            <input
                                id="reg-password"
                                type="password"
                                placeholder="•••••••• (Min. 6 chars)"
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                                style={{ padding: "10px 12px", border: "1px solid #e9e5df" }}
                                required
                            />
                            {errors.password && <span style={{ color: "#c62828", fontSize: "11px" }}>{errors.password}</span>}
                        </div>

                        <div style={{ display: "flex", flexDirection: "column", gap: "5px" }}>
                            <label htmlFor="reg-confirm-password" style={{ fontSize: "12px", fontWeight: 600 }}>Confirm Password</label>
                            <input
                                id="reg-confirm-password"
                                type="password"
                                placeholder="••••••••"
                                value={confirmPassword}
                                onChange={(e) => setConfirmPassword(e.target.value)}
                                style={{ padding: "10px 12px", border: "1px solid #e9e5df" }}
                                required
                            />
                            {errors.confirmPassword && <span style={{ color: "#c62828", fontSize: "11px" }}>{errors.confirmPassword}</span>}
                        </div>

                        <button 
                            type="submit" 
                            className="primary-btn" 
                            disabled={loading}
                            style={{ padding: "12px", marginTop: "10px", border: "none", cursor: "pointer", fontWeight: "600" }}
                        >
                            {loading ? "Creating Account..." : "Create Account"}
                        </button>
                    </form>
                )}

                <p style={{ marginTop: "25px", fontSize: "14px", textAlign: "center", color: "#716d68" }}>
                    Already have an account?{" "}
                    <button 
                        onClick={handleSwitchToLogin}
                        style={{ background: "none", border: "none", color: "#171717", fontWeight: 600, cursor: "pointer", textDecoration: "underline", padding: 0 }}
                    >
                        Sign In here
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

export default Register;
