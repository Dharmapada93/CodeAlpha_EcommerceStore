import React from "react";

const categoryMeta = {
    Electronics: {
        description: "Premium gadgets, smart devices, and quality audio gear.",
        icon: (
            <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                <rect x="2" y="3" width="20" height="14" rx="2" ry="2" />
                <line x1="8" y1="21" x2="16" y2="21" />
                <line x1="12" y1="17" x2="12" y2="21" />
            </svg>
        )
    },
    Fashion: {
        description: "Classic wardrobe pieces, coats, and stylish casual wear.",
        icon: (
            <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                <path d="M20.59 13.41l-7.17 7.17a2 2 0 0 1-2.83 0L2 12V2h10l8.59 8.59a2 2 0 0 1 0 2.82z" />
                <line x1="7" y1="7" x2="7.01" y2="7" strokeWidth="2" />
            </svg>
        )
    },
    Home: {
        description: "Modern lighting, kitchenware, and living accessories.",
        icon: (
            <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                <path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z" />
                <polyline points="9 22 9 12 15 12 15 22" />
            </svg>
        )
    },
    Accessories: {
        description: "Genuine leather wallets, sunglasses, and items.",
        icon: (
            <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                <rect x="2" y="7" width="20" height="14" rx="2" ry="2" />
                <path d="M16 21V5a2 2 0 0 0-2-2h-4a2 2 0 0 0-2 2v16" />
            </svg>
        )
    }
};

const defaultMeta = {
    description: "Curated selection of quality lifestyle products.",
    icon: (
        <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
            <path d="M6 2L3 6v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V6l-3-4z" />
            <line x1="3" y1="6" x2="21" y2="6" />
            <path d="M16 10a4 4 0 0 1-8 0" />
        </svg>
    )
};

function CategorySection({ products, onSelectCategory }) {
    // Generate unique categories dynamically from the loaded products, excluding empty/invalid ones
    const dynamicCategories = React.useMemo(() => {
        if (!products || products.length === 0) return [];
        return [...new Set(products.map((p) => p.category))].filter(Boolean);
    }, [products]);

    // If products are still loading or unavailable, fallback to static categories for visual structure
    const categoriesToRender = dynamicCategories.length > 0 ? dynamicCategories : ["Electronics", "Fashion", "Home", "Accessories"];

    const handleCategoryClick = (category) => {
        onSelectCategory(category);
        const element = document.getElementById("products");
        if (element) {
            element.scrollIntoView({ behavior: "smooth" });
        }
    };

    return (
        <section className="home-section" style={{ borderBottom: "1px solid #e9e5df" }}>
            <div className="section-header">
                <span className="section-label">SHOP BY CATEGORY</span>
                <h2>Find what you're looking for.</h2>
                <p>Browse our catalog by product categories.</p>
            </div>

            <div className="categories-grid">
                {categoriesToRender.map((category) => {
                    const meta = categoryMeta[category] || defaultMeta;
                    return (
                        <div
                            key={category}
                            className="category-card"
                            onClick={() => handleCategoryClick(category)}
                        >
                            <div className="category-icon-wrapper">
                                {meta.icon}
                            </div>
                            <h3 className="category-title">{category}</h3>
                            <p className="category-desc">{meta.description}</p>
                            <span className="category-explore">
                                Explore Collection <span>&rarr;</span>
                            </span>
                        </div>
                    );
                })}
            </div>
        </section>
    );
}

export default CategorySection;
