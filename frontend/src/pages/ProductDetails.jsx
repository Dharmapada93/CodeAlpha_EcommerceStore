import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import api from "../services/api";
import { useCart } from "../context/CartContext";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";

function ProductDetails({ productId: propProductId, onClose }) {
    const { id } = useParams();
    const navigate = useNavigate();
    const productId = propProductId || id;
    const isModal = !!onClose || !!propProductId;

    const { addToCart, cartItems } = useCart();
    const [product, setProduct] = useState(null);
    const [quantity, setQuantity] = useState(1);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState("");
    const [addedMessage, setAddedMessage] = useState(false);

    useEffect(() => {
        if (!productId) return;
        const fetchProduct = async () => {
            setLoading(true);
            try {
                const response = await api.get(`/products/${productId}`);
                setProduct(response.data.product);
            } catch (error) {
                setError(error.response?.data?.message || "Product not found");
            } finally {
                setLoading(false);
            }
        };

        fetchProduct();
    }, [productId]);

    const handleAddToCart = () => {
        if (!product) return;
        addToCart(product, quantity);
        setAddedMessage(true);
        setTimeout(() => setAddedMessage(false), 2000);
    };

    const cartItem = cartItems.find((item) => item.product === productId);
    const alreadyInCart = cartItem ? cartItem.quantity : 0;
    const maxAvailable = product ? product.stock - alreadyInCart : 0;

    const renderContent = () => {
        if (loading) return <div className="loading" style={{ padding: "40px" }}>Loading details...</div>;
        if (error) return <div className="error-message" style={{ padding: "40px" }}>{error}</div>;
        if (!product) return null;

        return (
            <div className="product-details-content" style={{ display: "grid", gridTemplateColumns: isModal ? "1fr 1fr" : "1fr 1.2fr", gap: isModal ? "30px" : "60px", marginTop: "20px" }}>
                <div className="details-image-wrapper" style={{ border: "1px solid #e9e5df", overflow: "hidden", background: "#f1efeb" }}>
                    <img src={product.image} alt={product.name} style={{ width: "100%", height: "auto", display: "block" }} />
                </div>
                
                <div className="details-info" style={{ display: "flex", flexDirection: "column", justifyContent: "space-between" }}>
                    <div>
                        <span className="product-category" style={{ fontSize: "12px", textTransform: "uppercase", letterSpacing: "1px", color: "#716d68" }}>
                            {product.category}
                        </span>
                        <h2 style={{ fontSize: isModal ? "24px" : "32px", fontWeight: "600", marginTop: "5px", marginBottom: "15px", color: "#171717" }}>
                            {product.name}
                        </h2>
                        <p className="details-price" style={{ fontSize: "22px", fontWeight: "600", color: "#171717", marginBottom: "20px" }}>
                            ₹{product.price.toLocaleString("en-IN")}
                        </p>
                        <p className="details-desc" style={{ color: "#716d68", lineHeight: "1.6", fontSize: "14px", marginBottom: "25px" }}>
                            {product.description}
                        </p>
                    </div>

                    <div>
                        <p style={{ fontSize: "14px", marginBottom: "15px" }}>
                            <strong>Stock Availability: </strong>
                            {product.stock > 0 ? (
                                <span style={{ color: "#2e7d32", fontWeight: 600 }}>In Stock ({product.stock} units)</span>
                            ) : (
                                <span style={{ color: "#c62828", fontWeight: 600 }}>Out of Stock</span>
                            )}
                        </p>

                        {product.stock > 0 && (
                            <div className="details-purchase-controls" style={{ display: "flex", flexDirection: "column", gap: "10px" }}>
                                {maxAvailable > 0 ? (
                                    <>
                                        <div style={{ display: "flex", alignItems: "center", gap: "15px" }}>
                                            <span style={{ fontSize: "14px" }}>Quantity:</span>
                                            <div style={{ display: "flex", alignItems: "center", border: "1px solid #e9e5df" }}>
                                                <button 
                                                    onClick={() => setQuantity(q => Math.max(1, q - 1))}
                                                    style={{ padding: "5px 12px", background: "none", border: "none", cursor: "pointer" }}
                                                >
                                                    -
                                                </button>
                                                <span style={{ padding: "5px 15px", minWidth: "40px", textAlign: "center" }}>{quantity}</span>
                                                <button 
                                                    onClick={() => setQuantity(q => Math.min(maxAvailable, q + 1))}
                                                    style={{ padding: "5px 12px", background: "none", border: "none", cursor: "pointer" }}
                                                >
                                                    +
                                                </button>
                                            </div>
                                        </div>

                                        <button className="primary-btn" onClick={handleAddToCart} style={{ padding: "12px", marginTop: "10px", border: "none", cursor: "pointer", fontWeight: "600" }}>
                                            Add to Cart
                                        </button>
                                    </>
                                ) : (
                                    <p style={{ color: "#716d68", fontSize: "13px", fontStyle: "italic" }}>
                                        You already have the maximum available stock ({product.stock}) in your cart.
                                    </p>
                                )}
                            </div>
                        )}

                        {addedMessage && (
                            <div style={{
                                marginTop: "10px",
                                textAlign: "center",
                                fontSize: "13px",
                                color: "#2e7d32",
                                fontWeight: 600
                            }}>
                                Added {quantity} item(s) to cart successfully!
                            </div>
                        )}
                    </div>
                </div>
            </div>
        );
    };

    if (isModal) {
        return (
            <div className="modal-backdrop" onClick={onClose}>
                <div className="modal-content-wrapper" onClick={(e) => e.stopPropagation()} style={{ maxWidth: "800px" }}>
                    <button className="modal-close-btn" onClick={onClose}>&times;</button>
                    {renderContent()}
                </div>
            </div>
        );
    }

    return (
        <div style={{ display: "flex", flexDirection: "column", minHeight: "100vh" }}>
            <Navbar />
            <main style={{ flex: 1, padding: "40px 32px 80px", maxWidth: "1280px", margin: "0 auto", width: "100%" }}>
                <button 
                    onClick={() => navigate(-1)} 
                    className="secondary-btn" 
                    style={{ marginBottom: "30px", border: "1px solid #cfc9c1", cursor: "pointer", padding: "10px 20px" }}
                >
                    &larr; Back to Shop
                </button>
                {renderContent()}
            </main>
            <Footer />
        </div>
    );
}

export default ProductDetails;
