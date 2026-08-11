import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useCart } from "../context/CartContext";
import { useAuth } from "../context/AuthContext";
import api from "../services/api";

function Checkout({ onOpenLogin, onOrderPlaced }) {
    const navigate = useNavigate();
    const { cartItems, getSubtotal, getTotalQuantity, clearCart } = useCart();
    const { user } = useAuth();

    const [shippingAddress, setShippingAddress] = useState({
        fullName: "",
        address: "",
        city: "",
        state: "",
        postalCode: "",
        country: "India",
    });

    const [errors, setErrors] = useState({});
    const [submitting, setSubmitting] = useState(false);
    const [submitError, setSubmitError] = useState("");
    const [successMessage, setSuccessMessage] = useState("");

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setShippingAddress({
            ...shippingAddress,
            [name]: value,
        });
        if (errors[name]) {
            setErrors({
                ...errors,
                [name]: "",
            });
        }
    };

    const validateForm = () => {
        const newErrors = {};
        if (!shippingAddress.fullName.trim()) newErrors.fullName = "Full Name is required";
        if (!shippingAddress.address.trim()) newErrors.address = "Address is required";
        if (!shippingAddress.city.trim()) newErrors.city = "City is required";
        if (!shippingAddress.state.trim()) newErrors.state = "State is required";
        if (!shippingAddress.postalCode.trim()) {
            newErrors.postalCode = "Postal code is required";
        } else if (!/^\d{5,6}$/.test(shippingAddress.postalCode)) {
            newErrors.postalCode = "Please enter a valid 5 or 6 digit postal code";
        }
        setErrors(newErrors);
        return Object.keys(newErrors).length === 0;
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        if (!validateForm()) return;

        setSubmitting(true);
        setSubmitError("");

        try {
            const token = localStorage.getItem("token");
            const config = {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            };

            const orderData = {
                orderItems: cartItems.map((item) => ({
                    product: item.product,
                    name: item.name,
                    image: item.image,
                    price: item.price,
                    quantity: item.quantity,
                })),
                shippingAddress,
            };

            await api.post("/orders", orderData, config);
            
            setSuccessMessage("Order placed successfully!");
            clearCart();
            
            // Trigger orders section refresh
            if (onOrderPlaced) {
                onOrderPlaced();
            }

            setTimeout(() => {
                setSuccessMessage("");
                navigate("/orders");
            }, 2000);
        } catch (error) {
            setSubmitError(
                error.response?.data?.message || "Order placement failed. Please try again."
            );
        } finally {
            setSubmitting(false);
        }
    };

    if (cartItems.length === 0) {
        return (
            <section id="checkout" className="checkout-page empty-checkout-container" style={{ padding: "60px 0", borderTop: "1px solid #e9e5df", textAlign: "center" }}>
                <span className="section-label">CHECKOUT</span>
                <h2 style={{ marginTop: "10px" }}>No items to checkout.</h2>
                <p style={{ color: "#716d68", marginTop: "10px" }}>Add products to your cart before proceeding.</p>
            </section>
        );
    }

    if (!user) {
        return (
            <section id="checkout" className="checkout-page" style={{ padding: "60px 0", borderTop: "1px solid #e9e5df", textAlign: "center" }}>
                <div style={{ maxWidth: "450px", margin: "0 auto", padding: "40px", border: "1px solid #e9e5df", background: "#faf9f6" }}>
                    <span className="section-label">CHECKOUT</span>
                    <h2 style={{ marginTop: "10px", marginBottom: "15px" }}>Secure Checkout</h2>
                    <p style={{ color: "#716d68", marginBottom: "25px", fontSize: "14px" }}>
                        Please sign in to your account to complete your shipping details and place an order.
                    </p>
                    <button className="primary-btn" onClick={onOpenLogin} style={{ width: "100%", padding: "12px" }}>
                        Login to Checkout
                    </button>
                </div>
            </section>
        );
    }

    return (
        <section id="checkout" className="checkout-page" style={{ padding: "60px 0", borderTop: "1px solid #e9e5df" }}>
            <div className="checkout-header">
                <span className="section-label">CHECKOUT</span>
                <h1 style={{ marginTop: "10px" }}>Shipping Details</h1>
            </div>

            {successMessage && (
                <div style={{
                    padding: "20px",
                    background: "#e8f5e9",
                    color: "#2e7d32",
                    fontSize: "15px",
                    fontWeight: 600,
                    textAlign: "center",
                    border: "1px solid #c8e6c9",
                    marginBottom: "30px"
                }}>
                    {successMessage}
                </div>
            )}

            {submitError && (
                <div className="error-message" style={{ marginBottom: "30px" }}>
                    {submitError}
                </div>
            )}

            <div className="checkout-container" style={{ display: "grid", gridTemplateColumns: "1.5fr 1fr", gap: "40px", alignItems: "start" }}>
                <form onSubmit={handleSubmit} className="shipping-form-section" style={{ border: "1px solid #e9e5df", padding: "30px", background: "white" }}>
                    <h2 style={{ fontSize: "20px", fontWeight: "600", marginBottom: "25px" }}>Delivery Address</h2>
                    
                    <div style={{ display: "grid", gridTemplateColumns: "1fr", gap: "20px" }}>
                        <div style={{ display: "flex", flexDirection: "column", gap: "5px" }}>
                            <label htmlFor="chk-name" style={{ fontSize: "12px", fontWeight: 600 }}>Full Name</label>
                            <input
                                id="chk-name"
                                type="text"
                                name="fullName"
                                value={shippingAddress.fullName}
                                onChange={handleInputChange}
                                placeholder="Receiver's name"
                                style={{ padding: "10px 12px", border: "1px solid #e9e5df" }}
                                required
                            />
                            {errors.fullName && <span style={{ color: "#c62828", fontSize: "11px" }}>{errors.fullName}</span>}
                        </div>

                        <div style={{ display: "flex", flexDirection: "column", gap: "5px" }}>
                            <label htmlFor="chk-address" style={{ fontSize: "12px", fontWeight: 600 }}>Street Address</label>
                            <input
                                id="chk-address"
                                type="text"
                                name="address"
                                value={shippingAddress.address}
                                onChange={handleInputChange}
                                placeholder="House no., street, local area"
                                style={{ padding: "10px 12px", border: "1px solid #e9e5df" }}
                                required
                            />
                            {errors.address && <span style={{ color: "#c62828", fontSize: "11px" }}>{errors.address}</span>}
                        </div>

                        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "20px" }}>
                            <div style={{ display: "flex", flexDirection: "column", gap: "5px" }}>
                                <label htmlFor="chk-city" style={{ fontSize: "12px", fontWeight: 600 }}>City</label>
                                <input
                                    id="chk-city"
                                    type="text"
                                    name="city"
                                    value={shippingAddress.city}
                                    onChange={handleInputChange}
                                    placeholder="City name"
                                    style={{ padding: "10px 12px", border: "1px solid #e9e5df" }}
                                    required
                                />
                                {errors.city && <span style={{ color: "#c62828", fontSize: "11px" }}>{errors.city}</span>}
                            </div>

                            <div style={{ display: "flex", flexDirection: "column", gap: "5px" }}>
                                <label htmlFor="chk-state" style={{ fontSize: "12px", fontWeight: 600 }}>State / Region</label>
                                <input
                                    id="chk-state"
                                    type="text"
                                    name="state"
                                    value={shippingAddress.state}
                                    onChange={handleInputChange}
                                    placeholder="State name"
                                    style={{ padding: "10px 12px", border: "1px solid #e9e5df" }}
                                    required
                                />
                                {errors.state && <span style={{ color: "#c62828", fontSize: "11px" }}>{errors.state}</span>}
                            </div>
                        </div>

                        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "20px" }}>
                            <div style={{ display: "flex", flexDirection: "column", gap: "5px" }}>
                                <label htmlFor="chk-postal" style={{ fontSize: "12px", fontWeight: 600 }}>Postal / PIN Code</label>
                                <input
                                    id="chk-postal"
                                    type="text"
                                    name="postalCode"
                                    value={shippingAddress.postalCode}
                                    onChange={handleInputChange}
                                    placeholder="e.g. 400001"
                                    style={{ padding: "10px 12px", border: "1px solid #e9e5df" }}
                                    required
                                />
                                {errors.postalCode && <span style={{ color: "#c62828", fontSize: "11px" }}>{errors.postalCode}</span>}
                            </div>

                            <div style={{ display: "flex", flexDirection: "column", gap: "5px" }}>
                                <label htmlFor="chk-country" style={{ fontSize: "12px", fontWeight: 600 }}>Country</label>
                                <input
                                    id="chk-country"
                                    type="text"
                                    name="country"
                                    value={shippingAddress.country}
                                    onChange={handleInputChange}
                                    placeholder="India"
                                    style={{ padding: "10px 12px", border: "1px solid #e9e5df" }}
                                    required
                                />
                            </div>
                        </div>
                    </div>

                    <button 
                        type="submit" 
                        className="primary-btn" 
                        disabled={submitting}
                        style={{ width: "100%", padding: "14px", marginTop: "30px" }}
                    >
                        {submitting ? "Processing Order..." : `Place Order (₹${getSubtotal().toLocaleString("en-IN")})`}
                    </button>
                </form>

                <div className="checkout-summary-card" style={{ border: "1px solid #e9e5df", padding: "30px", background: "#faf9f6" }}>
                    <h2 style={{ fontSize: "18px", fontWeight: 600, marginBottom: "20px" }}>Review Items ({getTotalQuantity()})</h2>
                    
                    <div style={{ display: "flex", flexDirection: "column", gap: "15px", maxHeight: "300px", overflowY: "auto", marginBottom: "20px" }}>
                        {cartItems.map((item) => (
                            <div key={item.product} style={{ display: "flex", gap: "15px", alignItems: "center" }}>
                                <div style={{ width: "50px", height: "50px", border: "1px solid #e9e5df", background: "#f1efeb" }}>
                                    <img src={item.image} alt={item.name} style={{ width: "100%", height: "100%", objectFit: "cover" }} />
                                </div>
                                <div style={{ flex: 1 }}>
                                    <h4 style={{ fontSize: "13px", fontWeight: 600, margin: 0 }}>{item.name}</h4>
                                    <span style={{ fontSize: "12px", color: "#716d68" }}>Qty: {item.quantity}</span>
                                </div>
                                <span style={{ fontSize: "13px", fontWeight: 600 }}>
                                    ₹{(item.price * item.quantity).toLocaleString("en-IN")}
                                </span>
                            </div>
                        ))}
                    </div>

                    <hr style={{ border: "none", borderTop: "1px solid #e9e5df", margin: "20px 0" }} />

                    <div style={{ display: "flex", justifyContent: "space-between", fontSize: "14px", margin: "10px 0" }}>
                        <span>Subtotal</span>
                        <span>₹{getSubtotal().toLocaleString("en-IN")}</span>
                    </div>
                    <div style={{ display: "flex", justifyContent: "space-between", fontSize: "14px", margin: "10px 0" }}>
                        <span>Shipping</span>
                        <span style={{ color: "#2e7d32", fontWeight: 600 }}>Free</span>
                    </div>

                    <hr style={{ border: "none", borderTop: "1px solid #e9e5df", margin: "15px 0" }} />

                    <div style={{ display: "flex", justifyContent: "space-between", fontSize: "16px", fontWeight: 600 }}>
                        <span>Total Pay</span>
                        <span>₹{getSubtotal().toLocaleString("en-IN")}</span>
                    </div>
                </div>
            </div>
        </section>
    );
}

export default Checkout;
