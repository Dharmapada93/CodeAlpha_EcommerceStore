import React from "react";

function Testimonials() {
    const reviews = [
        {
            rating: "★★★★★",
            quote: "Great quality products and a very smooth shopping experience. The noise-cancelling headphones are exceptional!",
            name: "Sarah Jenkins",
            status: "Verified Customer"
        },
        {
            rating: "★★★★★",
            quote: "I love the minimalist design aesthetics of ShopSphere. Fast delivery, secure payments, and easy returns.",
            name: "Marcus Aurelius",
            status: "Verified Customer"
        },
        {
            rating: "★★★★★",
            quote: "Excellent customer service and premium quality items. The ceramic mugs are beautiful and durable.",
            name: "Elena Rostova",
            status: "Verified Customer"
        }
    ];

    return (
        <section className="home-section" style={{ borderBottom: "1px solid #e9e5df" }}>
            <div className="section-header" style={{ textAlign: "center", marginBottom: "50px" }}>
                <span className="section-label">WHAT OUR CUSTOMERS SAY</span>
                <h2>Customer Reviews</h2>
                <p style={{ maxWidth: "550px", margin: "8px auto 0" }}>
                    Read verified feedback from our customer community. (Sample demo reviews for internship showcase)
                </p>
            </div>

            <div className="testimonials-grid">
                {reviews.map((review, index) => (
                    <div key={index} className="testimonial-card">
                        <div className="stars">{review.rating}</div>
                        <p className="testimonial-quote">"{review.quote}"</p>
                        <div className="testimonial-author">
                            <span className="author-name">{review.name}</span>
                            <span className="author-status">{review.status}</span>
                        </div>
                    </div>
                ))}
            </div>
        </section>
    );
}

export default Testimonials;
