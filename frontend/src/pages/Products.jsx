import React, { useEffect, useState } from "react";
import ProductCard from "../components/ProductCard";
import api from "../services/api";

function Products({ 
    onViewDetails, 
    selectedCategory: propSelectedCategory, 
    setSelectedCategory: propSetSelectedCategory,
    products: propProducts,
    loading: propLoading,
    error: propError
}) {
    const [internalProducts, setInternalProducts] = useState([]);
    const [filteredProducts, setFilteredProducts] = useState([]);
    const [internalLoading, setInternalLoading] = useState(true);
    const [internalError, setInternalError] = useState("");

    // Search, filter, and sort states
    const [searchTerm, setSearchTerm] = useState("");
    const [internalSelectedCategory, setInternalSelectedCategory] = useState("All");
    const [sortBy, setSortBy] = useState("newest");

    // Resolve resolved values from props or local state
    const products = propProducts !== undefined ? propProducts : internalProducts;
    const loading = propLoading !== undefined ? propLoading : internalLoading;
    const error = propError !== undefined ? propError : internalError;

    const selectedCategory = propSelectedCategory !== undefined ? propSelectedCategory : internalSelectedCategory;
    const setSelectedCategory = propSetSelectedCategory !== undefined ? propSetSelectedCategory : setInternalSelectedCategory;

    // Generate unique categories dynamically from products
    const categories = React.useMemo(() => {
        if (!products || products.length === 0) return ["All"];
        const uniqueCategories = [...new Set(products.map((p) => p.category))].filter(Boolean);
        return ["All", ...uniqueCategories];
    }, [products]);

    useEffect(() => {
        // Skip fetching if products are provided as prop
        if (propProducts !== undefined) return;

        const fetchProducts = async () => {
            try {
                const response = await api.get("/products");
                setInternalProducts(response.data.products);
            } catch (error) {
                setInternalError(
                    error.response?.data?.message ||
                        "Unable to load products"
                );
            } finally {
                setInternalLoading(false);
            }
        };

        fetchProducts();
    }, [propProducts]);

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
                            {categories.map((cat) => (
                                <option key={cat} value={cat}>
                                    {cat === "All" ? "All Categories" : cat}
                                </option>
                            ))}
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
