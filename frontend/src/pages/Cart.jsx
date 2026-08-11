import React from "react";
import { useNavigate } from "react-router-dom";
import { useCart } from "../context/CartContext";

function Cart() {
    const { 
        cartItems, 
        increaseQuantity, 
        decreaseQuantity, 
        removeFromCart, 
        getSubtotal, 
        getTotalQuantity 
    } = useCart();

    const navigate = useNavigate();

    const handleCheckoutRedirect = (e) => {
        e.preventDefault();
        navigate("/checkout");
    };

    const handleProductsRedirect = (e) => {
        e.preventDefault();
        navigate("/products");
    };

    if (cartItems.length === 0) {
        return (
            <section id="cart" className="cart-page empty-cart-container" style={{ padding: "60px 0", borderTop: "1px solid #e9e5df" }}>
                <span className="section-label" style={{ textAlign: "center", display: "block" }}>SHOPPING CART</span>
                <h2 style={{ textAlign: "center", marginTop: "10px" }}>Your cart is empty.</h2>
                <p style={{ textAlign: "center", color: "#716d68", margin: "10px 0 25px 0" }}>Start shopping to add products.</p>
                <div style={{ display: "flex", justifyContent: "center" }}>
                    <button 
                        onClick={handleProductsRedirect} 
                        className="primary-btn continue-shopping-btn" 
                        style={{ border: "none", cursor: "pointer", display: "inline-block", textAlign: "center" }}
                    >
                        Explore Products
                    </button>
                </div>
            </section>
        );
    }

    return (
        <section id="cart" className="cart-page" style={{ padding: "60px 0", borderTop: "1px solid #e9e5df" }}>
            <div className="cart-header">
                <span className="section-label">SHOPPING CART</span>
                <div style={{ display: "flex", alignItems: "baseline", gap: "10px", marginTop: "10px" }}>
                    <h1>Your Cart</h1>
                    <span>({getTotalQuantity()} Items)</span>
                </div>
            </div>

            <div className="cart-container">
                <div className="cart-items-list">
                    {cartItems.map((item) => (
                        <div className="cart-item-row" key={item.product}>
                            <div className="cart-item-info">
                                <div className="cart-item-img-wrapper" style={{ border: "1px solid #e9e5df", overflow: "hidden", background: "#f1efeb", width: "80px", height: "80px", flexShrink: 0 }}>
                                    <img src={item.image} alt={item.name} style={{ width: "100%", height: "100%", objectFit: "cover" }} />
                                </div>
                                <div className="cart-item-details">
                                    <span style={{ fontSize: "10px", color: "#8a857e", textTransform: "uppercase", fontWeight: 700, letterSpacing: "0.5px" }}>
                                        {item.category || "General"}
                                    </span>
                                    <h3 style={{ fontSize: "16px", margin: "2px 0 6px 0" }}>{item.name}</h3>
                                    <div style={{ display: "flex", gap: "15px", alignItems: "baseline" }}>
                                        <span className="cart-item-price" style={{ fontWeight: 600 }}>
                                            ₹{item.price.toLocaleString("en-IN")}
                                        </span>
                                        <span style={{ fontSize: "12px", color: "#8a857e" }}>
                                            Subtotal: ₹{(item.price * item.quantity).toLocaleString("en-IN")}
                                        </span>
                                    </div>
                                </div>
                            </div>

                            <div className="cart-item-actions">
                                <div className="cart-quantity-selector" style={{ display: "flex", alignItems: "center", border: "1px solid #e9e5df" }}>
                                    <button 
                                        onClick={() => decreaseQuantity(item.product)}
                                        style={{ padding: "5px 12px", background: "none", border: "none", cursor: "pointer", fontSize: "16px", fontWeight: "600" }}
                                    >
                                        -
                                    </button>
                                    <span style={{ padding: "5px 15px", minWidth: "30px", textAlign: "center" }}>{item.quantity}</span>
                                    <button 
                                        onClick={() => increaseQuantity(item.product)}
                                        style={{ padding: "5px 12px", background: "none", border: "none", cursor: "pointer", fontSize: "16px", fontWeight: "600" }}
                                    >
                                        +
                                    </button>
                                </div>

                                <button 
                                    className="cart-remove-btn" 
                                    onClick={() => removeFromCart(item.product)}
                                    style={{ background: "none", border: "none", color: "#c62828", fontSize: "14px", cursor: "pointer", fontWeight: 500 }}
                                >
                                    Remove
                                </button>
                            </div>
                        </div>
                    ))}
                </div>

                <div className="cart-summary-card" style={{ border: "1px solid #e9e5df", padding: "30px", background: "#ffffff" }}>
                    <h2 style={{ fontSize: "20px", fontWeight: "600", borderBottom: "1px solid #e9e5df", paddingBottom: "15px" }}>Order Summary</h2>
                    
                    <div className="summary-row" style={{ display: "flex", justifyContent: "space-between", margin: "20px 0 10px 0", fontSize: "15px" }}>
                        <span>Subtotal</span>
                        <span>₹{getSubtotal().toLocaleString("en-IN")}</span>
                    </div>

                    <div className="summary-row" style={{ display: "flex", justifyContent: "space-between", marginBottom: "10px", fontSize: "15px" }}>
                        <span>Shipping</span>
                        <span style={{ color: "#2e7d32", fontWeight: 600 }}>Free</span>
                    </div>

                    <div className="summary-row" style={{ display: "flex", justifyContent: "space-between", marginBottom: "20px", fontSize: "15px" }}>
                        <span>Tax</span>
                        <span>₹0</span>
                    </div>

                    <hr style={{ border: "none", borderTop: "1px solid #e9e5df", margin: "20px 0" }} />

                    <div className="summary-row total-row" style={{ display: "flex", justifyContent: "space-between", fontSize: "18px", fontWeight: "600", color: "#171717", marginBottom: "30px" }}>
                        <span>Total</span>
                        <span>₹{getSubtotal().toLocaleString("en-IN")}</span>
                    </div>

                    <button 
                        onClick={handleCheckoutRedirect} 
                        className="primary-btn checkout-btn" 
                        style={{ border: "none", cursor: "pointer", display: "block", width: "100%", textAlign: "center", padding: "14px", fontWeight: "600" }}
                    >
                        Proceed to Checkout
                    </button>
                </div>
            </div>
        </section>
    );
}

export default Cart;
