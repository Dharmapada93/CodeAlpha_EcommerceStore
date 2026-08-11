import React from "react";
import ProductCard from "./ProductCard";

function BestSellers({ products, loading, error, onViewDetails, onClearFilters }) {
    // Show 4 popular products (sorted by stock descending as a reasonable ordering mechanism proxy)
    const bestSellers = React.useMemo(() => {
        if (!products) return [];
        return [...products]
            .sort((a, b) => b.stock - a.stock)
            .slice(0, 4);
    }, [products]);

    const handleViewAll = () => {
        if (onClearFilters) {
            onClearFilters();
        }
        const element = document.getElementById("products");
        if (element) {
            element.scrollIntoView({ behavior: "smooth" });
        }
    };

    return (
        <section className="home-section" style={{ borderBottom: "1px solid #e9e5df" }}>
            <div className="section-header">
                <span className="section-label">CUSTOMER FAVORITES</span>
                <h2>Best Sellers</h2>
                <p>Browse our most popular and highly-rated products.</p>
            </div>

            {loading && (
                <div className="products-grid">
                    {[1, 2, 3, 4].map((n) => (
                        <div key={n} className="skeleton-card">
                            <div className="skeleton-image" />
                            <div className="skeleton-info">
                                <div className="skeleton-line small" />
                                <div className="skeleton-line large" />
                                <div className="skeleton-line medium" style={{ marginTop: "8px" }} />
                                <div className="skeleton-actions" style={{ marginTop: "15px" }}>
                                    <div className="skeleton-btn" />
                                    <div className="skeleton-btn" />
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            )}

            {error && (
                <div className="error-message" style={{ background: "rgba(198, 40, 40, 0.05)", border: "1px solid #c62828", padding: "20px", color: "#c62828" }}>
                    Unable to load products. Please try again.
                </div>
            )}

            {!loading && !error && bestSellers.length === 0 && (
                <div className="empty-products" style={{ border: "1px dashed #e9e5df", padding: "40px" }}>
                    <p style={{ marginBottom: "20px" }}>No products available right now.</p>
                    <button onClick={handleViewAll} className="primary-btn">
                        Browse Products
                    </button>
                </div>
            )}

            {!loading && !error && bestSellers.length > 0 && (
                <>
                    <div className="products-grid">
                        {bestSellers.map((product) => (
                            <ProductCard
                                key={product._id}
                                product={product}
                                onViewDetails={onViewDetails}
                            />
                        ))}
                    </div>

                    <div className="view-all-btn-wrapper">
                        <button
                            onClick={handleViewAll}
                            className="secondary-btn"
                            style={{ padding: "14px 40px" }}
                        >
                            View All Products
                        </button>
                    </div>
                </>
            )}
        </section>
    );
}

export default BestSellers;
