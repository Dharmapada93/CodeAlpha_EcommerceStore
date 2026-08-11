import React, { useState, useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import Navbar from "../components/Navbar";
import Products from "./Products";
import Footer from "../components/Footer";

function ProductsPage() {
    const navigate = useNavigate();
    const location = useLocation();
    const [selectedCategory, setSelectedCategory] = useState("All");

    useEffect(() => {
        if (location.state?.initialCategory) {
            setSelectedCategory(location.state.initialCategory);
            // Replace location state to avoid sticky filter on back button or refresh
            navigate(location.pathname, { replace: true, state: {} });
        }
    }, [location.state, navigate]);

    const handleViewDetails = (productId) => {
        navigate(`/product/${productId}`);
    };

    return (
        <div style={{ display: "flex", flexDirection: "column", minHeight: "100vh" }}>
            <Navbar />
            <main style={{ flex: 1 }}>
                <div className="content-container">
                    <Products 
                        onViewDetails={handleViewDetails} 
                        selectedCategory={selectedCategory}
                        setSelectedCategory={setSelectedCategory}
                    />
                </div>
            </main>
            <Footer />
        </div>
    );
}

export default ProductsPage;
