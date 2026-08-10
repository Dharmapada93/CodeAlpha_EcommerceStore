import React, { useState } from "react";
import { useAuth } from "../context/AuthContext";
import { useCart } from "../context/CartContext";

function Navbar({ onOpenLogin, onOpenRegister }) {
    const { user, logout } = useAuth();
    const { getTotalQuantity } = useCart();
    const [menuOpen, setMenuOpen] = useState(false);

    const handleScrollTo = (e, sectionId) => {
        e.preventDefault();
        setMenuOpen(false);
        if (sectionId === "top") {
            window.scrollTo({ top: 0, behavior: "smooth" });
        } else {
            const element = document.getElementById(sectionId);
            if (element) {
                element.scrollIntoView({ behavior: "smooth" });
            }
        }
    };

    const handleLogout = () => {
        logout();
        setMenuOpen(false);
    };

    const toggleMenu = () => {
        setMenuOpen(!menuOpen);
    };

    return (
        <header className="navbar">
            <div className="navbar-container">
                <a href="#top" className="logo" onClick={(e) => handleScrollTo(e, "top")}>
                    Shop<span>Sphere</span>
                </a>

                {/* Hamburger Toggle */}
                <button className={`menu-toggle ${menuOpen ? 'open' : ''}`} onClick={toggleMenu} aria-label="Toggle Menu">
                    <span className="bar"></span>
                    <span className="bar"></span>
                    <span className="bar"></span>
                </button>

                <nav className={`nav-links ${menuOpen ? "active" : ""}`}>
                    <a href="#top" onClick={(e) => handleScrollTo(e, "top")}>Home</a>
                    <a href="#products" onClick={(e) => handleScrollTo(e, "products")}>Products</a>

                    {user && (
                        <a href="#orders" onClick={(e) => handleScrollTo(e, "orders")}>My Orders</a>
                    )}

                    {user?.role === "admin" && (
                        <a href="#admin" onClick={(e) => handleScrollTo(e, "admin")}>Admin</a>
                    )}

                    <a href="#cart" className="cart-link" onClick={(e) => handleScrollTo(e, "cart")}>
                        Cart <span className="cart-count">({getTotalQuantity()})</span>
                    </a>

                    {user ? (
                        <button
                            className="logout-btn"
                            onClick={handleLogout}
                        >
                            Logout
                        </button>
                    ) : (
                        <div className="auth-links" style={{ display: "flex", alignItems: "center", gap: "15px" }}>
                            <button 
                                onClick={() => { setMenuOpen(false); onOpenLogin(); }} 
                                style={{ background: "none", border: "none", color: "#171717", cursor: "pointer", fontWeight: 500, fontSize: "14px" }}
                            >
                                Login
                            </button>
                            <button
                                onClick={() => { setMenuOpen(false); onOpenRegister(); }}
                                className="signup-btn"
                                style={{ padding: "8px 16px", cursor: "pointer" }}
                            >
                                Sign Up
                            </button>
                        </div>
                    )}
                </nav>
            </div>
        </header>
    );
}

export default Navbar;
