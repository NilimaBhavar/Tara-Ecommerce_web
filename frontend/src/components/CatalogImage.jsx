const fallbackImages = {
    Biscuits: "/images/biscuits.jpg",
    Snacks: "/images/snacks.jpg",
    Chocolate: "/images/chocolate.jpg",
    Drinks: "/images/drinks.jpg",
    "Personal Care": "/images/personal-care.jpg",
    Household: "/images/household.jpg",
    "Daily Essentials": "/images/household.jpg",
};

function CatalogImage({ category, src, alt, ...props }) {
    const fallback = fallbackImages[category] || "/images/snacks.jpg";
    const productPath = src?.startsWith("/images/products/")
        ? src.replace(/\.(?:jpg|jpeg|png|webp|svg)$/i, "")
        : null;

    return (
        <img
            src={src || fallback}
            alt={alt}
            onError={(event) => {
                const image = event.currentTarget;
                const current = new URL(image.src).pathname;
                const imageBase = productPath
                    ? new URL(productPath, window.location.href).pathname
                    : null;

                if (imageBase && current === `${imageBase}.jpg`) {
                    image.src = `${imageBase}.png`;
                } else if (imageBase && current === `${imageBase}.png`) {
                    image.src = `${imageBase}.svg`;
                } else if (
                    imageBase &&
                    /\.(?:jpg|jpeg|png|webp)$/i.test(current)
                ) {
                    image.src = `${imageBase}.svg`;
                } else if (imageBase && current === `${imageBase}.svg`) {
                    image.src = fallback;
                } else if (current !== new URL(fallback, window.location.href).pathname) {
                    image.src = fallback;
                }
            }}
            {...props}
        />
    );
}

export default CatalogImage;
