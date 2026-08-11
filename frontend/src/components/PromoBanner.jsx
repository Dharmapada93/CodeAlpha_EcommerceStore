import React from "react";

function PromoBanner({ onExplore }) {
    const handleExplore = (e) => {
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
        <section className="home-section" style={{ borderBottom: "1px solid #e9e5df" }}>
            <div className="promo-banner">
                <div className="promo-left">
                    <span className="section-label">LIMITED OFFER</span>
                    <h2>Elevate Your Everyday Shopping</h2>
                    <p>Discover quality products designed for modern living. Curated craftsmanship, modern design, and exceptional functionality in every single piece.</p>
                    <button
                        onClick={handleExplore}
                        className="primary-btn"
                        style={{ marginTop: "10px" }}
                    >
                        Explore Collection
                    </button>
                </div>
                <div className="promo-right">
                    <img
                        src="https://images.unsplash.com/photo-1441984904996-e0b6ba687e04?auto=format&fit=crop&w=1000&q=80"
                        alt="Lifestyle shopping showcase"
                        className="promo-img"
                    />
                </div>
            </div>
        </section>
    );
}

export default PromoBanner;
