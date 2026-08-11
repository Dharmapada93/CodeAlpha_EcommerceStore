import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Navbar from "../components/Navbar";
import AdminDashboard from "./AdminDashboard";
import Footer from "../components/Footer";

// Context
import { useAuth } from "../context/AuthContext";

// API Services
import api from "../services/api";

// Landing Page Components
import BenefitsSection from "../components/BenefitsSection";
import CategorySection from "../components/CategorySection";
import FeaturedProducts from "../components/FeaturedProducts";
import PromoBanner from "../components/PromoBanner";
import NewArrivals from "../components/NewArrivals";
import WhyShopSection from "../components/WhyShopSection";
import BestSellers from "../components/BestSellers";
import Testimonials from "../components/Testimonials";
import Newsletter from "../components/Newsletter";
import FinalCTA from "../components/FinalCTA";

function Home() {
    const { user } = useAuth();
    const navigate = useNavigate();
    
    // Refresh trigger to sync state updates (admin modifications)
    const [refreshTrigger, setRefreshTrigger] = useState(0);

    // Dynamic products list for landing page sections
    const [products, setProducts] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState("");

    useEffect(() => {
        const fetchProducts = async () => {
            try {
                setLoading(true);
                setError("");
                const response = await api.get("/products");
                setProducts(response.data.products || []);
            } catch (err) {
                setError(
                    err.response?.data?.message ||
                        "Unable to load products. Please try again."
                );
            } finally {
                setLoading(false);
            }
        };

        fetchProducts();
    }, [refreshTrigger]);

    const handleOpenLogin = () => {
        navigate("/login");
    };

    const handleOpenRegister = () => {
        navigate("/signup");
    };

    const handleOpenDetails = (productId) => {
        navigate(`/product/${productId}`);
    };

    const handleProductChanged = () => {
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
                            <button
                                onClick={() => navigate("/products")}
                                className="primary-btn"
                                style={{ border: "none", cursor: "pointer" }}
                            >
                                Explore Products
                            </button>

                            {!user && (
                                <button
                                    onClick={handleOpenRegister}
                                    className="secondary-btn"
                                    style={{ cursor: "pointer" }}
                                >
                                    Create Account
                                </button>
                            )}
                        </div>
                    </div>
                </section>

                <BenefitsSection />

                <CategorySection 
                    products={products}
                    onSelectCategory={(category) => {
                        navigate("/products", { state: { initialCategory: category } });
                    }}
                />

                <FeaturedProducts 
                    products={products}
                    loading={loading}
                    error={error}
                    onViewDetails={handleOpenDetails}
                    onClearFilters={() => {}}
                />

                <PromoBanner 
                    onExplore={() => navigate("/products")}
                />

                <NewArrivals 
                    products={products}
                    loading={loading}
                    error={error}
                    onViewDetails={handleOpenDetails}
                    onClearFilters={() => {}}
                />

                <WhyShopSection />

                <BestSellers 
                    products={products}
                    loading={loading}
                    error={error}
                    onViewDetails={handleOpenDetails}
                    onClearFilters={() => {}}
                />

                <Testimonials />

                <Newsletter />

                <FinalCTA 
                    onExplore={() => navigate("/products")}
                    onOpenRegister={handleOpenRegister}
                />

                {/* Conditional Admin Dashboard Section */}
                {user?.role === "admin" && (
                    <div id="admin" className="content-container">
                        <AdminDashboard 
                            refreshTrigger={refreshTrigger}
                            onProductChanged={handleProductChanged}
                        />
                    </div>
                )}
            </main>

            <Footer />
        </div>
    );
}

export default Home;
