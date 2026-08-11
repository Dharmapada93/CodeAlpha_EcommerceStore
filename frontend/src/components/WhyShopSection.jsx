import React from "react";

function WhyShopSection() {
    const reasons = [
        {
            title: "Quality Products",
            description: "We source our products only from trusted brands and verified manufacturers.",
            icon: (
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2" />
                </svg>
            )
        },
        {
            title: "Simple Shopping",
            description: "A smooth browsing, carting, checkout, and ordering flow from start to finish.",
            icon: (
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <circle cx="9" cy="21" r="1" />
                    <circle cx="20" cy="21" r="1" />
                    <path d="M1 1h4l2.68 13.39a2 2 0 0 0 2 1.61h9.72a2 2 0 0 0 2-1.61L23 6H6" />
                </svg>
            )
        },
        {
            title: "Secure Experience",
            description: "Encrypted checkout processing and full protection of personal data.",
            icon: (
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />
                </svg>
            )
        },
        {
            title: "Customer First",
            description: "Our dedicated support team is here to assist you with any questions or issues.",
            icon: (
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M21 11.5a8.38 8.38 0 0 1-.9 3.8 8.5 8.5 0 0 1-7.6 4.7 8.38 8.38 0 0 1-3.8-.9L3 21l1.9-5.7a8.38 8.38 0 0 1-.9-3.8 8.5 8.5 0 0 1 4.7-7.6 8.38 8.38 0 0 1 3.8-.9h.5a8.48 8.48 0 0 1 8 8v.5z" />
                </svg>
            )
        }
    ];

    return (
        <section className="home-section" style={{ borderBottom: "1px solid #e9e5df" }}>
            <div className="section-header">
                <span className="section-label">WHY SHOPSPHERE</span>
                <h2>A better way to shop.</h2>
                <p>We redefine modern e-commerce through seamless and reliable standards.</p>
            </div>

            <div className="why-grid">
                {reasons.map((reason, index) => (
                    <div key={index} className="why-col">
                        <div className="why-icon-wrapper">
                            {reason.icon}
                        </div>
                        <h3>{reason.title}</h3>
                        <p>{reason.description}</p>
                    </div>
                ))}
            </div>
        </section>
    );
}

export default WhyShopSection;
