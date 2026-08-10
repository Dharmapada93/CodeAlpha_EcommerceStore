import React, { useState } from "react";
import Navbar from "../components/Navbar";
import Products from "./Products";
import Cart from "./Cart";
import Checkout from "./Checkout";
import Orders from "./Orders";
import AdminDashboard from "./AdminDashboard";
import Footer from "../components/Footer";

// Modals
import ProductDetails from "./ProductDetails";
import Login from "./Login";
import Register from "./Register";

// Context
import { useAuth } from "../context/AuthContext";

function Home() {
    const { user } = useAuth();
    
    // Modal states
    const [activeModal, setActiveModal] = useState(null); // 'login' | 'register' | 'details' | null
    const [selectedProductId, setSelectedProductId] = useState(null);
    
    // Refresh trigger to sync state updates (orders checkout, admin modifications)
    const [refreshTrigger, setRefreshTrigger] = useState(0);

    const handleOpenLogin = () => {
        setActiveModal("login");
    };

    const handleOpenRegister = () => {
        setActiveModal("register");
    };

    const handleOpenDetails = (productId) => {
        setSelectedProductId(productId);
        setActiveModal("details");
    };

    const handleCloseModal = () => {
        setActiveModal(null);
        setSelectedProductId(null);
    };

    const handleProductChanged = () => {
        setRefreshTrigger((prev) => prev + 1);
    };

    const handleOrderPlaced = () => {
        setRefreshTrigger((prev) => prev + 1);
    };

    const handleScrollToSection = (e, sectionId) => {
        e.preventDefault();
        const element = document.getElementById(sectionId);
        if (element) {
            element.scrollIntoView({ behavior: "smooth" });
        }
    };

    return (
        <div id="top" style={{ display: "flex", flexDirection: "column", minHeight: "100vh" }}>
            <Navbar 
                onOpenLogin={handleOpenLogin} 
                onOpenRegister={handleOpenRegister} 
            />

            <main style={{ flex: 1 }}>
                {/* Hero Section */}
                <section className="hero">
                    <div className="hero-content">
                        <span className="section-label">
                            WELCOME TO SHOPSPHERE
                        </span>

                        <h1>
                            Discover Products
                            <br />
                            You'll Love.
                        </h1>

                        <p>
                            Shop quality products with a simple,
                            secure and seamless shopping experience.
                        </p>

                        <div className="hero-actions">
                            <a
                                href="#products"
                                onClick={(e) => handleScrollToSection(e, "products")}
                                className="primary-btn"
                                style={{ textDecoration: "none" }}
                            >
                                Explore Products
                            </a>

                            {!user && (
                                <button
                                    onClick={handleOpenRegister}
                                    className="secondary-btn"
                                >
                                    Create Account
                                </button>
                            )}
                        </div>
                    </div>
                </section>

                {/* Products Catalog Grid Section */}
                <div className="content-container">
                    <Products onViewDetails={handleOpenDetails} key={`products-grid-${refreshTrigger}`} />
                </div>

                {/* Shopping Cart Section */}
                <div className="content-container">
                    <Cart />
                </div>

                {/* Checkout Section */}
                <div className="content-container">
                    <Checkout 
                        onOpenLogin={handleOpenLogin} 
                        onOrderPlaced={handleOrderPlaced} 
                    />
                </div>

                {/* Orders History Section */}
                <div className="content-container">
                    <Orders 
                        refreshTrigger={refreshTrigger}
                        onOpenLogin={handleOpenLogin}
                    />
                </div>

                {/* Conditional Admin Dashboard Section */}
                {user?.role === "admin" && (
                    <div className="content-container">
                        <AdminDashboard 
                            refreshTrigger={refreshTrigger}
                            onProductChanged={handleProductChanged}
                        />
                    </div>
                )}
            </main>

            <Footer />

            {/* Modals Mounting */}
            {activeModal === "login" && (
                <Login 
                    onClose={handleCloseModal} 
                    onSwitchToRegister={handleOpenRegister} 
                />
            )}

            {activeModal === "register" && (
                <Register 
                    onClose={handleCloseModal} 
                    onSwitchToLogin={handleOpenLogin} 
                />
            )}

            {activeModal === "details" && selectedProductId && (
                <ProductDetails 
                    productId={selectedProductId} 
                    onClose={handleCloseModal} 
                />
            )}
        </div>
    );
}

export default Home;
