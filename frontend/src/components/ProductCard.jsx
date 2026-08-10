import React, { useState } from "react";
import { useCart } from "../context/CartContext";

function ProductCard({ product, onViewDetails }) {
    const { addToCart } = useCart();
    const [addedMessage, setAddedMessage] = useState(false);

    const handleAddToCart = (e) => {
        e.preventDefault();
        e.stopPropagation();
        addToCart(product, 1);
        setAddedMessage(true);
        setTimeout(() => setAddedMessage(false), 2000);
    };

    const handleViewDetails = (e) => {
        e.preventDefault();
        onViewDetails(product._id);
    };

    return (
        <article className="product-card">
            <div className="product-image-wrapper" onClick={handleViewDetails} style={{ cursor: "pointer" }}>
                <img
                    src={product.image}
                    alt={product.name}
                    className="product-image"
                />
            </div>

            <div className="product-info">
                <span className="product-category">
                    {product.category}
                </span>

                <h3 className="product-name" onClick={handleViewDetails} style={{ cursor: "pointer" }}>
                    {product.name}
                </h3>

                <div className="product-bottom" style={{ marginBottom: "15px" }}>
                    <span className="product-price">
                        ₹{product.price.toLocaleString("en-IN")}
                    </span>

                    <span className="product-stock">
                        {product.stock > 0
                            ? `In Stock (${product.stock})`
                            : "Out of Stock"}
                    </span>
                </div>

                <div className="product-card-actions" style={{ display: "flex", gap: "10px" }}>
                    <button className="secondary-btn" onClick={handleViewDetails} style={{ flex: 1, padding: "8px", fontSize: "12px" }}>
                        Details
                    </button>
                    <button 
                        className="primary-btn" 
                        onClick={handleAddToCart} 
                        disabled={product.stock <= 0}
                        style={{ flex: 1, padding: "8px", fontSize: "12px" }}
                    >
                        Add to Cart
                    </button>
                </div>

                {addedMessage && (
                    <div style={{
                        marginTop: "10px",
                        textAlign: "center",
                        fontSize: "11px",
                        color: "#2e7d32",
                        fontWeight: 600
                    }}>
                        Added to cart!
                    </div>
                )}
            </div>
        </article>
    );
}

export default ProductCard;
