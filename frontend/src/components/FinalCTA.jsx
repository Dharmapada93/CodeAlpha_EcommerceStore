import React from "react";
import { useAuth } from "../context/AuthContext";

function FinalCTA({ onExplore, onOpenRegister }) {
    const { user } = useAuth();

    const handleExploreClick = (e) => {
        e.preventDefault();
        if (onExplore) {
            onExplore();
        }
        const element = document.getElementById("products");
        if (element) {
            element.scrollIntoView({ behavior: "smooth" });
        }
    };

    return (
        <section className="final-cta-section">
            <h2>Ready to find your next favorite?</h2>
            <p>Explore our collection of carefully selected premium products designed for modern living.</p>
            <div className="final-cta-buttons">
                <button
                    onClick={handleExploreClick}
                    className="primary-btn"
                    style={{ background: "white", color: "#171717" }}
                >
                    Explore Products
                </button>

                {!user && (
                    <button
                        onClick={onOpenRegister}
                        className="secondary-btn"
                    >
                        Create Account
                    </button>
                )}
            </div>
        </section>
    );
}

export default FinalCTA;
