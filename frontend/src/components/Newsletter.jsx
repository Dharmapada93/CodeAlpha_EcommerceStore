import React, { useState } from "react";

function Newsletter() {
    const [email, setEmail] = useState("");
    const [submitted, setSubmitted] = useState(false);
    const [error, setError] = useState("");

    const handleSubmit = (e) => {
        e.preventDefault();
        setError("");

        if (!email) {
            setError("Email address is required.");
            return;
        }

        // Standard simple email regex
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(email)) {
            setError("Please enter a valid email address.");
            return;
        }

        // Successful submission state (frontend-only validation for demo purposes)
        setSubmitted(true);
        setEmail("");
    };

    return (
        <section className="home-section" style={{ borderBottom: "1px solid #e9e5df" }}>
            <div className="newsletter-card">
                <span className="section-label">STAY IN THE LOOP</span>
                <h2>Subscribe To Our Newsletter</h2>
                <p>Get updates on new catalog arrivals, exclusive seasonal collections, and special promotional offers directly in your inbox.</p>

                {submitted ? (
                    <div className="newsletter-success">
                        Thanks for subscribing!
                    </div>
                ) : (
                    <form onSubmit={handleSubmit} className="newsletter-form" noValidate>
                        <div style={{ display: "flex", flexDirection: "column", flexGrow: 1, position: "relative" }}>
                            <input
                                type="email"
                                placeholder="Enter your email address..."
                                value={email}
                                onChange={(e) => {
                                    setEmail(e.target.value);
                                    if (error) setError("");
                                }}
                                className="newsletter-input"
                            />
                        </div>
                        <button type="submit" className="primary-btn" style={{ padding: "14px 30px" }}>
                            Subscribe
                        </button>
                    </form>
                )}

                {error && <span className="newsletter-error">{error}</span>}
            </div>
        </section>
    );
}

export default Newsletter;
