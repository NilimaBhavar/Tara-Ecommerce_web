import { useParams } from "react-router-dom";
import { useState, useContext } from "react";

import { products } from "../data/products";
import { CartContext } from "../context/cartContextValue";
import { Link } from "react-router-dom";
import CatalogImage from "../components/CatalogImage";

function ProductDetails() {

    const { id } = useParams();

    const product = products.find(
        (item) => item.id === Number(id)
    );

    const [quantity, setQuantity] = useState(1);

    const { addToCart } =
        useContext(CartContext);

    if (!product) {
        return (
            <main className="tara-page product-details-page">
                <div className="product-info-section">
                    <h1>Product not found</h1>
                    <Link to="/products">Return to products</Link>
                </div>
            </main>
        );
    }

    const handleAddToCart = () => {

        addToCart(product, quantity);

        alert(`${quantity} item added to cart`);
    };

    return (

        <main className="tara-page product-details-page">

            {/* Left */}

            <div className="product-image-section">

                <CatalogImage
                    src={product.image}
                    alt={product.name}
                    category={product.category}
                    className="product-details-image"
                />

            </div>

            {/* Right */}

            <div className="product-info-section">

                <span className="product-category">
                    {product.category}
                </span>

                <h1>{product.name}</h1>

                <h2>₹ {product.price}</h2>

                <p>
                    Premium quality daily-use product
                    available at Tara Store.
                </p>

                {/* Quantity */}

                <div className="quantity-container">

                    <button
                        onClick={() => {

                            if (quantity > 1) {

                                setQuantity(quantity - 1);
                            }
                        }}
                    >
                        -
                    </button>

                    <span>{quantity}</span>

                    <button
                        onClick={() => {

                            setQuantity(quantity + 1);
                        }}
                    >
                        +
                    </button>

                </div>

                {/* Add To Cart */}

                <button
                    className="details-cart-btn"
                    onClick={handleAddToCart}
                >

                    🛒 Add To Cart

                </button>

            </div>

        </main>
    );
}

export default ProductDetails;