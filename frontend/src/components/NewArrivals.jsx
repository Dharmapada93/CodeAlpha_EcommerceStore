import React from "react";
import ProductCard from "./ProductCard";

function NewArrivals({ products, loading, error, onViewDetails, onClearFilters }) {
    // Sort products by newest (createdAt descending) and display the top 4
    const newArrivals = React.useMemo(() => {
        if (!products) return [];
        return [...products]
            .sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt))
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
                <span className="section-label">JUST ARRIVED</span>
                <h2>New Arrivals</h2>
                <p>Check out our freshest arrivals, hot off the catalog.</p>
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

            {!loading && !error && newArrivals.length === 0 && (
                <div className="empty-products" style={{ border: "1px dashed #e9e5df", padding: "40px" }}>
                    <p style={{ marginBottom: "20px" }}>No products available right now.</p>
                    <button onClick={handleViewAll} className="primary-btn">
                        Browse Products
                    </button>
                </div>
            )}

            {!loading && !error && newArrivals.length > 0 && (
                <>
                    <div className="products-grid" style={{ gridTemplateColumns: "repeat(auto-fit, minmax(250px, 1fr))" }}>
                        {newArrivals.map((product) => (
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

export default NewArrivals;
