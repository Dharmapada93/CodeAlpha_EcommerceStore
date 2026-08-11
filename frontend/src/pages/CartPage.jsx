import React from "react";
import Navbar from "../components/Navbar";
import Cart from "./Cart";
import Footer from "../components/Footer";

function CartPage() {
    return (
        <div style={{ display: "flex", flexDirection: "column", minHeight: "100vh" }}>
            <Navbar />
            <main style={{ flex: 1 }}>
                <div className="content-container">
                    <Cart />
                </div>
            </main>
            <Footer />
        </div>
    );
}

export default CartPage;
