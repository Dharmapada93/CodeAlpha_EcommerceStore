import React, { useEffect, useState } from "react";
import ProductCard from "../components/ProductCard";
import api from "../services/api";

function Products({ onViewDetails }) {
    const [products, setProducts] = useState([]);
    const [filteredProducts, setFilteredProducts] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState("");

    // Search, filter, and sort states
    const [searchTerm, setSearchTerm] = useState("");
    const [selectedCategory, setSelectedCategory] = useState("All");
    const [sortBy, setSortBy] = useState("newest");

    useEffect(() => {
        const fetchProducts = async () => {
            try {
                const response = await api.get("/products");
                setProducts(response.data.products);
                setFilteredProducts(response.data.products);
            } catch (error) {
                setError(
                    error.response?.data?.message ||
                        "Unable to load products"
                );
            } finally {
                setLoading(false);
            }
        };

        fetchProducts();
    }, []);

    // Perform filter and sort operations whenever filters or original products change
    useEffect(() => {
        let result = [...products];

        // 1. Text Search
        if (searchTerm.trim() !== "") {
            result = result.filter((product) =>
                product.name.toLowerCase().includes(searchTerm.toLowerCase())
            );
        }

        // 2. Category Filter
        if (selectedCategory !== "All") {
            result = result.filter(
                (product) => product.category === selectedCategory
            );
        }

        // 3. Sorting
        if (sortBy === "price-low") {
            result.sort((a, b) => a.price - b.price);
        } else if (sortBy === "price-high") {
            result.sort((a, b) => b.price - a.price);
        } else if (sortBy === "newest") {
            result.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));
        }

        setFilteredProducts(result);
    }, [products, searchTerm, selectedCategory, sortBy]);

    return (
        <section id="products" className="products-page" style={{ padding: "60px 0" }}>
            <div className="products-header">
                <span className="section-label">OUR COLLECTION</span>
                <h1>Discover Our Products</h1>
                <p>Explore our carefully selected collection of quality products.</p>
            </div>

            {/* Filter Bar Controls */}
            <div className="filter-bar">
                <div className="search-box-wrapper">
                    <input
                        type="text"
                        placeholder="Search products by name..."
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                        className="search-input"
                    />
                </div>

                <div className="filter-controls-row">
                    <div className="filter-select-group">
                        <label htmlFor="category-select">Category:</label>
                        <select
                            id="category-select"
                            value={selectedCategory}
                            onChange={(e) => setSelectedCategory(e.target.value)}
                        >
                            <option value="All">All Categories</option>
                            <option value="Electronics">Electronics</option>
                            <option value="Fashion">Fashion</option>
                            <option value="Home">Home</option>
                            <option value="Accessories">Accessories</option>
                        </select>
                    </div>

                    <div className="filter-select-group">
                        <label htmlFor="sort-select">Sort By:</label>
                        <select
                            id="sort-select"
                            value={sortBy}
                            onChange={(e) => setSortBy(e.target.value)}
                        >
                            <option value="newest">Newest First</option>
                            <option value="price-low">Price: Low to High</option>
                            <option value="price-high">Price: High to Low</option>
                        </select>
                    </div>
                </div>
            </div>

            {loading && <div className="loading">Loading products...</div>}

            {error && <div className="error-message">{error}</div>}

            {!loading && !error && filteredProducts.length === 0 && (
                <div className="empty-products">
                    No products found matching your search.
                </div>
            )}

            {!loading && filteredProducts.length > 0 && (
                <div className="products-grid">
                    {filteredProducts.map((product) => (
                        <ProductCard
                            key={product._id}
                            product={product}
                            onViewDetails={onViewDetails}
                        />
                    ))}
                </div>
            )}
        </section>
    );
}

export default Products;
