import React, { useEffect, useState } from "react";
import { useAuth } from "../context/AuthContext";
import api from "../services/api";

function Orders({ refreshTrigger, onOpenLogin }) {
    const { user } = useAuth();
    const [orders, setOrders] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState("");

    useEffect(() => {
        if (!user) {
            setLoading(false);
            return;
        }

        const fetchOrders = async () => {
            setLoading(true);
            try {
                const token = localStorage.getItem("token");
                const config = {
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                };
                const response = await api.get("/orders/my-orders", config);
                setOrders(response.data.orders);
            } catch (error) {
                setError(error.response?.data?.message || "Failed to load orders history");
            } finally {
                setLoading(false);
            }
        };

        fetchOrders();
    }, [user, refreshTrigger]);

    const getStatusClass = (status) => {
        switch (status) {
            case "Delivered": return "status-delivered";
            case "Shipped": return "status-shipped";
            case "Processing": return "status-processing";
            case "Cancelled": return "status-cancelled";
            default: return "status-pending";
        }
    };

    if (!user) {
        return (
            <section id="orders" className="orders-page" style={{ padding: "60px 0", borderTop: "1px solid #e9e5df", textAlign: "center" }}>
                <div style={{ maxWidth: "450px", margin: "0 auto", padding: "40px", border: "1px solid #e9e5df", background: "#faf9f6" }}>
                    <span className="section-label">MY ORDERS</span>
                    <h2 style={{ marginTop: "10px", marginBottom: "15px" }}>Order History</h2>
                    <p style={{ color: "#716d68", marginBottom: "25px", fontSize: "14px" }}>
                        Please login to view your personal order history.
                    </p>
                    <button className="primary-btn" onClick={onOpenLogin} style={{ width: "100%", padding: "12px" }}>
                        Login to View Orders
                    </button>
                </div>
            </section>
        );
    }

    return (
        <section id="orders" className="orders-page" style={{ padding: "60px 0", borderTop: "1px solid #e9e5df" }}>
            <div className="orders-header">
                <span className="section-label">PURCHASE HISTORY</span>
                <h1 style={{ marginTop: "10px" }}>My Orders</h1>
            </div>

            {loading && <div className="loading" style={{ padding: "40px" }}>Loading your order history...</div>}

            {error && <div className="error-message">{error}</div>}

            {!loading && !error && orders.length === 0 && (
                <div className="empty-orders-view" style={{ textAlign: "center", padding: "40px 0" }}>
                    <h3 style={{ fontSize: "18px", color: "#171717", marginBottom: "10px" }}>No orders placed yet.</h3>
                    <p style={{ color: "#716d68", marginBottom: "20px" }}>Your purchases will be listed here after checkout.</p>
                </div>
            )}

            {!loading && orders.length > 0 && (
                <div className="orders-list-wrapper" style={{ display: "flex", flexDirection: "column", gap: "25px" }}>
                    {orders.map((order) => (
                        <div className="order-card" key={order._id}>
                            <div className="order-card-header">
                                <div className="order-header-meta">
                                    <div>
                                        <span className="meta-label">ORDER PLACED</span>
                                        <span className="meta-value">
                                            {new Date(order.createdAt).toLocaleDateString("en-IN", {
                                                year: "numeric",
                                                month: "long",
                                                day: "numeric",
                                            })}
                                        </span>
                                    </div>
                                    <div>
                                        <span className="meta-label">TOTAL AMOUNT</span>
                                        <span className="meta-value font-semibold">
                                            ₹{order.totalAmount.toLocaleString("en-IN")}
                                        </span>
                                    </div>
                                    <div>
                                        <span className="meta-label">ORDER ID</span>
                                        <span className="meta-value font-mono">{order._id}</span>
                                    </div>
                                </div>
                                
                                <span className={`status-badge ${getStatusClass(order.status)}`}>
                                    {order.status}
                                </span>
                            </div>

                            <div className="order-card-body">
                                <div className="order-items-list-display">
                                    {order.orderItems.map((item, idx) => (
                                        <div className="order-item-row-display" key={item.product?._id || idx}>
                                            <div className="order-item-img-wrapper" style={{ border: "1px solid #e9e5df", overflow: "hidden", background: "#f1efeb" }}>
                                                <img src={item.image} alt={item.name} />
                                            </div>
                                            <div className="order-item-details-display">
                                                <h4>{item.name}</h4>
                                                <div className="order-item-price-display">
                                                    <span>₹{item.price.toLocaleString("en-IN")}</span>
                                                    <span className="divider">|</span>
                                                    <span>Qty: {item.quantity}</span>
                                                </div>
                                            </div>
                                        </div>
                                    ))}
                                </div>

                                <div className="order-shipping-summary" style={{ background: "#faf9f6", padding: "20px", borderLeft: "4px solid #716d68" }}>
                                    <h4 style={{ fontSize: "12px", letterSpacing: "1px", textTransform: "uppercase", color: "#716d68", marginBottom: "8px" }}>
                                        SHIPPING TO
                                    </h4>
                                    <p style={{ fontWeight: 600, color: "#171717", marginBottom: "4px" }}>
                                        {order.shippingAddress.fullName}
                                    </p>
                                    <p style={{ fontSize: "13px", color: "#716d68", lineHeight: "1.4" }}>
                                        {order.shippingAddress.address}, {order.shippingAddress.city}, {order.shippingAddress.state} - {order.shippingAddress.postalCode}, {order.shippingAddress.country}
                                    </p>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            )}
        </section>
    );
}

export default Orders;
