import React, { useState, useEffect } from "react";
import api from "../services/api";

function AdminDashboard({ refreshTrigger, onProductChanged }) {
    const [products, setProducts] = useState([]);
    const [orders, setOrders] = useState([]);
    const [loadingProducts, setLoadingProducts] = useState(true);
    const [loadingOrders, setLoadingOrders] = useState(true);
    
    // Tab switching state
    const [activeTab, setActiveTab] = useState("products");

    // Product Form states
    const [isEditing, setIsEditing] = useState(false);
    const [currentProductId, setCurrentProductId] = useState(null);
    const [productForm, setProductForm] = useState({
        name: "",
        description: "",
        price: "",
        image: "",
        category: "Electronics",
        stock: "",
    });
    const [productFormErrors, setProductFormErrors] = useState({});
    const [productActionMessage, setProductActionMessage] = useState("");
    const [productActionError, setProductActionError] = useState("");

    useEffect(() => {
        fetchProducts();
        fetchOrders();
    }, [refreshTrigger]);

    const fetchProducts = async () => {
        setLoadingProducts(true);
        try {
            const response = await api.get("/products");
            setProducts(response.data.products);
        } catch (error) {
            console.error("Error fetching products", error);
        } finally {
            setLoadingProducts(false);
        }
    };

    const fetchOrders = async () => {
        setLoadingOrders(true);
        try {
            const token = localStorage.getItem("token");
            const config = {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            };
            const response = await api.get("/orders", config);
            setOrders(response.data.orders);
        } catch (error) {
            console.error("Error fetching orders", error);
        } finally {
            setLoadingOrders(false);
        }
    };

    const handleProductInputChange = (e) => {
        const { name, value } = e.target;
        setProductForm({
            ...productForm,
            [name]: value,
        });
        if (productFormErrors[name]) {
            setProductFormErrors({
                ...productFormErrors,
                [name]: "",
            });
        }
    };

    const validateProductForm = () => {
        const errors = {};
        if (!productForm.name.trim()) errors.name = "Product name is required";
        if (!productForm.description.trim()) errors.description = "Product description is required";
        if (productForm.price === "" || Number(productForm.price) < 0) errors.price = "Valid price is required";
        if (!productForm.image.trim()) errors.image = "Product image URL is required";
        if (!productForm.category.trim()) errors.category = "Product category is required";
        if (productForm.stock === "" || Number(productForm.stock) < 0) errors.stock = "Valid stock count is required";

        setProductFormErrors(errors);
        return Object.keys(errors).length === 0;
    };

    const handleProductSubmit = async (e) => {
        e.preventDefault();
        if (!validateProductForm()) return;

        setProductActionMessage("");
        setProductActionError("");

        try {
            const token = localStorage.getItem("token");
            const config = {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            };

            const payload = {
                ...productForm,
                price: Number(productForm.price),
                stock: Number(productForm.stock),
            };

            if (isEditing) {
                await api.put(`/products/${currentProductId}`, payload, config);
                setProductActionMessage("Product updated successfully!");
            } else {
                await api.post("/products", payload, config);
                setProductActionMessage("Product created successfully!");
            }

            resetProductForm();
            fetchProducts();
            
            if (onProductChanged) {
                onProductChanged();
            }
        } catch (error) {
            setProductActionError(error.response?.data?.message || "Failed to submit product details");
        }
    };

    const handleEditClick = (product) => {
        setIsEditing(true);
        setCurrentProductId(product._id);
        setProductForm({
            name: product.name,
            description: product.description,
            price: product.price,
            image: product.image,
            category: product.category,
            stock: product.stock,
        });
        setProductFormErrors({});
        
        // Scroll to admin section header smoothly
        const adminSec = document.getElementById("admin");
        if (adminSec) {
            adminSec.scrollIntoView({ behavior: "smooth" });
        }
    };

    const handleDeleteClick = async (productId) => {
        if (!window.confirm("Are you sure you want to delete this product?")) return;

        setProductActionMessage("");
        setProductActionError("");

        try {
            const token = localStorage.getItem("token");
            const config = {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            };

            const response = await api.delete(`/products/${productId}`, config);
            if (response.data.success) {
                setProductActionMessage("Product deleted successfully!");
                fetchProducts();
                if (onProductChanged) {
                    onProductChanged();
                }
            }
        } catch (error) {
            setProductActionError(error.response?.data?.message || "Failed to delete product");
        }
    };

    const resetProductForm = () => {
        setIsEditing(false);
        setCurrentProductId(null);
        setProductForm({
            name: "",
            description: "",
            price: "",
            image: "",
            category: "Electronics",
            stock: "",
        });
        setProductFormErrors({});
    };

    const handleOrderStatusChange = async (orderId, newStatus) => {
        try {
            const token = localStorage.getItem("token");
            const config = {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            };

            const response = await api.put(`/orders/${orderId}/status`, { status: newStatus }, config);
            if (response.data.success) {
                fetchOrders();
            }
        } catch (error) {
            alert(error.response?.data?.message || "Failed to update order status");
        }
    };

    return (
        <section id="admin" className="admin-dashboard-page" style={{ padding: "60px 0", borderTop: "1px solid #e9e5df" }}>
            <div className="dashboard-header">
                <span className="section-label">ADMIN CONTROLS</span>
                <h1 style={{ marginTop: "10px" }}>Admin Panel</h1>
                <p>Manage product catalog inventory and process incoming store orders</p>
            </div>

            {/* Tab Navigation Controls */}
            <div className="dashboard-tabs" style={{ display: "flex", gap: "10px", margin: "25px 0" }}>
                <button
                    className={`tab-btn ${activeTab === "products" ? "active" : ""}`}
                    onClick={() => setActiveTab("products")}
                    style={{ padding: "10px 20px", cursor: "pointer" }}
                >
                    Products Manager
                </button>
                <button
                    className={`tab-btn ${activeTab === "orders" ? "active" : ""}`}
                    onClick={() => setActiveTab("orders")}
                    style={{ padding: "10px 20px", cursor: "pointer" }}
                >
                    Orders Manager
                </button>
            </div>

            {/* tab-content: Products Manager */}
            {activeTab === "products" && (
                <div className="dashboard-content" style={{ display: "grid", gridTemplateColumns: "1fr 1.5fr", gap: "40px", alignItems: "start" }}>
                    {/* Add / Edit Product form wrapper */}
                    <form className="admin-form-box" onSubmit={handleProductSubmit} style={{ border: "1px solid #e9e5df", padding: "30px", background: "white" }}>
                        <h2 style={{ fontSize: "20px", fontWeight: 600, marginBottom: "20px" }}>{isEditing ? "Edit Product Details" : "Add New Product"}</h2>
                        
                        {productActionMessage && <div className="admin-success-banner" style={{ padding: "12px", background: "#e8f5e9", color: "#2e7d32", marginBottom: "20px", fontWeight: 600 }}>{productActionMessage}</div>}
                        {productActionError && <div className="admin-error-banner" style={{ padding: "12px", background: "#ffebee", color: "#c62828", marginBottom: "20px", fontWeight: 600 }}>{productActionError}</div>}

                        <div className="form-group" style={{ display: "flex", flexDirection: "column", gap: "5px", marginBottom: "15px" }}>
                            <label htmlFor="name" style={{ fontSize: "12px", fontWeight: 600 }}>Product Name</label>
                            <input
                                type="text"
                                id="name"
                                name="name"
                                value={productForm.name}
                                onChange={handleProductInputChange}
                                style={{ padding: "10px", border: "1px solid #e9e5df" }}
                                required
                            />
                            {productFormErrors.name && <span className="input-error-msg" style={{ color: "#c62828", fontSize: "11px" }}>{productFormErrors.name}</span>}
                        </div>

                        <div className="form-group" style={{ display: "flex", flexDirection: "column", gap: "5px", marginBottom: "15px" }}>
                            <label htmlFor="description" style={{ fontSize: "12px", fontWeight: 600 }}>Description</label>
                            <textarea
                                id="description"
                                name="description"
                                value={productForm.description}
                                onChange={handleProductInputChange}
                                style={{ padding: "10px", border: "1px solid #e9e5df" }}
                                rows="3"
                                required
                            ></textarea>
                            {productFormErrors.description && <span className="input-error-msg" style={{ color: "#c62828", fontSize: "11px" }}>{productFormErrors.description}</span>}
                        </div>

                        <div className="form-grid-row" style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "20px", marginBottom: "15px" }}>
                            <div className="form-group" style={{ display: "flex", flexDirection: "column", gap: "5px" }}>
                                <label htmlFor="price" style={{ fontSize: "12px", fontWeight: 600 }}>Price (₹)</label>
                                <input
                                    type="number"
                                    id="price"
                                    name="price"
                                    value={productForm.price}
                                    onChange={handleProductInputChange}
                                    style={{ padding: "10px", border: "1px solid #e9e5df" }}
                                    required
                                />
                                {productFormErrors.price && <span className="input-error-msg" style={{ color: "#c62828", fontSize: "11px" }}>{productFormErrors.price}</span>}
                            </div>

                            <div className="form-group" style={{ display: "flex", flexDirection: "column", gap: "5px" }}>
                                <label htmlFor="stock" style={{ fontSize: "12px", fontWeight: 600 }}>Stock Quantity</label>
                                <input
                                    type="number"
                                    id="stock"
                                    name="stock"
                                    value={productForm.stock}
                                    onChange={handleProductInputChange}
                                    style={{ padding: "10px", border: "1px solid #e9e5df" }}
                                    required
                                />
                                {productFormErrors.stock && <span className="input-error-msg" style={{ color: "#c62828", fontSize: "11px" }}>{productFormErrors.stock}</span>}
                            </div>
                        </div>

                        <div className="form-grid-row" style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "20px", marginBottom: "25px" }}>
                            <div className="form-group" style={{ display: "flex", flexDirection: "column", gap: "5px" }}>
                                <label htmlFor="image" style={{ fontSize: "12px", fontWeight: 600 }}>Image URL</label>
                                <input
                                    type="text"
                                    id="image"
                                    name="image"
                                    value={productForm.image}
                                    onChange={handleProductInputChange}
                                    placeholder="https://example.com/image.jpg"
                                    style={{ padding: "10px", border: "1px solid #e9e5df" }}
                                    required
                                />
                                {productFormErrors.image && <span className="input-error-msg" style={{ color: "#c62828", fontSize: "11px" }}>{productFormErrors.image}</span>}
                            </div>

                            <div className="form-group" style={{ display: "flex", flexDirection: "column", gap: "5px" }}>
                                <label htmlFor="category" style={{ fontSize: "12px", fontWeight: 600 }}>Category</label>
                                <select
                                    id="category"
                                    name="category"
                                    value={productForm.category}
                                    onChange={handleProductInputChange}
                                    style={{ padding: "10px", border: "1px solid #e9e5df" }}
                                >
                                    <option value="Electronics">Electronics</option>
                                    <option value="Fashion">Fashion</option>
                                    <option value="Home">Home</option>
                                    <option value="Accessories">Accessories</option>
                                </select>
                                {productFormErrors.category && <span className="input-error-msg" style={{ color: "#c62828", fontSize: "11px" }}>{productFormErrors.category}</span>}
                            </div>
                        </div>

                        <div className="form-actions-row" style={{ display: "flex", gap: "10px" }}>
                            <button type="submit" className="primary-btn" style={{ flex: 1, padding: "12px" }}>
                                {isEditing ? "Save Changes" : "Create Product"}
                            </button>
                            {isEditing && (
                                <button type="button" className="secondary-btn" onClick={resetProductForm} style={{ padding: "12px" }}>
                                    Cancel
                                </button>
                            )}
                        </div>
                    </form>

                    {/* Catalog listing table */}
                    <div className="catalog-wrapper" style={{ border: "1px solid #e9e5df", padding: "30px", background: "white", overflowX: "auto" }}>
                        <h2 style={{ fontSize: "20px", fontWeight: 600, marginBottom: "20px" }}>Catalog List</h2>
                        
                        {loadingProducts && <div className="loading">Loading catalog list...</div>}

                        {!loadingProducts && products.length === 0 && <p style={{ color: "#716d68" }}>No products in stock.</p>}

                        {!loadingProducts && products.length > 0 && (
                            <table className="admin-table" style={{ width: "100%", borderCollapse: "collapse" }}>
                                <thead>
                                    <tr style={{ borderBottom: "2px solid #e9e5df", textAlign: "left" }}>
                                        <th style={{ padding: "12px 8px", fontSize: "12px", color: "#716d68" }}>PRODUCT</th>
                                        <th style={{ padding: "12px 8px", fontSize: "12px", color: "#716d68" }}>PRICE</th>
                                        <th style={{ padding: "12px 8px", fontSize: "12px", color: "#716d68" }}>STOCK</th>
                                        <th style={{ padding: "12px 8px", fontSize: "12px", color: "#716d68", textAlign: "right" }}>ACTIONS</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {products.map((p) => (
                                        <tr key={p._id} style={{ borderBottom: "1px solid #e9e5df" }}>
                                            <td style={{ padding: "12px 8px", display: "flex", alignItems: "center", gap: "10px" }}>
                                                <img src={p.image} alt={p.name} style={{ width: "35px", height: "35px", objectFit: "cover" }} />
                                                <span style={{ fontSize: "13px", fontWeight: 600, color: "#171717" }}>{p.name}</span>
                                            </td>
                                            <td style={{ padding: "12px 8px", fontSize: "13px" }}>₹{p.price.toLocaleString("en-IN")}</td>
                                            <td style={{ padding: "12px 8px", fontSize: "13px" }}>{p.stock}</td>
                                            <td style={{ padding: "12px 8px", textAlign: "right" }}>
                                                <button 
                                                    className="secondary-btn" 
                                                    onClick={() => handleEditClick(p)}
                                                    style={{ padding: "5px 10px", fontSize: "11px", marginRight: "5px" }}
                                                >
                                                    Edit
                                                </button>
                                                <button 
                                                    className="primary-btn" 
                                                    onClick={() => handleDeleteClick(p._id)}
                                                    style={{ padding: "5px 10px", fontSize: "11px", background: "#c62828", border: "none" }}
                                                >
                                                    Delete
                                                </button>
                                            </td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        )}
                    </div>
                </div>
            )}

            {/* tab-content: Orders Manager */}
            {activeTab === "orders" && (
                <div className="dashboard-content" style={{ border: "1px solid #e9e5df", padding: "30px", background: "white", overflowX: "auto" }}>
                    <h2 style={{ fontSize: "20px", fontWeight: 600, marginBottom: "20px" }}>Store Orders Listing</h2>
                    
                    {loadingOrders && <div className="loading">Loading store orders...</div>}

                    {!loadingOrders && orders.length === 0 && <p style={{ color: "#716d68" }}>No customer orders placed yet.</p>}

                    {!loadingOrders && orders.length > 0 && (
                        <table className="admin-table" style={{ width: "100%", borderCollapse: "collapse" }}>
                            <thead>
                                <tr style={{ borderBottom: "2px solid #e9e5df", textAlign: "left" }}>
                                    <th style={{ padding: "12px 8px", fontSize: "12px", color: "#716d68" }}>ORDER ID / DATE</th>
                                    <th style={{ padding: "12px 8px", fontSize: "12px", color: "#716d68" }}>CUSTOMER</th>
                                    <th style={{ padding: "12px 8px", fontSize: "12px", color: "#716d68" }}>ITEMS</th>
                                    <th style={{ padding: "12px 8px", fontSize: "12px", color: "#716d68" }}>TOTAL</th>
                                    <th style={{ padding: "12px 8px", fontSize: "12px", color: "#716d68" }}>STATUS</th>
                                    <th style={{ padding: "12px 8px", fontSize: "12px", color: "#716d68", textAlign: "right" }}>UPDATE</th>
                                </tr>
                            </thead>
                            <tbody>
                                {orders.map((o) => (
                                    <tr key={o._id} style={{ borderBottom: "1px solid #e9e5df" }}>
                                        <td style={{ padding: "12px 8px" }}>
                                            <p style={{ fontSize: "11px", fontFamily: "monospace", margin: 0 }}>{o._id}</p>
                                            <p style={{ fontSize: "11px", color: "#716d68", margin: 0 }}>
                                                {new Date(o.createdAt).toLocaleDateString("en-IN")}
                                            </p>
                                        </td>
                                        <td style={{ padding: "12px 8px" }}>
                                            <p style={{ fontSize: "13px", fontWeight: 600, margin: 0 }}>{o.user?.name || "Deleted User"}</p>
                                            <p style={{ fontSize: "11px", color: "#716d68", margin: 0 }}>{o.user?.email || ""}</p>
                                        </td>
                                        <td style={{ padding: "12px 8px", fontSize: "12px" }}>
                                            {o.orderItems.map((item, idx) => (
                                                <div key={idx} style={{ margin: "2px 0" }}>
                                                    {item.name} <strong>&times; {item.quantity}</strong>
                                                </div>
                                            ))}
                                        </td>
                                        <td style={{ padding: "12px 8px", fontSize: "13px", fontWeight: 600 }}>₹{o.totalAmount.toLocaleString("en-IN")}</td>
                                        <td style={{ padding: "12px 8px" }}>
                                            <span style={{
                                                padding: "3px 8px",
                                                fontSize: "11px",
                                                fontWeight: 600,
                                                borderRadius: "2px",
                                                background: o.status === "Delivered" ? "#e8f5e9" : (o.status === "Processing" ? "#e3f2fd" : (o.status === "Shipped" ? "#fff3e0" : "#ffebee")),
                                                color: o.status === "Delivered" ? "#2e7d32" : (o.status === "Processing" ? "#1565c0" : (o.status === "Shipped" ? "#e65100" : "#c62828"))
                                            }}>
                                                {o.status}
                                            </span>
                                        </td>
                                        <td style={{ padding: "12px 8px", textAlign: "right" }}>
                                            <select
                                                value={o.status}
                                                onChange={(e) => handleOrderStatusChange(o._id, e.target.value)}
                                                style={{ padding: "5px", fontSize: "12px" }}
                                            >
                                                <option value="Pending">Pending</option>
                                                <option value="Processing">Processing</option>
                                                <option value="Shipped">Shipped</option>
                                                <option value="Delivered">Delivered</option>
                                                <option value="Cancelled">Cancelled</option>
                                            </select>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    )}
                </div>
            )}
        </section>
    );
}

export default AdminDashboard;
