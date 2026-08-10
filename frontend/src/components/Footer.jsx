import React from "react";

function Footer() {
    const handleScrollTo = (e, sectionId) => {
        e.preventDefault();
        if (sectionId === "top") {
            window.scrollTo({ top: 0, behavior: "smooth" });
        } else {
            const element = document.getElementById(sectionId);
            if (element) {
                element.scrollIntoView({ behavior: "smooth" });
            }
        }
    };

    return (
        <footer className="footer">
            <div className="footer-container">
                <div className="footer-brand">
                    <h3>ShopSphere</h3>
                    <p>
                        A premium e-commerce experience providing quality products with simple, secure, and seamless shopping.
                    </p>
                </div>

                <div className="footer-links">
                    <h4>Quick Links</h4>
                    <ul>
                        <li><a href="#top" onClick={(e) => handleScrollTo(e, "top")}>Home</a></li>
                        <li><a href="#products" onClick={(e) => handleScrollTo(e, "products")}>Products</a></li>
                        <li><a href="#orders" onClick={(e) => handleScrollTo(e, "orders")}>My Orders</a></li>
                        <li><a href="#cart" onClick={(e) => handleScrollTo(e, "cart")}>Shopping Cart</a></li>
                    </ul>
                </div>

                <div className="footer-contact">
                    <h4>Contact Us</h4>
                    <p>Email: support@shopsphere.com</p>
                    <p>Phone: +91 98765 43210</p>
                    <p>Address: Bhubaneswar, Odisha, India</p>
                </div>
            </div>

            <div className="footer-bottom">
                <p>&copy; {new Date().getFullYear()} ShopSphere. All rights reserved.</p>
                <p className="attribution">Developed for the CodeAlpha Full Stack Development Internship.</p>
            </div>
        </footer>
    );
}

export default Footer;
