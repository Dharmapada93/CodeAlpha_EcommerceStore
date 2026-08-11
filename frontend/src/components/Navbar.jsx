import React, { useState } from "react";
import { Link, useNavigate, useLocation } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import { useCart } from "../context/CartContext";

function Navbar({ onOpenLogin, onOpenRegister }) {
    const { user, logout } = useAuth();
    const { getTotalQuantity } = useCart();
    const [menuOpen, setMenuOpen] = useState(false);
    
    const navigate = useNavigate();
    const location = useLocation();

    const handleNavClick = (e, path, sectionId) => {
        e.preventDefault();
        setMenuOpen(false);

        if (location.pathname === path) {
            if (sectionId === "top") {
                window.scrollTo({ top: 0, behavior: "smooth" });
            } else {
                const element = document.getElementById(sectionId);
                if (element) {
                    element.scrollIntoView({ behavior: "smooth" });
                }
            }
        } else {
            navigate(path);
            if (sectionId && sectionId !== "top") {
                setTimeout(() => {
                    const element = document.getElementById(sectionId);
                    if (element) {
                        element.scrollIntoView({ behavior: "smooth" });
                    }
                }, 100);
            } else {
                window.scrollTo({ top: 0, behavior: "auto" });
            }
        }
    };

    const handleLogout = () => {
        logout();
        setMenuOpen(false);
        navigate("/");
    };

    const toggleMenu = () => {
        setMenuOpen(!menuOpen);
    };

    return (
        <header className="navbar">
            <div className="navbar-container">
                <Link to="/" className="logo" onClick={(e) => handleNavClick(e, "/", "top")}>
                    Shop<span>Sphere</span>
                </Link>

                {/* Hamburger Toggle */}
                <button className={`menu-toggle ${menuOpen ? 'open' : ''}`} onClick={toggleMenu} aria-label="Toggle Menu">
                    <span className="bar"></span>
                    <span className="bar"></span>
                    <span className="bar"></span>
                </button>

                <nav className={`nav-links ${menuOpen ? "active" : ""}`}>
                    <Link to="/" onClick={(e) => handleNavClick(e, "/", "top")}>Home</Link>
                    <Link to="/products" onClick={(e) => handleNavClick(e, "/products", "top")}>Products</Link>

                    {user && (
                        <Link to="/orders" onClick={(e) => handleNavClick(e, "/orders", "top")}>My Orders</Link>
                    )}

                    {user?.role === "admin" && (
                        <Link to="/" onClick={(e) => handleNavClick(e, "/", "admin")}>Admin</Link>
                    )}

                    <Link to="/cart" className="cart-link" onClick={(e) => handleNavClick(e, "/cart", "top")}>
                        Cart <span className="cart-count">({getTotalQuantity()})</span>
                    </Link>

                    {user ? (
                        <button
                            className="logout-btn"
                            onClick={handleLogout}
                        >
                            Logout
                        </button>
                    ) : (
                        <div className="auth-links" style={{ display: "flex", alignItems: "center", gap: "15px" }}>
                            <Link 
                                to="/login"
                                onClick={(e) => { setMenuOpen(false); if (onOpenLogin) { e.preventDefault(); onOpenLogin(); } }} 
                                style={{ color: "#171717", fontWeight: 500, fontSize: "14px" }}
                            >
                                Login
                            </Link>
                            <Link
                                to="/signup"
                                onClick={(e) => { setMenuOpen(false); if (onOpenRegister) { e.preventDefault(); onOpenRegister(); } }}
                                className="signup-btn"
                                style={{ padding: "8px 16px", cursor: "pointer", display: "inline-block", textAlign: "center" }}
                            >
                                Sign Up
                            </Link>
                        </div>
                    )}
                </nav>
            </div>
        </header>
    );
}

export default Navbar;
