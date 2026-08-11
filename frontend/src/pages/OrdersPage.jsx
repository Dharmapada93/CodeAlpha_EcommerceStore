import React from "react";
import { useNavigate } from "react-router-dom";
import Navbar from "../components/Navbar";
import Orders from "./Orders";
import Footer from "../components/Footer";

function OrdersPage() {
    const navigate = useNavigate();

    const handleOpenLogin = () => {
        navigate("/login");
    };

    return (
        <div style={{ display: "flex", flexDirection: "column", minHeight: "100vh" }}>
            <Navbar />
            <main style={{ flex: 1 }}>
                <div className="content-container">
                    <Orders 
                        refreshTrigger={0}
                        onOpenLogin={handleOpenLogin}
                    />
                </div>
            </main>
            <Footer />
        </div>
    );
}

export default OrdersPage;
