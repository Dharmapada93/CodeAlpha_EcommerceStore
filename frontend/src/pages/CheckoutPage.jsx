import React from "react";
import { useNavigate } from "react-router-dom";
import Navbar from "../components/Navbar";
import Checkout from "./Checkout";
import Footer from "../components/Footer";

function CheckoutPage() {
    const navigate = useNavigate();

    const handleOpenLogin = () => {
        navigate("/login");
    };

    return (
        <div style={{ display: "flex", flexDirection: "column", minHeight: "100vh" }}>
            <Navbar />
            <main style={{ flex: 1 }}>
                <div className="content-container">
                    <Checkout 
                        onOpenLogin={handleOpenLogin}
                        onOrderPlaced={() => {}}
                    />
                </div>
            </main>
            <Footer />
        </div>
    );
}

export default CheckoutPage;
