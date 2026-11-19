const path = require("node:path");
const { pathToFileURL } = require("node:url");
const mongoose = require("mongoose");
const connectDB = require("../config/db");
const Product = require("../models/Product");

const seedProducts = async () => {
    await connectDB();

    const catalogUrl = pathToFileURL(
        path.resolve(__dirname, "../../frontend/src/data/products.js")
    );
    const { products } = await import(catalogUrl.href);

    const operations = products.map((product) => ({
        updateOne: {
            filter: { productId: product.id },
            update: {
                $set: {
                    productId: product.id,
                    slug: product.slug,
                    name: product.name,
                    category: product.category,
                    price: product.price,
                    image: product.image,
                    illustration: product.illustration,
                    active: true,
                },
            },
            upsert: true,
        },
    }));

    const result = await Product.bulkWrite(operations);
    console.log(
        `Seeded ${products.length} catalog products (${result.upsertedCount} created, ${result.modifiedCount} updated).`
    );
};

seedProducts()
    .catch((error) => {
        console.error("Failed to seed products:", error);
        process.exitCode = 1;
    })
    .finally(async () => {
        await mongoose.disconnect();
    });
