import { useState } from "react";
import { useSearchParams } from "react-router-dom";

import { products as productsData } from "../data/products";

import ProductCard from "../components/ProductCard";

function Products() {
    const [searchParams, setSearchParams] = useSearchParams();

    const [search, setSearch] = useState("");

    const category = searchParams.get("category") || "All";
    const categories = [...new Set(productsData.map((product) => product.category))];

    // Filter Products

    const filteredProducts = productsData.filter((product) => {

        const matchesSearch = product.name
            .toLowerCase()
            .includes(search.toLowerCase());

        const matchesCategory =
            category === "All" || product.category === category;

        return matchesSearch && matchesCategory;
    });

    return (
        <main className="tara-page products-page">

            <header className="page-heading">
                <p className="page-eyebrow">THE TARA COLLECTION</p>
                <h1>Shop everyday favourites</h1>
                <p>Find a little something for every moment.</p>
            </header>

            <div className="search-filter-container">

                <input
                    type="text"
                    placeholder="🔍 Search products..."
                    value={search}
                    onChange={(e) => setSearch(e.target.value)}
                />

                <select
                    className="category-select"
                    value={category}
                    onChange={(e) => {
                        if (e.target.value === "All") {
                            setSearchParams({});
                        } else {
                            setSearchParams({ category: e.target.value });
                        }
                    }}
                >
                    <option value="All">All Categories</option>
                    {categories.map((productCategory) => (
                        <option key={productCategory} value={productCategory}>
                            {productCategory}
                        </option>
                    ))}
                </select>

            </div>

            <div className="products-grid">

                {filteredProducts.length > 0 ? (

                    filteredProducts.map((product) => (
                        <ProductCard
                            key={product.id}
                            product={product}
                        />
                    ))

                ) : (

                    <section className="products-empty">
                        <h2>No products found</h2>
                        <p>Try a different search or category to find your everyday favourites.</p>
                        <button
                            type="button"
                            className="tara-action-button"
                            onClick={() => {
                                setSearch("");
                                setSearchParams({});
                            }}
                        >
                            Clear filters
                        </button>
                    </section>

                )}

            </div>

        </main>
    );
}

export default Products;