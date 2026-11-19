import { Link } from "react-router-dom";

import { useContext } from "react";

import { CartContext } from "../context/cartContextValue";
import CatalogImage from "./CatalogImage";

function ProductCard({ product }) {

    const { addToCart } =
        useContext(CartContext);

    return (
        <div className="product-card">

            <Link
                to={`/product/${product.id}`}
            >

                <CatalogImage
                    src={product.image}
                    alt={product.name}
                    category={product.category}
                    className="product-card-image"
                    loading="lazy"
                />

            </Link>

            <h3>{product.name}</h3>

            <p>₹ {product.price}</p>

            <button
                onClick={() =>
                    addToCart(product, 1)
                }
            >
                Add To Cart
            </button>

        </div>
    );
}

export default ProductCard;